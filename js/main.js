//import {showCard} from './card.js';
//import {disableForm} from './form.js';
import {activateMap,drawMapData,initLat,initLng} from './map.js';
import {getData} from './load.js';
import {enabledForm,setAddressCoordinate,setEvant} from './form.js';
import {comparePlaces} from './filter.js';


const getDataOnSuccess = (data) => {
  drawMapData(data.slice().sort(comparePlaces).slice(0,10));
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

setEvant( console.log);
