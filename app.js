console.log('RDC Terminal Loaded');

/**
 * ELEMENTS
 */

const clockInTab =
  document.getElementById('clockInTab');

const clockOutTab =
  document.getElementById('clockOutTab');

const clockInForm =
  document.getElementById('clockInForm');

const clockOutForm =
  document.getElementById('clockOutForm');

const liveAddress =
  document.getElementById('liveAddress');

const statusBox =
  document.getElementById('status');

const loader =
  document.getElementById('loader');

/**
 * GPS STATE
 */

let currentLat = null;

let currentLng = null;

let currentAddress =
  'Detecting location...';

/**
 * TAB SWITCHING
 */

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

/**
 * START GPS
 */

window.addEventListener(
  'load',
  () => {

    detectLocation();
  }
);

/**
 * DETECT LOCATION
 */

function detectLocation() {

  updateStatus(
    'Requesting GPS access...',
    '#ffffff'
  );

  showLoader();

  if (!navigator.geolocation) {

    hideLoader();

    updateStatus(
      'Geolocation not supported.',
      '#ff4b4b'
    );

    liveAddress.innerHTML =
      'GPS unsupported';

    return;
  }

  navigator.geolocation.getCurrentPosition(

    successLocation,

    errorLocation,

    {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 0
    }

  );
}

/**
 * GPS SUCCESS
 */

function successLocation(position) {

  currentLat =
    position.coords.latitude;

  currentLng =
    position.coords.longitude;

  console.log(
    'GPS:',
    currentLat,
    currentLng
  );

  reverseGeocode(
    currentLat,
    currentLng
  );
}

/**
 * GPS ERROR
 */

function errorLocation(error) {

  hideLoader();

  console.error(error);

  let message =
    'GPS unavailable';

  switch(error.code) {

    case error.PERMISSION_DENIED:
      message =
        'Location permission denied';
      break;

    case error.POSITION_UNAVAILABLE:
      message =
        'Location unavailable';
      break;

    case error.TIMEOUT:
      message =
        'GPS request timed out';
      break;
  }

  liveAddress.innerHTML =
    message;

  updateStatus(
    message,
    '#ff4b4b'
  );
}

/**
 * REVERSE GEOCODE
 */

async function reverseGeocode(
  lat,
  lng
) {

  try {

    liveAddress.innerHTML =
      'Resolving address...';

    updateStatus(
      'Resolving location...',
      '#ffffff'
    );

    /**
     * OpenStreetMap
     * Free reverse geocoder
     */

    const response =
      await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      );

    const data =
      await response.json();

    currentAddress =
      data.display_name ||
      'Address unavailable';

    liveAddress.innerHTML =
      currentAddress;

    updateStatus(
      'GPS Ready',
      '#44ff44'
    );

  } catch(err) {

    console.error(err);

    liveAddress.innerHTML =
      'Address unavailable';

    updateStatus(
      'GPS detected',
      '#ffd500'
    );

  } finally {

    hideLoader();
  }
}

/**
 * STATUS
 */

function updateStatus(
  message,
  color
) {

  statusBox.innerHTML =
    message;

  statusBox.style.color =
    color;
}

/**
 * LOADER
 */

function showLoader() {

  loader.style.display =
    'block';
}

function hideLoader() {

  loader.style.display =
    'none';
}