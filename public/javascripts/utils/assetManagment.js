/**
 * Created by Drew on 14/05/2015.
 */


var assetManagment = (function(){

    (function(){
        loadImage();
    }());

    function loadImage(){
        var preload =  new createjs.LoadQueue();
        preload.addEventListener("fileload" , handleFileComplete);
        preload.loadFile({id : "highGround" , src : "images/sprite.jpg"});
    }

    function handleFileComplete(event){
        document.body.appendChild(event.result);
    }
}());