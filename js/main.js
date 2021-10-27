import {generateData} from './data.js';
import {showCard} from './card.js';
import {disableForm} from './form.js';

const testPlaces = generateData(1);

showCard(testPlaces[0]);
disableForm();
