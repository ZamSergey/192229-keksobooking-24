import {setAddressCoordinate} from './form.js';
import {createCard} from './card.js';

const MAP_POINTS_LIMIT = 10;
const map = L.map('map-canvas');
const mainPointLayer = L.layerGroup().addTo(map);
const overPointLayer = L.layerGroup().addTo(map);

const initLat = 35.681729;
const initLng =  139.753927;
const mainPin = {
  iconUrl: '/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const secondaryPin = {
  iconUrl: '/img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};

const setMainView = () => {
  map.setView({
    lat: initLat,
    lng: initLng,
  }, 13);
};

const configureMap = (functionAfterLoadMap) => {
  map.on('load', () => {
    functionAfterLoadMap();
  });
  setMainView();

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

const setMainPin = () => {
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
  mainPointLayer.clearLayers();
  mainMarker.addTo(mainPointLayer);

  mainMarker.on('move', (evt) => {
    const coordinates =evt.target.getLatLng();
    setAddressCoordinate(coordinates.lat, coordinates.lng);
  });
};

const activateMap = (functionAfterLoadMap) => {
  configureMap(functionAfterLoadMap);
  setMainPin();
};

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
    .addTo(overPointLayer)
    .bindPopup(createCard(point));
};

const drawMapData = (arrayData) => {
  arrayData.forEach((point) => {
    createMarker(point);
  });
};

const closePopup = () => {
  overPointLayer.eachLayer((layer) => {
    layer.closePopup();
  });
};

const resetMap = () => {
  closePopup();
  setMainView();
  setMainPin();
  setAddressCoordinate(initLat, initLng);
};

const updateMap = (arrayData) => {
  overPointLayer.clearLayers();
  drawMapData(arrayData);
};

export {closePopup,resetMap, setMainPin,activateMap,drawMapData,initLat,initLng,updateMap};
