const placeType = {'flat': 'Квартира','bungalow':'Бунгало', 'house':'Дом','palace':'Дворец', 'hotel':'Отель'};

const setUserList = function(itemList,itemClass,userList) {
  itemList.forEach((element) => {
    const isBlock =  userList.some((userElement) => element.classList.contains(`${itemClass}--${userElement}`));
    if (!isBlock) {
      element.remove();
    }
  });
};

const getSameElementList = function(elementTemplate,elements){
  const similarListFragment = document.createDocumentFragment();
  for(let i = 0; i <elements.length;i++) {
    const photoImageElement = elementTemplate.cloneNode();
    photoImageElement.src = elements[i];
    similarListFragment.append(photoImageElement);
  }
  return similarListFragment;
};

const fillTextElement = function(elementData,elementInTemplate) {
  if (elementData === '') {
    elementInTemplate.remove();
  }
  else {
    elementInTemplate.textContent = elementData;
  }
};

const getPlaceHtml = function(blockTemplate,placesArray) {
  const similarListFragment = document.createDocumentFragment();
  for(let i = 0; i < placesArray.length; i++) {
    const place = placesArray[i];
    const popupBlock = blockTemplate.cloneNode(true);

    fillTextElement(place.offer.title,popupBlock.querySelector('.popup__title'))
    // popupBlock.querySelector('.popup__title').textContent = place.offer.title;
    fillTextElement(place.offer.address,popupBlock.querySelector('.popup__text--address'));
    // popupBlock.querySelector('.popup__text--address').textContent = place.offer.address;

    popupBlock.querySelector('.popup__text--price').textContent = `${place.offer.price} ₽/ночь`;

    popupBlock.querySelector('.popup__type').textContent = placeType[place.offer.type];
    let currentTextRoom =  'комнаты';
    let currentTextGuest =  'гостей';
    if (place.offer.rooms === 1) {
      currentTextRoom = 'комната';
    }
    if (place.offer.rooms === 5) {
      currentTextRoom = 'комнат';
    }
    if (place.offer.guests === 1) {
      currentTextGuest = 'гостя';
    }
    popupBlock.querySelector('.popup__text--capacity').textContent = `${place.offer.rooms} ${currentTextRoom} для ${place.offer.guests} ${currentTextGuest}`;
    popupBlock.querySelector('.popup__text--time').textContent = `Заезд после ${place.offer.checkin}, выезд до ${place.offer.checkout}`;

    const featuresLits = popupBlock.querySelectorAll('.popup__features .popup__feature');
    const userFeatures = place.offer.features;
    setUserList(featuresLits,'popup__feature',userFeatures);

    popupBlock.querySelector('.popup__description').textContent = place.offer.description ;

    const photosBlock = popupBlock.querySelector('.popup__photos');
    const photoImageTemplate = photosBlock.querySelector('.popup__photo');
    const imageList = getSameElementList(photoImageTemplate,place.offer.photos);
    photosBlock.innerHTML= '';
    photosBlock.appendChild(imageList);

    popupBlock.querySelector('.popup__avatar').src = place.author.avatar;

    similarListFragment.appendChild(popupBlock);
  }
  return similarListFragment;
};

export {getPlaceHtml};

