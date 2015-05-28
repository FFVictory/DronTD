/**
 * Created by Drew on 14/05/2015.
 */

"use strict";
var AssetManagement = function(){
var stage;
var tileHolder;
var buildableGrid; //contains the transparent green to highlight the whole field
var buildCursor;
var preload;
var uiContainer;
var enemyContainer;
var towerContainer;
var middleUiContainer;
var bulletsContainer;
var gameWorld;
var highGround;
var level;
var images;
var uiButtons;
var enemySpriteSheet;
var enemySpriteSheetDie;
var enemySpriteSheetFlipped;
var middleUiTexts = [];

    var getStage =function(){
        return stage;
    };
    var load = function(stageInit,levelInit){
        console.log("stage is defined yo");
        stage = stageInit;
        tileHolder = new createjs.Container();
        buildableGrid = new createjs.Container();
        buildCursor= new createjs.Container();
        uiContainer = new createjs.Container();
        enemyContainer = new createjs.Container();
        towerContainer = new createjs.Container();
        middleUiContainer = new createjs.Container();
        bulletsContainer = new createjs.Container();
        tileHolder.name = "tileHolder";
        towerContainer.name = "towerContainer";
        buildableGrid.name = "buildableGrid";
        buildCursor.name = "buildCursor";
        uiContainer.name = "uiContainer";
        enemyContainer.name = "enemyContainer";
        middleUiContainer.name = "middleUiContainer";
        bulletsContainer.name = "bulletsContainer";
        stage.addChild(tileHolder);
        stage.addChild(buildableGrid);
        stage.addChild(buildCursor);
        stage.addChild(uiContainer);
        stage.addChild(enemyContainer);
        stage.addChild(towerContainer);
        stage.addChild(middleUiContainer);
        stage.addChild(bulletsContainer);
        gameWorld = levelInit;
        level = LevelSingleton.getInstance();
        images = Object.create(null);
        loadImages();

    };



    function loadUi(){
        var uiLocal = UiSingleton.getInstance();
        var img  = new createjs.Bitmap(preload.getResult(images["uiMain"]));
        img.x = 1;
        img.y = 512;
        uiContainer.addChild(img);
        var uiButton = new createjs.Bitmap(preload.getResult(images["arrowTowerUi"]));
        uiButton.x = 78;
        uiButton.y = 580;
        uiButton.name = "arrowTower";
        uiButton.on("click" , function(){
            uiLocal.toggleBuildMode("arrowTower");
        });

        uiContainer.addChild(uiButton);

        var fireButton = new createjs.Bitmap(preload.getResult(images["fireTowerUi"]));
        fireButton.x = 178;
        fireButton.y = 580;
        fireButton.name = "fireTower";
        fireButton.on("click" , function(){
            uiLocal.toggleBuildMode("fireTower");
        });
        uiContainer.addChild(fireButton);

        var poisonTower = new createjs.Bitmap(preload.getResult(images["poisonTowerUi"]));
        poisonTower.x = 278;
        poisonTower.y = 580;
        poisonTower.name = "poisonTower";
        poisonTower.on("click" , function(){
            uiLocal.toggleBuildMode("poisonTower");
        });
        uiContainer.addChild(poisonTower);

        var goldIcon = new createjs.Bitmap(preload.getResult(images["goldIcon"]));
        goldIcon.x = 429 ;
        goldIcon.y = 507;
        uiContainer.addChild(goldIcon);

        var text = new createjs.Text(PlayerSingleton.getInstance().gold , "48px Arial", "#FFFFFF");
        text.x = 477;
        text.y = 507;
        text.name = "playerGold";
        uiContainer.addChild(text);


        var heartIcon = new createjs.Bitmap(preload.getResult(images["heartIcon"]));
        heartIcon.x = 650 ;
        heartIcon.y = 577;
        uiContainer.addChild(heartIcon);

        var livesText = new createjs.Text("Lives Left : "  + PlayerSingleton.getInstance().lives, "36px Arial", "#FFFFFF");
        livesText.x = 698;
        livesText.y = 577;
        livesText.name = "playerLives";
        uiContainer.addChild(livesText);

    }


    var loadImages = function loadImages(){
        preload =  new createjs.LoadQueue();
        var manifest = [
            {src : 'images/115.png' , id : 'lowGround'},
            {src : 'images/570_2.png' , id : 'highGround'},
            {src : 'images/iceTower.png' , id : 'iceTower'},
            {src : 'images/canBuild.png' , id : 'canBuild'},
            {src : 'images/cantBuild.png' , id : 'cantBuild'},
            {src : 'images/arrowTower.png' , id : 'arrowTower'},
            {src : 'images/arrowTowerUi.png' , id : 'arrowTowerUi'},
            {src : 'images/fireTower.png' , id : 'fireTower'},
            {src : 'images/fireTowerUi.png' , id : 'fireTowerUi'},
            {src : 'images/poisonTower.png' , id : 'poisonTower'},
            {src : 'images/poisonTowerUi.png' , id : 'poisonTowerUi'},
            {src : 'images/gold.png' , id : 'goldIcon'},
            {src : 'images/goldIconSmall.png' , id : 'goldIconSmall'},
            {src : 'images/heart.png' , id : 'heartIcon'},
            {src : 'images/projectiles/poisonBeam.png' , id : 'poisonBeam'},
            {src : 'images/projectiles/arrowBeam.png' , id : 'arrowBeam'},
            {src : 'images/projectiles/fireBeam.png' , id : 'fireBeam'},
            {src : 'images/heroSpriteSheet.png' , id : 'heroSpriteSheet'},
            {src : 'images/heroSpriteSheetFlipped.png' , id : 'heroSpriteSheetFlipped'},
            {src : 'images/test.png' , id : 'test'},
            {src : 'images/ui.png' , id : 'uiMain'}
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
        //potential performance gains , a posuti eto vashe ne nado
        for(i = 0 ; i<gameWorld.length ; i++){
            for(j =0 ; j<gameWorld[i].length ; j++){
                // There needs to be a decision which tile to load
                //also needs support for multiple layers
                loadTower(i,j);
            }
        }
        loadUi();


        //TEST STUFF

        enemySpriteSheet =  new createjs.SpriteSheet({
            "images" : [preload.getResult("heroSpriteSheet")],
            "animations" : {
                "dead" : [0,6, false , 0.5],
                "run" : [ 8,22 , "run" , 0.5]
            },
            "frames" : {
                x : 64 ,y :64,height : 64 , width : 64, spacing : 0, margin : 0,
                count : 23 , regX : 0 , regY : 0
            }
        });
/*
        enemySpriteSheetDie =  new createjs.SpriteSheet({
            "images" : [preload.getResult("heroSpriteSheet")],
            "animations" : {

            },
            "frames" : {
                x : 64 ,y :64,height : 64 , width : 64, spacing : 0, margin : 0,
                count : 23 , regX : 0 , regY : 0
            }
        });
  */
        enemySpriteSheetFlipped =  new createjs.SpriteSheet({
            "images" : [preload.getResult("heroSpriteSheetFlipped")],
            "animations" : {
                "dead" : [1,6 , false,0.5],
                "run" : [8,21,"run",0.5]
            },
            "frames" : {
                x : 64 ,y :64,height : 64 , width : 64, spacing : 0, margin : 0,
                count : 23 , regX : 0 , regY : 0
            }
        });

        controller.start.canSpawn = true;



        /** TEST STUFF



                if(gameWorld[i][j].canBuildTower === true){
                    var img  = new createjs.Bitmap(preload.getResult(images["canBuild"]));
                    img.x = (i * 32)+1;
                    img.y = (j * 32)+1;
                    stage.addChild(img);
                }
         */
    }

    function loadProjectile(towerType){
        var projectile;
        switch(towerType) {
            case "arrowTower" :
                projectile = new createjs.Bitmap(preload.getResult(images["arrowBeam"])); //REMOVE HARDCODE
                break;
            case "fireTower" :
                projectile = new createjs.Bitmap(preload.getResult(images["fireBeam"])); //REMOVE HARDCODE
                break;
            case "poisonTower" :
                projectile = new createjs.Bitmap(preload.getResult(images["poisonBeam"])); //REMOVE HARDCODE
                break
        }
        projectile.name = "beam";
        bulletsContainer.addChild(projectile);
        return projectile;
    }



    function loadMiddleUi(tower){

        var selected = tower.towerType;
        var damage = tower.damage;
        var range = tower.range;
        var speed = tower.speed;
        var cost = tower.speed;



        var selectedText = new createjs.Text("Selected tower : " + selected, "12px Arial", "#FFFFFF");
        selectedText.x = 437;
        selectedText.y = 571;
        selectedText.name = "selectedText";
        middleUiContainer.addChild(selectedText);
        middleUiTexts.push();

        var damageText = new createjs.Text("Tower damage : " +damage , "12px Arial", "#FFFFFF");
        damageText.x = 437;
        damageText.y = 589;
        damageText.name = "damageText";
        middleUiContainer.addChild(damageText);
        middleUiTexts.push();

        var rangeText = new createjs.Text("Tower range : " +range , "12px Arial", "#FFFFFF");
        rangeText.x = 437;
        rangeText.y = 607;
        rangeText.name = "rangeText";
        middleUiContainer.addChild(rangeText);
        middleUiTexts.push();

        var speedText = new createjs.Text("Tower speed : " +speed , "12px Arial", "#FFFFFF");
        speedText.x = 437;
        speedText.y = 619 +6;
        speedText.name = "speedText";
        middleUiContainer.addChild(speedText);
        middleUiTexts.push();

        var goldIconSmall = new createjs.Bitmap(preload.getResult(images["goldIconSmall"]));
        goldIconSmall.x = 520 ;
        goldIconSmall.y = 644;
        goldIconSmall.name = "goldIconSmall";
        middleUiContainer.addChild(goldIconSmall);

        var costText = new createjs.Text("Tower cost : " + cost , "12px Arial", "#FFFFFF");
        costText.x = 437;
        costText.y = 644;
        costText.name = "costText";
        middleUiContainer.addChild(costText);
        middleUiTexts.push()
    }

    function unloadMiddleUi(){
        middleUiContainer.removeAllChildren();
        middleUiTexts = [];
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
        try {
            if (gameWorld[x][y].drawTower === "arrowTower") {
                img = new createjs.Bitmap(preload.getResult(images["arrowTower"]));
                img.x = Math.round(locX);
                img.y = Math.round(locY);
                towerContainer.addChild(img);
            }
            else if (gameWorld[x][y].drawTower === "fireTower") {
                img = new createjs.Bitmap(preload.getResult(images["fireTower"]));
                img.x = Math.round(locX);
                img.y = Math.round(locY);
                towerContainer.addChild(img);
            }
            else if (gameWorld[x][y].drawTower === "poisonTower") {
                img = new createjs.Bitmap(preload.getResult(images["poisonTower"]));
                img.x = Math.round(locX);
                img.y = Math.round(locY);
                towerContainer.addChild(img);
            }
            return img;

        }
        catch(e){
            alert("Exception : assetManagement.loadTower" + e);
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
        //img.on("click" , UiSingleton.getInstance().toggleBuildMode);
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

    function unloadEnemy(enemyToRemove){
        enemyContainer.removeChild(enemyToRemove);

    }

    //creates the animation
    function loadEnemy( tarY){
        var heroAnimation = new createjs.Sprite(enemySpriteSheet,"run");
        heroAnimation.play();
        heroAnimation.name = "hero";
        heroAnimation.x = 96;
        heroAnimation.y = tarY;  //0
        heroAnimation.direction = 90;
        var deadAnimation= new createjs.Sprite(enemySpriteSheet,"dead");
        deadAnimation.name = "dead";
        deadAnimation.direction = 90;

        enemyContainer.addChild(heroAnimation);

        return {
            heroAnimation : heroAnimation,
            deadAnimation : deadAnimation
        };

    }

    function changeAnimationForEnemy(runAnimation , deadAnimation){
        deadAnimation.x = runAnimation.x;
        deadAnimation.y = runAnimation.y;
        enemyContainer.removeChild(runAnimation);
        deadAnimation.play();

        enemyContainer.addChild(deadAnimation);
        return deadAnimation;
    }

    function loadFlippedEnemy(x,y , animationToRemove ,deadAnimationToRemove){
        enemyContainer.removeChild(animationToRemove);
        enemyContainer.removeChild(deadAnimationToRemove);
        var heroAnimation = new createjs.BitmapAnimation(enemySpriteSheetFlipped);
        heroAnimation.gotoAndPlay("run");
        heroAnimation.name = "hero";
        heroAnimation.direction = -90;

        heroAnimation.x = x;
        heroAnimation.y = y;
        enemyContainer.addChild(heroAnimation);

        var deadAnimation= new createjs.Sprite(enemySpriteSheetFlipped,"dead");
        deadAnimation.name = "dead";
        deadAnimation.direction = -90;

        return {
            heroAnimation :heroAnimation,
            deadAnimation : deadAnimation
        };
    }
    return {
        showBuildableGrid : showBuildableGrid,
        load : load,
        getStage  : getStage,
        loadTower : loadTower,
        loadEnemy : loadEnemy,
        loadProjectile : loadProjectile,
        changeAnimationForEnemy : changeAnimationForEnemy,
        loadFlippedEnemy : loadFlippedEnemy,
        loadMiddleUi : loadMiddleUi,
        unloadMiddleUi : unloadMiddleUi,
        highlightTile : highlightTile,
        unloadImage : unloadImage,
        unloadEnemy : unloadEnemy,
        uiButtons : uiButtons,
        hideBuildableGrid : hideBuildableGrid
    }

};