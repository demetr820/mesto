export default class Section {
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }
  renderItems(items, id) {
    items.forEach(item => {
      this._container.append(this._renderer(item, id));
    })
  }
  addItem(item) {
    this._container.prepend(item);
  }
}
