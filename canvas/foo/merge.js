// 离屏canvas
export class MainCanvas {
    constructor(source, target, position, width, height) {
      this._source = source;
      this._target = target;
      this._offscreenCanvas = document.createElement('canvas');
      this._offscreenContext = this._offscreenCanvas.getContext('2d');
      this._offscreenCanvas.width = width || 500;
      this._offscreenCanvas.height = height || 500;
      this._position = position || 'top' || 'right' || 'bottom' || 'left';
      this._target.position = this._targetPosition(this._position);
      this._drawImage(this._target, 0, 0, this._offscreenCanvas.width, this._offscreenCanvas.height);
      this._drawImage(this._source, this._target.position.x, this._target.position.y, 100, 100);
    }
    _drawImage(image, xOffset, yOffset, width, height) {
      this._offscreenContext.drawImage(image, xOffset, yOffset, width, height);
    }
    _targetPosition(position) {
      switch (position) {
        case 'top':
          return {
            x: 50,
            y: 50,
          };
        case 'right':
          return {
            x: 350,
            y: 50,
          };
        case 'bottom':
          return {
            x: 350,
            y: 350,
          };
        case 'left':
          return {
            x: 50,
            y: 350,
          };
        default:
          throw Error("传入类型仅支持'top','right','bottom','left'");
      }
    }
    get canvasElement() {
      return this._offscreenCanvas;
    }
  }
  export class CanvasImage {
    constructor(url, width, height) {
      this._width = width || 500;
      this._height = height || 500;
      this._url = url || '';
      this._element = new Image(this._width, this._height);
      this._setImgCrossOrigin();
      this._setImgSrc();
    }
    _setImgSrc() {
      this._element.src = this._url;
    }
    _setImgCrossOrigin() {
      this._element.setAttribute('crossOrigin', 'Anonymous');
    }
    get imageElement() {
      return this._element;
    }
  }