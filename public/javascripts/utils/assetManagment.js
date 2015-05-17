/**
 * Created by Drew on 14/05/2015.
 */
var assetManagement = {};
"use strict";
assetManagement.start = (function(){
var stage;
var preload;
var gameWorld;
var highGround;
var images;


    var load = function(stageInit,levelInit){
        stage = stageInit;
        gameWorld = levelInit;
        images = Object.create(null);
        loadImages();

    };

    var loadImages = function loadImages(){
        preload =  new createjs.LoadQueue();
        var manifest = [
            {src : 'images/115.png' , id : 'lowGround'},
            {src : 'images/570_2.png' , id : 'highGround'},
            {src : 'images/iceTower.png' , id : 'iceTower'},
            {src : 'images/canBuild.png' , id : 'canBuild'}
        ];
        preload.addEventListener("fileload" , handleFileLoad);
        preload.addEventListener("complete" , loadGraphics);
        preload.loadManifest(manifest);

    };


    //Might need to change the scope of stage and level
    function loadGraphics(){
        for(var i = 0 ; i<gameWorld.length ; i++){
            for(var j =0 ; j<gameWorld[i].length ; j++){
                // There needs to be a decision which tile to load
                //also needs support for multiple layers
                loadTile(i,j);
            }
        }
        //potential performance gains
        for(i = 0 ; i<gameWorld.length ; i++){
            for(j =0 ; j<gameWorld[i].length ; j++){
                // There needs to be a decision which tile to load
                //also needs support for multiple layers
                loadTower(i,j);
            }
        }
        var img  = new createjs.Bitmap(preload.getResult(images["canBuild"]));
        img.x = 3 * 32;
        img.y = 3 * 32;
        stage.addChild(img);
    }

    function loadTower(x,y){
        var img;
        var locX, locY;
        if(gameWorld[x][y].tower === "iceTower"){
            img  = new createjs.Bitmap(preload.getResult(images["iceTower"]));
            alert(img.getBounds());
            img.x = locX;
            img.y = locY;
            stage.addChild(img);
        }
    }

    function loadTile(x,y){
        var img;
        var locX, locY;
        if(gameWorld[x][y].type === "highGround"){
            img  = new createjs.Bitmap(preload.getResult(images["highGround"]));
        }
        else if(gameWorld[x][y].type === "lowGround"){
            img  = new createjs.Bitmap(preload.getResult(images["lowGround"]));
        }
        else{
            img  = new createjs.Bitmap(preload.getResult(images["highGround"]));
        }
        locX =  (32 * x) + 1;
        locY = (32 * y) + 1;
        img.x = locX;
        img.y = locY;
        stage.addChild(img);
        //more cases to be added

    }

    var handleFileLoad = function (event){
        images[event.item.id] = event.item.id;
    };

    return {
        load : load
    }

}());