import {setAddressCoordinate} from './form.js';
import {createCard} from './card.js';

const INIT_LAT = 35.681729;
const INIT_LNG =  139.753927;
const MAIN_PIN_ICON_SIZE = [52, 52];
const  MAIN_PIN_ICON_ANCHOR = [26, 52];

const SECONDARY_PIN_ICON_SIZE = [40, 40];
const  SECONDARY_PIN_ICON_ANCHOR = [20, 40];

const MAP_ZOOM = 13;

const map = L.map('map-canvas');
const mainPointLayer = L.layerGroup().addTo(map);
const overPointLayer = L.layerGroup().addTo(map);


const mainPin = {
  iconUrl: '/img/main-pin.svg',
  iconSize: MAIN_PIN_ICON_SIZE,
  iconAnchor: MAIN_PIN_ICON_ANCHOR,
};
const secondaryPin = {
  iconUrl: '/img/pin.svg',
  iconSize:  SECONDARY_PIN_ICON_SIZE,
  iconAnchor:  SECONDARY_PIN_ICON_ANCHOR,
};

const setMainView = () => {
  map.setView({
    lat: INIT_LAT,
    lng: INIT_LNG,
  }, MAP_ZOOM);
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
      lat:  INIT_LAT,
      lng:  INIT_LNG,
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

const drawMapData = (data) => {
  data.forEach((point) => {
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
  setAddressCoordinate(INIT_LAT, INIT_LNG);
};

const updateMap = (data) => {
  resetMap();
  overPointLayer.clearLayers();
  drawMapData(data);
};

export {closePopup, setMainPin,activateMap,drawMapData,INIT_LAT,INIT_LNG,updateMap};
