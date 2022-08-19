export default class AddGif {
  constructor(containerSelector, renderer){   
      this._containerElement = document.querySelector(containerSelector);
      this._renderer = renderer;
  }

  add(gif) {
    this._containerElement.append(gif)
  }

  renderItems(data) {
    data.forEach((item) => {
      this._renderer(item);
    });
  }

  replaceGif(newGif) {
    if(this._containerElement.firstChild){
      this._containerElement.firstChild.replaceWith(newGif)
    } this._containerElement.append(newGif)
  }
}