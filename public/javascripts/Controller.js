/**
 * Created by Andrew on 13/05/2015.
 */

var controller = {};


controller.start = (function(){
    "use strict";
    var stage;
    var gameWorld;
    var assetManagementLocal;
    var uiSingleton;
    var uiLocal;
    var player;
    var level;
    var once = false;
    var enemyCounterDelay = 0 ;
    var canSpawn = false;
    var canWin = false;
    var previous; //refactor mb
    $(document).ready(function(){

        stage = setupStage.canvasInit().stage;
        player = PlayerSingleton.getInstance();
        uiLocal = UiSingleton.getInstance();
        level = LevelSingleton.getInstance();
        gameWorld = level.initialize(stage).gameWorld;
        assetManagementLocal = AssetManagementSingleton.getInstance();
        assetManagementLocal.load(stage,gameWorld);
        stage.getChildByName("buildCursor").on("click" , handleClick);
        setupStage.ticker();


    });

    var handleClick = function(event){
        var x;
        var y;
        //the code below will build towers if you are in the build mode.
        if(uiLocal.buildMode == 1){ // instead of 1 uiLocal.buildMode
            x = Math.floor(event.stageX / 32);
            y = Math.floor(event.stageY / 32);
            if ((gameWorld[x][y].canBuildTower === true) && (gameWorld[x + 1][y].canBuildTower === true) && (gameWorld[x][y + 1].canBuildTower === true) && (gameWorld[x + 1][y + 1].canBuildTower === true)) {
                if(uiLocal.selected) {
                    var tower = level.addTower(x, y, uiLocal.selected);// WARNING : HARDCODE or not?

                    var towerSprite = assetManagementLocal.loadTower(x, y);
                    tower.setSprite(towerSprite);
                    tower.calcRanges();
                }
            }
        }

    };

    var winLoss = function(e){
        setupStage.stopTicker();
        if(e === "loss"){
            AssetManagementSingleton.getInstance().loadLoss();
        }
        if(e === "win"){
            AssetManagementSingleton.getInstance().loadWin();

        }

    };


    var tick =  function(event){
        var playerLives = PlayerSingleton.getInstance().lives;
        var enemies  = level.enemies;
        if(playerLives <= 0 ){
            winLoss("loss");
            stage.on("click" , function(){
                window.location.reload();
            });
        }
        if((controller.start.canWin === true)&&(enemies.length ===0)){
            winLoss("win");
            stage.on("click" , function(){
                window.location.reload();
            });
        }
        if(controller.start.canSpawn === true){
            level.createEnemies(); //problema tut
            controller.start.canSpawn = false;
            controller.start.canWin = true;
        }

        if(uiLocal.buildMode===1)
        {
            uiLocal.tileMouse(stage);
        }
        for(var i = 0 ; i < enemies.length; i++){
            enemies[i].turn();
        }
        var towers = level.towers;
        for(i = 0 ; i < towers.length; i++){
            towers[i].turnDelay ++ ;
            if(towers[i].turnDelay % 100 ===0 ) {
                towers[i].turn();
            }
        }

        var projectiles = level.projectiles;
        for(i =0 ; i< projectiles.length ; i++){
            projectiles[i].turn();

        }
        stage.update();
    };

    return {
        canSpawn : canSpawn,
        canWin : canWin,
        tick : tick

    };
})();