function plural(s, i) {
  return i > 1 ? s + 's' : s;
}

function pad(num) {
  return num < 10 ? '0' + num : num;
}
function countDown(offset) {
  // offset is in hours, so convert to miliseconds
  offset = offset ? offset * 60 * 60 * 1000 : 0;
  // central time
  var now = new Date(
    new Date().getTime() +
      new Date().getTimezoneOffset() * 60000 +
      3600000 * -6,
  );

  var year = new Date(now.getFullYear(), 0, 1);
  var day = Math.floor((now - year) / (24 * 60 * 60 * 1000));
  var week = Math.ceil((now.getDay() + 1 + day) / 7);

  // bi-weekly
  var days = 12 - now.getDay() || 12;
  if (week % 2 == 0) {
    // this week if we are on an even week
    days = 5 - now.getDay() || 5;
  }

  if (now.getHours() >= 9) {
    days -= 1;
  }

  var hours = pad(24 + 9 - now.getHours());
  var minutes = pad(60 - parseInt(now.getMinutes()));
  var seconds = pad(60 - parseInt(now.getSeconds()));

  return `<div>${days} ${plural(
    'day',
    days,
  )} ${hours}:${minutes}:${seconds}</div>`;
}

// Save reference to the DIV
var $refresh = document.querySelector('.office-hours-countdown');

if ($refresh) {
  $refresh.innerHTML = countDown();

  // Update DIV contents every second
  setInterval(function () {
    $refresh.innerHTML = countDown();
  }, 1000);
}
