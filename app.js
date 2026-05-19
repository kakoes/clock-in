console.log('RDC Terminal Loaded');

const clockInTab =
  document.getElementById('clockInTab');

const clockOutTab =
  document.getElementById('clockOutTab');

const clockInForm =
  document.getElementById('clockInForm');

const clockOutForm =
  document.getElementById('clockOutForm');

clockInTab.addEventListener(
  'click',
  () => {

    clockInTab.classList.add('active');

    clockOutTab.classList.remove('active');

    clockInForm.classList.remove('hidden');

    clockOutForm.classList.add('hidden');
  }
);

clockOutTab.addEventListener(
  'click',
  () => {

    clockOutTab.classList.add('active');

    clockInTab.classList.remove('active');

    clockOutForm.classList.remove('hidden');

    clockInForm.classList.add('hidden');
  }
);