const placeType = {'flat': 'Квартира','bungalow':'Бунгало', 'house':'Дом','palace':'Дворец', 'hotel':'Отель'};
const cardTemplateMain = document.querySelector('#card').content.querySelector('.popup');

const createFeatureList = (userElementArray) => {
  const featureList = document.createDocumentFragment();
  const listItemTemplate = document.createElement('li');
  listItemTemplate.classList.add('popup__feature');

  for(let i = 0; i < userElementArray.length; i++) {
    const listItem = listItemTemplate.cloneNode();
    listItem.classList.add(`popup__feature--${userElementArray[i]}`);
    featureList.appendChild(listItem);
  }

  return featureList;
};

const fillTextNode = (elementData,element,elementDataTemplate='') => {
  if(elementData) {
    element.textContent = elementDataTemplate === '' ? elementData : elementDataTemplate;
  }
  else {
    element.remove();
  }
};

const createSameElementList = function(elementTemplate,elements){
  const similarListFragment = document.createDocumentFragment();
  for(let i = 0; i <elements.length;i++) {
    const photoImageElement = elementTemplate.cloneNode();
    photoImageElement.src = elements[i];
    similarListFragment.append(photoImageElement);
  }
  return similarListFragment;
};

const createCard = (elementObjectData) => {
  const cardTemplate = cardTemplateMain.cloneNode(true);

  if (elementObjectData.offer.title) {
    cardTemplate.querySelector('.popup__title').textContent = elementObjectData.offer.title;
  }
  else {
    cardTemplate.querySelector('.popup__title').remove();
  }

  fillTextNode(elementObjectData.offer.address,cardTemplate.querySelector('.popup__text--address'));
  fillTextNode(elementObjectData.offer.price, cardTemplate.querySelector('.popup__text--price'),`${elementObjectData.offer.price} ₽/ночь`);
  fillTextNode(elementObjectData.offer.type,cardTemplate.querySelector('.popup__type'), placeType[elementObjectData.offer.type]);
  fillTextNode(elementObjectData.offer.description, cardTemplate.querySelector('.popup__description'));

  if(elementObjectData.offer.rooms && elementObjectData.offer.guests) {
    cardTemplate.querySelector('.popup__text--capacity').textContent = `${elementObjectData.offer.rooms} комнат для ${elementObjectData.offer.guests} гостей`;
  }
  else {
    cardTemplate.querySelector('.popup__text--capacity').remove();
  }

  if(elementObjectData.offer.checkin && elementObjectData.offer.checkout) {
    cardTemplate.querySelector('.popup__text--time').textContent = `Заезд после ${elementObjectData.offer.checkin}, выезд до ${elementObjectData.offer.checkout}`;
  }
  else {
    cardTemplate.querySelector('.popup__text--time').remove();
  }

  const featuresLits = cardTemplate.querySelector('.popup__features');
  const userFeatures = elementObjectData.offer.features;

  if(userFeatures && userFeatures.length) {
    featuresLits.innerHTML = '';
    featuresLits.appendChild(createFeatureList(userFeatures));
  }
  else {
    featuresLits.remove();
  }

  const photosBlock = cardTemplate.querySelector('.popup__photos');

  if(elementObjectData.offer.photos) {

    const photoImageTemplate = photosBlock.querySelector('.popup__photo');
    const imageList = createSameElementList(photoImageTemplate,elementObjectData.offer.photos);
    photosBlock.innerHTML= '';
    photosBlock.appendChild(imageList);
  }
  else {
    photosBlock.remove();
  }
  if(elementObjectData.author.avatar) {
    cardTemplate.querySelector('.popup__avatar').src = elementObjectData.author.avatar;
  }
  else {
    cardTemplate.querySelector('.popup__avatar').remove();
  }

  return cardTemplate;
};

const showCard = (objectElementData) => {
  const element = createCard(objectElementData);
  const placeContainer = document.querySelector('#map-canvas');

  placeContainer.appendChild(element);
};

export {showCard,createCard};
