// 离屏canvas
export class MainCanvas {
    constructor(source, target, position, width, height) {
      this.source = source;
      this.target = target;
  
      this.offscreenCanvas = document.createElement('canvas');
      this.offscreenContext = this.offscreenCanvas.getContext('2d');
  
      this.offscreenCanvas.width = width || 500;
      this.offscreenCanvas.height = height || 500;
  
      this.position = position || 'top' || 'right' || 'bottom' || 'left';
  
      this.target.position = this.targetPosition(this.position);
  
      this.drawImage(this.target, 0, 0, this.offscreenCanvas.width, this.offscreenCanvas.height);
      this.drawImage(this.source, this.target.position.x, this.target.position.y, 100, 100);
    }
  
    drawImage(image, xOffset, yOffset, width, height) {
      this.offscreenContext.drawImage(image, xOffset, yOffset, width, height);
    }
  
    targetPosition(position) {
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
          throw Error('传入类型仅支持\'top\',\'right\',\'bottom\',\'left\'');
      }
    }
  
    get canvasElement() {
      return this.offscreenCanvas;
    }
  }
  
  export class CanvasImage {
    constructor(url, width, height) {
      this.width = width || 500;
      this.height = height || 500;
      this.url = url || '';
  
      this.element = new Image(this.width, this.height);
    }
  
    waitLoaded() {
      return new Promise((resolve, reject) => {
        this.element.onload = function() {
          resolve();
          this.element.onload = null;
        };
  
        this.element.onerror = function() {
          reject(new Error('load failed.'));
          this.element.onerror = null;
        };
      });
    }
  
    get imageElement() {
      return this.element;
    }
  }  