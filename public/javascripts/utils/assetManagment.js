/**
 * Created by Drew on 14/05/2015.
 */
var assetManagement = {};

assetManagement.start = (function(){

    var load = function(){
        loadImage("images/115.png" , "highground");
        var highGroundSheet = createHighGroundSheet();

    };

    function loadImage(pathToImage , id){
        var preload =  new createjs.LoadQueue();
        preload.addEventListener("fileload" , handleFileComplete);
        preload.loadFile({id : id , src : pathToImage});
    }

    /*
    function createHighGroundSheet(){
        var spriteSheet = new createjs.SpriteSheet({
            "images" : [preloadQueue.getResult("highGround")],

        });

        return spriteSheet
    }
    */


    function handleFileComplete(event){
        document.body.appendChild(event.result);
    }

    return {
        load : load
    }

}());