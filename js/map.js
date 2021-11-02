import {enabledForm,setAddressCoordinate} from './form.js';
import {generateData} from './data.js';
import {createCard} from './card.js';

const initLat = 35.681729;
const initLng =  139.753927;
const mainPin = {
  iconUrl: '/img/main-pin.svg',
  iconSize: [16, 16],
  iconAnchor: [8, 16],
};
const secondaryPin = {
  iconUrl: '/img/pin.svg',
  iconSize: [16, 16],
  iconAnchor: [8, 16],
};

const map = L.map('map-canvas')
  .on('load', () => {
    enabledForm();
    setAddressCoordinate(initLat, initLng);
  })
  .setView({
    lat: initLat,
    lng: initLng,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainMarker = L.marker(
  {
    lat:  initLat,
    lng:  initLng,
  },
  {
    draggable: true,
    icon: L.icon(mainPin),
  },
);
mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  const coordinates =evt.target.getLatLng();
  setAddressCoordinate(coordinates.lat, coordinates.lng);
});

const createMarker = (point) => {
  const {lat, lng} = point.location;
  const marker = L.marker({
    lat,
    lng,
  },
  {
    icon: L.icon(secondaryPin),
  });

  marker
    .addTo(map)
    .bindPopup(createCard(point));
};


const testData = generateData(10);

testData.forEach((point) => {
  createMarker(point);
});

export {createMarker};
