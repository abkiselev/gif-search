import '../pages/index.css';

import Tabs from '../components/Tabs.js';
import Api from '../components/Api.js';
import GenerateGif from '../components/GenerateGif.js'
import AddGif from '../components/AddGif.js';

const buttonRandom = document.querySelector('.button_type_random-gif');
const buttonSearch = document.querySelector('.button_type_search');
const inputSearch = document.querySelector('.search__input');
const searchStatus = document.querySelector('.search__status');
const gifsTypeSearch = document.querySelector('.gifs_type_search');

const buttonAddMyGif = document.querySelector('.button_type_add');
const tagsAddMyGif = document.querySelector('.search__input_type_add');
const fileAddMyGif = document.querySelector('.search__input_type_add-link');
const formToAddGif = document.querySelector('.add');
const buttonClearForm = formToAddGif.querySelector('.button_type_remove');

const api = new Api({
  baseUrl: 'https://api.giphy.com/v1/gifs',
  key: 'LgKQAIWNj0vz4nfwGHULAscH7a9nyP5R',
  headers: {
    'Content-Type': 'application/json'
  }
});

const tabs = new Tabs(
  '.navigation',
  '.tabs-content',
  'navigation__link_active',
  'tab-content_active'
);
tabs.setListeners();

const generateGif = new GenerateGif({
  templateSelector: '.template',
  gifsListSelector: '.gifs',
  gifsItemSelector: '.gifs__item'
})

const trendsAddGif = new AddGif(
  '.gifs_type_trends',
  (data) => {
    const gif = createGif(data.images.original.url);
    trendsAddGif.add(gif);
  })

const searchAddGif = new AddGif(
  '.gifs_type_search',
  (data) => {
    const gif = createGif(data.images.original.url);
    searchAddGif.add(gif);
  })

const randomGif = new AddGif(
  '.gifs_type_random'
)

api.getTrends()
  .then(res => {
    trendsAddGif.renderItems(res.data)
  })
  .catch(err => {
    alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
  });


function createGif(url) {
  return generateGif.generate(url)
}


function setRandomGif() {
  api.getRandomGif()
    .then(res => {
      const newGif = createGif(res.data.images.original.url);
      newGif.classList.add('gifs__item_type_random');
      randomGif.replaceGif(newGif);
    })
    .catch(err => {
      alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
    })
    .finally(() => {
      buttonRandom.textContent = 'Get another random gif';
    })
}
setRandomGif();

buttonRandom.addEventListener('click', () => {
  buttonRandom.textContent = 'One moment...';
  setRandomGif();
})

const uploadedGif = new AddGif(
  '.gifs_type_uploaded'
)

formToAddGif.addEventListener('submit', (e) => {
  e.preventDefault();
  buttonAddMyGif.textContent = 'Adding...'

  api.uploadGif(tagsAddMyGif.value, fileAddMyGif.value)
    .then((res) => {
      return res.data.id
    })
    .then((id) => {
      api.getGifById(id)
        .then((res) => {
          const newGif = createGif(res.data.images.original.url);
          newGif.classList.add('gifs__item_type_uploaded');
          uploadedGif.replaceGif(newGif);
        })
    })
    .catch(err => {
      alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
    })
    .finally(() => {
      formToAddGif.reset();
      buttonAddMyGif.textContent = 'Add'
    })
})

buttonClearForm.addEventListener('click', (e) => {
  e.preventDefault();
  buttonClearForm.parentElement.reset();
})

buttonSearch.addEventListener('click', (e) => {
  e.preventDefault()
  if (gifsTypeSearch.contains(document.querySelector('.gifs__item'))) {
    const gifsArray = Array.from(gifsTypeSearch.querySelectorAll('.gifs__item'));
    gifsArray.forEach((gif) => {
      gif.remove()
    })
  }
  searchStatus.classList.add('search__status_active')
  searchStatus.textContent = 'Please wait...'
  api.getSearch(inputSearch.value)
    .then((res) => {
      if (res.data.length === 0) {
        searchStatus.textContent = 'Sorry, no gifs with your name...'
      } else {
        searchStatus.classList.remove('search__status_active')
        searchAddGif.renderItems(res.data)
        inputSearch.value = ''
      }
    })
    .catch(err => {
      alert(`${err}, Что-то пошло не так, попробуйте обновить страницу`)
    })
})