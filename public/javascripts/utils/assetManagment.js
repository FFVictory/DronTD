/**
 * Created by Drew on 14/05/2015.
 */
var assetManagement = {};
"use strict";
assetManagement.start = (function(){
var stage;
var preload;
var level;
var highGround;
var images;


    var load = function(stageInit,levelInit){
        stage = stageInit;
        level = levelInit;
        images = Object.create(null);
        loadImages();

    };

    var loadImages = function loadImages(){
        preload =  new createjs.LoadQueue();
        var manifest = [
            {src : 'images/115.png' , id : 'highGround'}
        ];
        preload.addEventListener("fileload" , handleFileLoad);
        preload.addEventListener("complete" , loadTiles);
        preload.loadManifest(manifest);

    };


    //Might need to change the scope of stage and level
    function loadTiles(){
        for(var i = 0 ; i<level.length ; i++){
            for(var j =0 ; j<level[i].length ; j++){
                // There needs to be a decision which tile to load

                var x = (32 * i) + 1;
                var y = (32 * j) + 1;
                loadTile(x,y);
            }
        }

    }
    function loadTile(x,y){
        var img  = new createjs.Bitmap(preload.getResult(images["highGround"]));
        img.x = x;
        img.y =y;
        stage.addChild(img);
    }

    var handleFileLoad = function (event){
        images[event.item.id] = event.item.id;
    };

    return {
        load : load
    }

}());