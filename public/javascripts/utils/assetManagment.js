/**
 * Created by Drew on 14/05/2015.
 */


var assetManagment = (function(){

    (function(){
        loadImage("images/sprite.jpg");
    }());

    function loadImage(pathToImage){
        var preload =  new createjs.LoadQueue();
        preload.addEventListener("fileload" , handleFileComplete);
        preload.loadFile({id : "highGround" , src : pathToImage});
    }




    function handleFileComplete(event){
        document.body.appendChild(event.result);
    }
}());