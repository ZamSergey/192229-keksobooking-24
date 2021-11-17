const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;
const FILTER_LIMIT = 10;

const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelector('#housing-features');
const mapFilter = document.querySelector('.map__filters');

const getFilterValue = () => {
  const filterObject = {};
  if(typeFilter.value !== 'any'){
    filterObject.type = typeFilter.value;
  }
  if(priceFilter.value !== 'any'){
    filterObject.price = priceFilter.value;
  }
  if(roomsFilter.value !== 'any'){
    filterObject.rooms = roomsFilter.value;
  }
  if(guestsFilter.value !== 'any'){
    filterObject.guests = guestsFilter.value;
  }
  const features = featuresFilter.querySelectorAll('input[name=features]:checked');
  const filters = [];
  for(const feature of features) {
    filters.push(feature.value);
  }
  if (filters.length > 0) {
    filterObject.features = filters;
  }
  return filterObject;
};


const countPriceRank = (filerValue,dataValue) => {
  let rank = 0;
  if(filerValue === 'low' && dataValue < LOW_PRICE) {
    rank = 1;
  }
  else if(filerValue === 'high' && dataValue > HIGH_PRICE) {
    rank = 1;
  }
  else if (filerValue === 'middle' && dataValue <= HIGH_PRICE && dataValue >= LOW_PRICE) {
    rank = 1;
  }
  return rank;
};


const getSimilarPlaces = (dataObject) => {
  const currentData = dataObject.offer;
  const filterObject = getFilterValue();
  let placeRank = 0;
  let featuresRank = 0;
  for(const filter in filterObject) {

    if(filter === 'type' && currentData[filter] === filterObject[filter]) {
      placeRank++;
    }
    if(filter === 'price') {
      placeRank += countPriceRank(filterObject[filter],currentData[filter]);
    }
    if(filter === 'rooms' && currentData[filter] === parseInt(filterObject[filter],10)) {
      placeRank ++;
    }
    if(filter === 'guests' && currentData[filter] === parseInt(filterObject[filter],10)) {
      placeRank ++;
    }
    if(filter === 'features' && currentData[filter]) {
      filterObject[filter].forEach((element)=>{
        if(currentData[filter].includes(element)) {
          featuresRank ++;
        }
      });
    }
  }

  //Если в фильтре выбраны features то длинна объекта больше на 1
  if(filterObject.features && featuresRank > 0 && filterObject.features.length === featuresRank){
    placeRank++;
  }
  return (placeRank === Object.keys(filterObject).length);
};

const filterData = (data) => {
  const filteredData = [];
  for(let i = 0; i < data.length; i++){
    if(getSimilarPlaces(data[i])) {
      filteredData.push(data[i]);
    }
    if(filteredData.length === FILTER_LIMIT) {
      break;
    }
  }
  return filteredData;
};

const setFilterEventListener = (cb) => {
  mapFilter.addEventListener('change', () => cb());
  mapFilter.addEventListener('reset', () => cb());
};

export {filterData,getFilterValue,setFilterEventListener,FILTER_LIMIT};
