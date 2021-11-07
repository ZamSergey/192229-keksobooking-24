//import {showCard} from './card.js';
//import {disableForm} from './form.js';
import {activateMap,drawMapData,initLat,initLng} from './map.js';
import {getData} from './load.js';
import {enabledForm,setAddressCoordinate} from './form.js';


const getDataOnSuccess = (data) => {
  drawMapData(data);
};

const getDataOnError = (error) => {
  console.log(error);
};

const activatePage = () => {
  enabledForm();
  setAddressCoordinate(initLat, initLng);
  getData(getDataOnSuccess,getDataOnError);
};

activateMap(activatePage);

