/**
 * Created by Drew on 14/05/2015.
 */
var assetManagement = {};
"use strict";
assetManagement.start = (function(){
var stage;
var tileHolder;
var buildableGrid;
var preload;
var gameWorld;
var highGround;
var images;


    var load = function(stageInit,levelInit){
        stage = stageInit;
        tileHolder = new createjs.Container();
        buildableGrid = new createjs.Container();
        tileHolder.name = "tileHolder";
        buildableGrid.name = "buildableGrid";
        stage.addChild(tileHolder);
        stage.addChild(buildableGrid);
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
        /** TEST STUFF

                if(gameWorld[i][j].canBuildTower === true){
                    var img  = new createjs.Bitmap(preload.getResult(images["canBuild"]));
                    img.x = (i * 32)+1;
                    img.y = (j * 32)+1;
                    stage.addChild(img);
                }
         */
    }

    function showBuildableGrid(){
        for(var i = 0 ; i < gameWorld.length ; i++){
            for(var j = 0 ; j< gameWorld[i].length ; j++){
                if(gameWorld[i][j].canBuildTower === true){
                    var img  = new createjs.Bitmap(preload.getResult(images["canBuild"]));
                    img.x = (i * 32)+1;
                    img.y = (j * 32)+1;
                    stage.addChild(img);
                }

            }
        }

    }
    function loadTower(x,y){
        var img;
        var locX, locY;
        locX =  Math.round((32 * x) + 1);
        locY = Math.round((32 * y) + 1);
        if(gameWorld[x][y].tower === "iceTower"){
            img  = new createjs.Bitmap(preload.getResult(images["iceTower"]));
            img.x = Math.round(locX);
            img.y = Math.round(locY);
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
        locX =  Math.round((32 * x) + 1);
        locY = Math.round((32 * y) + 1);
        img.x = locX;
        img.y = locY;
        stage.getChildByName("tileHolder").addChild(img);
        //more cases to be added

    }

    var handleFileLoad = function (event){
        images[event.item.id] = event.item.id;
    };


    function stubName(pixelsX ,pixelsY ){
        var x = (pixelsX -1 )/32;
        var y = (pixelsY -1 )/32;
        if(gameWorld[x][y].canBuildTower === true) {
            var img = new createjs.Bitmap(preload.getResult(images["canBuild"]));
            img.x = pixelsX;
            img.y = pixelsY;
            buildableGrid.addChild(img);
        }
    }

    function unloadImage(child){


    }

    return {
        showBuildableGrid : showBuildableGrid,
        load : load,
        stubName : stubName
    }

}());