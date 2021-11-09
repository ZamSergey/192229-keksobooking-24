import {isElemInArray} from './utils.js';

const typeFilter = document.querySelector('#housing-type');
const priceFilter = document.querySelector('#housing-price');
const roomsFilter = document.querySelector('#housing-rooms');
const guestsFilter = document.querySelector('#housing-guests');
const featuresFilter = document.querySelector('#housing-features');


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
  const features = featuresFilter.querySelectorAll('input[name=features]');
  const filterArray = [];
  for(const feature of features) {
    if(feature.checked) {
      filterArray.push(feature.value);
    }
  }
  filterObject.features = filterArray;
  return filterObject;
};

const countPriceRank = (filerValue,dataValue) => {
  let rank = 0;
  if(filerValue === 'low' && dataValue < 10000) {
    rank = 1;
  }
  else if(filerValue === 'high' && dataValue > 50000) {
    rank = 1;
  }
  else if (filerValue === 'middle' && dataValue <= 50000 && dataValue >= 10000) {
    rank = 1;
  }
  return rank;
};


const getSimilarPlaces = (dataObject,filterObject) => {
  const currentData = dataObject.offer;
  let placeRank = 0;
  for(const filter in filterObject) {
    if(filter === 'type' && currentData[filter] === filterObject[filter]) {
      placeRank++;
    }
    if(filter === 'price') {
      placeRank += countPriceRank(filterObject[filter],currentData[filter]);
    }
    if(filter === 'rooms' && currentData[filter] >= parseInt(filterObject[filter],10)) {
      placeRank ++;
    }
    if(filter === 'guests' && currentData[filter] >= parseInt(filterObject[filter],10)) {
      placeRank ++;
    }
    if(filter === 'features') {
      currentData[filter].map((element)=>{
        if(isElemInArray(filterObject.features,element)) {
          placeRank ++;
        }
      });
    }
  }
  return placeRank;
};
const comparePlaces = (placeA, placeB) => {
  const rankA = getSimilarPlaces(placeA);
  const rankB = getSimilarPlaces(placeB);

  return rankB - rankA;
}

export {getSimilarPlaces,getFilterValue,comparePlaces};