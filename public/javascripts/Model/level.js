/**
 * Created by Drew on 14/05/2015.
 */


Level = function(){
    var stage;
    var gameWorld = new Array(32);
    var assetManagementLocal;
    var towers = [];
    var currentLevel;
    var enemies = [];
    //This function accepts an integer representing the level to be loaded.
    // It should modify the level array accordingly.
    // And maybe do the asset managment.

    function initialize(stageInit){
        assetManagementLocal = assetManagement.start;
        createGameWorld(stageInit);
        changeLevel(1);

        return {
            gameWorld : gameWorld
        }
    }

    function createEnemies(){
        var enemyFactory = new EnemyFactory();
        var enemy =  enemyFactory.createEnemy({
            enemyType : "heroEnemy"
        });
        enemyBitmap = assetManagementLocal.loadEnemy();
        enemy.setSprite(enemyBitmap);
        enemies.push(enemy);

    }

    function enemyReachedGoal(enemyToRemove){
        stage.getChildByName("enemyContainer").removeChild(enemyToRemove.sprite);
        this.enemies = this.enemies.filter(function(obj) {
            return obj != enemyToRemove;
        });
    }

    //this needs to be refactored
    function createGameWorld(stageInit){

        var i = 0;
        stage = stageInit;
        for(i ; i<gameWorld.length ; i++){
            gameWorld[i] = new Array(16);
            for(var j = 0 ; j< gameWorld[i].length ; j++){
                gameWorld[i][j] = Object.create(null); //Might add prototype inheritence
                gameWorld[i][j].type = "highGround";
                gameWorld[i][j].canBuildTower = true;
            }
        }
    }
    function changeLevel(levelNumber){
        if(levelNumber == 1){
            gameWorld[3][0].type = "lowGround";
            gameWorld[4][0].type = "lowGround";
            gameWorld[3][0].canBuildTower = false;
            gameWorld[4][0].canBuildTower = false;
            gameWorld[4][1].type = "lowGround";
            gameWorld[4][1].canBuildTower = false;
            gameWorld[3][1].type = "lowGround";
            gameWorld[3][1].canBuildTower = false;
            for(var i = 3 ; i < 30 ; i++){
                gameWorld[i][2].type = "lowGround";
                gameWorld[i][2].canBuildTower = false;
                gameWorld[i][3].type = "lowGround";
                gameWorld[i][3].canBuildTower = false;

            }
            for(i = 3 ; i < 14 ; i++) {
                gameWorld[29][i].type = "lowGround";
                gameWorld[29][i].canBuildTower = false;
                gameWorld[28][i].type = "lowGround";
                gameWorld[28][i].canBuildTower = false;
            }
            for(i = 29 ; i > 23 ; i--) {
                gameWorld[i][13].type = "lowGround";
                gameWorld[i][13].canBuildTower = false;
                gameWorld[i][12].type = "lowGround";
                gameWorld[i][12].canBuildTower = false;
            }

            for(i = 13 ; i > 7 ; i--) {
                gameWorld[23][i].type = "lowGround";
                gameWorld[23][i].canBuildTower = false;
                gameWorld[22][i].type = "lowGround";
                gameWorld[22][i].canBuildTower = false;
            }
            for(i = 23 ; i > 8 ; i--){
                gameWorld[i][8].type = "lowGround";
                gameWorld[i][8].canBuildTower = false;
                gameWorld[i][9].type = "lowGround";
                gameWorld[i][9].canBuildTower = false;

            }
            for(i = 9 ; i != 16 ; i++) {
                gameWorld[9][i].type = "lowGround";
                gameWorld[9][i].canBuildTower = false;
                gameWorld[10][i].type = "lowGround";
                gameWorld[10][i].canBuildTower = false;
            }
            gameWorld[4][0].type = "lowGround";
            gameWorld[3][0].canBuildTower = false;
            gameWorld[4][0].type = "lowGround";
            gameWorld[3][0].canBuildTower = false;
            gameWorld[4][0].type = "lowGround";
            gameWorld[3][0].canBuildTower = false;


        }
    }

    //x , y - znachenie v massivah. Ne pixeli kr4.
    function addTower(x , y , towerType) {
        var towerFactory = new TowerFactory();
        var canBuild;
        var tower = towerFactory.createTower({
            towerType: towerType
        });
        towers.push(tower);
        canBuild = PlayerSingleton.getInstance().deductGold(tower.cost);
        stage.getChildByName("uiContainer").getChildByName("playerGold").text= PlayerSingleton.getInstance().gold;
        if (canBuild === true) {
            gameWorld[x][y].tower = tower;
            gameWorld[x][y].drawTower = towerType;
            gameWorld[x + 1][y + 1].tower = tower;
            gameWorld[x + 1][y].tower = tower;
            gameWorld[x][y + 1].tower = tower;
            gameWorld[x][y].canBuildTower = false;
            gameWorld[x + 1][y + 1].canBuildTower = false;
            gameWorld[x][y + 1].canBuildTower = false;
            gameWorld[x + 1][y].canBuildTower = false;
        }
        return tower;
    }

    return {
        initialize : initialize,
        addTower : addTower,
        gameWorld : gameWorld,
        enemies : enemies,
        towers : towers,
        enemyReachedGoal : enemyReachedGoal,
        createEnemies : createEnemies //eto vremenno pohodu
    }
};