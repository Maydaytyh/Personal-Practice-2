class MainCanvas {
    constructor(source,target){
        this.source = source || new CanvasImage().image;
        this.target = target || new CanvasImage().image;

        this.offscreenCanvas = this.offscreenCanvas.bind(this);
        this.offscreenContext = this.offscreenContext.bind(this);
    }
    offscreenCanvas(){
        return document.createElement('canvas');
    }
    offscreenContext(){
        return this.offscreenCanvas.getContext('2d');
    }
}