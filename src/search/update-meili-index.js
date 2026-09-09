const { MeiliSearch } = require('meilisearch');

const documents = require('../../_site/search/all.json');

const host = process.env.MEILI_HOST || 'http://127.0.0.1:7700';
const apiKey =
  process.env.MEILI_MASTER_KEY ||
  process.env.MEILI_SEARCH_KEY ||
  'atlas-dev-master-key';
const indexUid = process.env.MEILI_INDEX || 'atlas';

// Meilisearch document ids allow only [a-zA-Z0-9_-].
function toDocumentId(value) {
  return (
    String(value || '')
      .replace(/^\/+|\/+$/g, '')
      .replace(/[^a-zA-Z0-9_-]+/g, '_')
      .slice(0, 511) || 'root'
  );
}

async function waitForTask(client, taskUid) {
  const task = await client.tasks.waitForTask(taskUid);
  if (task.status === 'failed') {
    const message =
      task.error?.message || JSON.stringify(task.error) || 'unknown error';
    throw new Error(`Meilisearch task ${taskUid} failed: ${message}`);
  }
  return task;
}

async function main() {
  const client = new MeiliSearch({ host, apiKey });

  try {
    await client.createIndex(indexUid, { primaryKey: 'objectID' });
  } catch (error) {
    // Index may already exist.
    if (
      !/already exists|index_already_exists/i.test(
        String(error.message || error),
      )
    ) {
      // Continue; getIndex / updateSettings will surface real failures.
    }
  }

  const index = client.index(indexUid);

  await index.updateSettings({
    searchableAttributes: ['title', 'content', '_tags'],
    displayedAttributes: [
      'title',
      'url',
      'content',
      '_tags',
      'objectID',
      'date',
    ],
    sortableAttributes: ['date'],
  });

  const payload = documents.map((doc) => ({
    ...doc,
    objectID: toDocumentId(doc.objectID || doc.url),
  }));

  const deleteTask = await index.deleteAllDocuments();
  await waitForTask(client, deleteTask.taskUid);

  const addTask = await index.addDocuments(payload, { primaryKey: 'objectID' });
  await waitForTask(client, addTask.taskUid);

  console.log(
    `Indexed ${payload.length} documents into Meilisearch index "${indexUid}" at ${host}`,
  );
}

main().catch((error) => {
  console.error('Failed to update Meilisearch index', error);
  process.exit(1);
});
