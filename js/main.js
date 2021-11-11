import {activateMap,drawMapData,updateMap,initLat,initLng} from './map.js';
import {loadData} from './load.js';
import {enabledForm,setAddressCoordinate,setEvant} from './form.js';
import {filterData} from './filter.js';
import {debounce} from './utils/debounce.js';

const DATA_LIMIT = 10;
let dataFromServer = [];

const getDataOnSuccess = (data) => {
  dataFromServer = data;
  drawMapData(data.slice().slice(0,DATA_LIMIT));
};

const getDataOnError = (error) => {
  throw new Error(`При загрузке данных произошла ошибка ${error}`);
};

const getData = () => dataFromServer;

const activatePage = () => {
  enabledForm();
  setAddressCoordinate(initLat, initLng);
  loadData(getDataOnSuccess,getDataOnError);
};

activateMap(activatePage);

const changeMapFilter = () => {
  const arrData = filterData(getData());
  if(arrData.length > DATA_LIMIT) {
    updateMap(arrData.slice(0,DATA_LIMIT));
  }
  else {
    updateMap(arrData);
  }
};

setEvant(debounce(changeMapFilter));
