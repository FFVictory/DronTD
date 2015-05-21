/**
 * Created by Drew on 14/05/2015.
 */
var assetManagement = {};
"use strict";
assetManagement.start = (function(){
var stage;
var tileHolder;
var buildableGrid; //contains the transparent green to highlight the whole field
var buildCursor;
var preload;
var gameWorld;
var highGround;
var images;


    var load = function(stageInit,levelInit){
        stage = stageInit;
        tileHolder = new createjs.Container();
        buildableGrid = new createjs.Container();
        buildCursor= new createjs.Container();
        tileHolder.name = "tileHolder";
        buildableGrid.name = "buildableGrid";
        buildCursor.name = "buildCursor";
        stage.addChild(tileHolder);
        stage.addChild(buildableGrid);
        stage.addChild(buildCursor);
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
            {src : 'images/canBuild.png' , id : 'canBuild'},
            {src : 'images/cantBuild.png' , id : 'cantBuild'}
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

    function hideBuildableGrid(){
        buildableGrid.removeAllChildren();
        buildCursor.removeAllChildren();
    }
    function showBuildableGrid(){
        for(var i = 0 ; i < gameWorld.length ; i++){
            for(var j = 0 ; j< gameWorld[i].length ; j++){
                if(gameWorld[i][j].canBuildTower === true){
                    var img  = new createjs.Bitmap(preload.getResult(images["canBuild"]));
                    img.x = (i * 32)+1;
                    img.y = (j * 32)+1;
                    buildableGrid.addChild(img);
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


    function highlightTile(pixelsX ,pixelsY ){
        var x = (pixelsX -1 )/32;
        var y = (pixelsY -1 )/32;
        var string = "cantBuild";
        try {
            if ((gameWorld[x][y].canBuildTower === true) && (gameWorld[x + 1][y].canBuildTower === true) && (gameWorld[x][y + 1].canBuildTower === true) && (gameWorld[x + 1][y + 1].canBuildTower === true)) {
                string = "canBuild"
            }
        }
        catch(e){

        }

        try {
                var tile1 = new createjs.Bitmap(preload.getResult(images[string]));
                tile1.x = pixelsX;
                tile1.y = pixelsY;
                buildCursor.addChild(tile1);
        }
        catch(e){

        }
        try {
                var tile2 = new createjs.Bitmap(preload.getResult(images[string]));
                tile2.x = pixelsX + 32;
                tile2.y = pixelsY;
                buildCursor.addChild(tile2);
        }
        catch(e){

        }
        try {
                var tile3 = new createjs.Bitmap(preload.getResult(images[string]));
                tile3.x = pixelsX;
                tile3.y = pixelsY + 32;
                buildCursor.addChild(tile3);
        }
        catch(e){

        }
        try {
                var tile4 = new createjs.Bitmap(preload.getResult(images[string]));
                tile4.x = pixelsX + 32;
                tile4.y = pixelsY + 32;
                buildCursor.addChild(tile4);
        }
        catch(e){

        }
    }

    function unloadImage(child){
        buildCursor.removeAllChildren();

    }

    return {
        showBuildableGrid : showBuildableGrid,
        load : load,
        highlightTile : highlightTile,
        unloadImage : unloadImage,
        hideBuildableGrid : hideBuildableGrid
    }

}());