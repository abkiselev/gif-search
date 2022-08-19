export default class GenerateGif {
  constructor({templateSelector, gifsListSelector, gifsItemSelector }){   
      this._templateSelector = templateSelector;
      this._gifsListSelector = gifsListSelector;
      this._gifsItemSelector =  gifsItemSelector;
  }

  _getTemplate() {
    const gif = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.gifs__item')
      .cloneNode(true);

    return gif;
  }

  generate(url) {
    this._gif = this._getTemplate()
    this._gif.src = url;
    return this._gif
  }
}
