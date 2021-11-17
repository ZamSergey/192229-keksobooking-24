import {activateMap,drawMapData,updateMap,INIT_LAT,INIT_LNG} from './map.js';
import {loadData} from './load.js';
import {enabledForm,setAddressCoordinate} from './form.js';
import {filterData,setFilterEventListener,FILTER_LIMIT} from './filter.js';
import {debounce} from './utils.js';
import {showAlert} from './message.js';

let dataFromServer = [];

const getData = () => dataFromServer;

const changeMapFilter = () => {
  const arrData = filterData(getData());
  updateMap(arrData.slice(0,FILTER_LIMIT));
};

const getDataOnSuccess = (data) => {
  dataFromServer = data;
  drawMapData(filterData(dataFromServer).slice(0,FILTER_LIMIT));
  enabledForm();
};

const getDataOnError = (error) =>  showAlert(`При загрузке данных произошла ошибка ${error}`);

const activatePage = () => {
  setAddressCoordinate(INIT_LAT, INIT_LNG);
  loadData(getDataOnSuccess,getDataOnError);
};


activateMap(activatePage);
setFilterEventListener(debounce(changeMapFilter));

export {changeMapFilter};
