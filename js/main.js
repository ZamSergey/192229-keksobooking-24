import {activateMap,drawMapData,updateMap,initLat,initLng} from './map.js';
import {loadData} from './load.js';
import {enabledForm,setAddressCoordinate} from './form.js';
import {filterData,setFilterEventListener} from './filter.js';
import {debounce} from './utils.js';
import {showAlert} from './message.js';

const DATA_LIMIT = 10;
let dataFromServer = [];

const getData = () => dataFromServer;

const changeMapFilter = () => {
  const arrData = filterData(getData());
  updateMap(arrData.slice(0,DATA_LIMIT));
};

const getDataOnSuccess = (data) => {
  dataFromServer = data;
  drawMapData(filterData(dataFromServer).slice(0,DATA_LIMIT));
  enabledForm();
};

const getDataOnError = (error) =>  showAlert(`При загрузке данных произошла ошибка ${error}`);

const activatePage = () => {
  setAddressCoordinate(initLat, initLng);
  loadData(getDataOnSuccess,getDataOnError);
};


activateMap(activatePage);
setFilterEventListener(debounce(changeMapFilter));

export {changeMapFilter};
