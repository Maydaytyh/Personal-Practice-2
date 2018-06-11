class CanvasImage {
    constructor(element,url){
        this.element = new Image();
        this.url = url;
    }
    get image(){
        return this;
    }
}