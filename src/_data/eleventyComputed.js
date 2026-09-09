module.exports = {
  type: (_data) => 'page',
  meta: {
    site: {
      name: (data) => data.site.title,
      description: (data) => data.site.description,
      url: (data) => data.site.url,
      logo: {
        src: (data) => data.site.url + data.site.image,
      },
    },
    language: (_data) => 'en-US',
    url: (data) => data.site.url + data.page.url,
    title: (data) => data.title || data.site.title,
    description: (data) => data.description || data.site.description,
    image: {
      src: (data) => {
        return data.page.image ? data.site.url + data.page.image : null;
      },
    },
    modified: (data) => data.page.date.toISOString(),
    keywords: (data) => data.keywords,
    potentialAction: {
      type: 'SearchAction',
      url: (data) => `${data.site.url}?search={search_term_string}`,
    },
  },
};
