import {generateData} from './data.js';
import {getPlaceHtml} from './sameBlocks.js';

const placeContainer = document.querySelector('#map-canvas');
const testPlaces = generateData(1);
const popupBlockTemplate = document.querySelector('#card').content.querySelector('.popup');

const testRent = getPlaceHtml(popupBlockTemplate,testPlaces);
placeContainer.appendChild(testRent);
