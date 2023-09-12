const imageBackdrop = document.querySelector('#image-blur');

window.imageOpen = false;
const setOpen = (value, el = undefined) => {
  if (value && el) {
    document
      .querySelectorAll('.image-popout[data-state="open"]')
      .forEach((x) => {
        setTimeout(() => (x.style.display = 'none'), 150);
        x.dataset.state = 'closed';
      });

    if (imageBackdrop) {
      imageBackdrop.style.display = '';
      imageBackdrop.dataset.state = 'open';
    }
    el.style.display = '';
    el.dataset.state = 'open';

    window.imageOpen = true;
  } else {
    setTimeout(() => (imageBackdrop.style.display = 'none'), 150);
    imageBackdrop.dataset.state = 'closed';
    if (!el) {
      document
        .querySelectorAll('.image-popout[data-state="open"]')
        .forEach((x) => setOpen(false, x));
    } else {
      setTimeout(() => (el.style.display = 'none'), 150);
      el.dataset.state = 'closed';
    }
    window.imageOpen = false;
    console.log('closed');
  }
};

document.addEventListener('click', (e) => {
  if (window.imageOpen) {
    return setOpen(false);
  }
  if (e.target.closest('.image-popout[data-target]')) {
    setOpen(
      true,
      document.getElementById(
        e.target.closest('.image-popout[data-target]').dataset.target,
      ),
    );
  }
});
