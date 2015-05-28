/**
 * Created by Andrew on 26/05/2015.
 */
function EnemyFactory() {
"use strict";
    this.createEnemy = function (options) {
        var enemy;
        switch (options.enemyType) {
            case "heroEnemy" :
                enemy = new HeroEnemy(options);
                break;
        }
        enemy.sprite = "undefined";
        enemy.deadSprite = "undefined";
        enemy.previous = [];
        enemy.previous[0]= -64;
        enemy.previous[1]= -64;
        enemy.targetX = 96;
        enemy.targetY = 1;
        enemy.deathDelay = 0;
        enemy.ready = false;
        enemy.tempTest = function () {
            //alert("is this an instance of hero enemy? : " + (enemy instanceof HeroEnemy));
        };

        enemy.setSprite = function (bitmap ,deadBitmap) {
            enemy.sprite = bitmap;
            enemy.deadSprite = deadBitmap;
        };

        enemy.checkSurroundings = function (currPixX, currPixY) {
            enemy.surroundings = LevelSingleton.getInstance().gameWorld;
            var x = Math.floor(currPixX / 32);
            var y = Math.floor(currPixY / 32);

            var targetX;
            var targetY;
            try {
                if ((!targetX && targetX != 0) || (!targetY && targetY != 0)) {
                    if ((enemy.surroundings[x][y - 2].type === "lowGround") && ((enemy.previous[0] != x)  || (enemy.previous[1] != y - 2))) {
                        targetX = x;
                        targetY = y - 2;
                        if(enemy.surroundings[x+1][y-2].type != "lowGround"){
                            targetX = x-1;
                            targetY = y;
                        }
                    }
                }
            }
            catch (e) {
                console.log("Could not check surroundings : " + e);
            }


            try {
                if ((!targetX && targetX != 0) || (!targetY && targetY != 0)) {
                    if ((enemy.surroundings[x + 2][y].type === "lowGround") && ((enemy.previous[0] != x + 2) || (enemy.previous[1] != y))) {
                        targetY = y;
                        targetX = x + 2;
                        if(enemy.surroundings[x+3][y].type != "lowGround") {
                            targetX = x + 1;
                        }
                        else{
                            targetX = x + 2;
                        }
                    }
                }
            }
            catch (e) {
                console.log("Could not check surroundings : " + e);
            }

            try {
                if ((enemy.surroundings[x][y + 2].type === "lowGround") && ((enemy.previous[0] != x) || (enemy.previous[1] != y + 2))) {
                        targetX = x;
                        targetY = y+2;
                    if(enemy.surroundings[x][y+3].type != "lowGround") {
                        targetY = y + 1;
                    }
                    if(enemy.surroundings[x+1][y+2].type != "lowGround"){
                        targetX = x-1;
                        targetY = y;
                    }
                    else{
                    }
                }
            }
            catch (e) {
                console.log("Could not check surroundings : " + e);
            }

            try {
                if ((!targetX && targetX != 0) || (!targetY && targetY != 0)) {
                    if ((enemy.surroundings[x - 2][y].type === "lowGround") && ((enemy.previous[0] != x - 2) || (enemy.previous[1] != y))) {
                        targetY = y;
                        targetX = x - 2;


                    }
                }
            }
            catch (e) {
                console.log("Could not check surroundings : " + e);
            }
            enemy.previous[0] = x;
            enemy.previous[1] = y;
            if((Math.floor(currPixX) === 96)&&(Math.floor(currPixY)===64)) {
                enemy.ready = true;
            }
            return {
                targetX: targetX * 32,
                targetY: targetY * 32
            }
        };
        enemy.takeDamage = function(damage){
            console.log("before deduction  :  " + enemy.health);
            if(enemy.health > 0) {
                enemy.health = enemy.health - damage;
            }
            console.log("after deduction  :  " + enemy.health);


        };

        enemy.die = function(){
            enemy.sprite = AssetManagementSingleton.getInstance().changeAnimationForEnemy(enemy.sprite,enemy.deadSprite);
            var level = LevelSingleton.getInstance();
            PlayerSingleton.getInstance().grantGold(50);
            level.enemies = level.enemies.filter(function(obj) {
                return obj != enemy;
            });
            setTimeout(function(){
                AssetManagementSingleton.getInstance().unloadEnemy(enemy.sprite);
            },1000);
        };
        enemy.turn = function () {


                if (!enemy.targetX || !enemy.targetY) {
                    var result = enemy.checkSurroundings(enemy.sprite.x, enemy.sprite.y);
                    //console.log(result);
                    enemy.targetX = result.targetX;
                    enemy.targetY = result.targetY;
                }
                if (enemy.sprite) {
                    if ((enemy.targetX > enemy.sprite.x) || (enemy.targetY > enemy.sprite.y)) {
                        if (enemy.targetX > enemy.sprite.x) {
                            enemy.sprite.x = enemy.sprite.x + 1;
                        }
                        if (enemy.targetY > enemy.sprite.y) {
                            enemy.sprite.y = enemy.sprite.y + 1;
                        }
                    }
                    else if ((enemy.targetX < enemy.sprite.x) || (enemy.targetY < enemy.sprite.y)) {
                        if (enemy.targetX < enemy.sprite.x) {
                            if (enemy.sprite.direction === 90) {
                                var newSprites = AssetManagementSingleton.getInstance().loadFlippedEnemy(enemy.sprite.x, enemy.sprite.y, enemy.sprite, enemy.deadSprite);
                                enemy.sprite = newSprites.heroAnimation;
                                enemy.deadSprite = newSprites.deadAnimation;
                            }
                            enemy.sprite.x = enemy.sprite.x - 1;
                        }
                        if (enemy.targetY < enemy.sprite.y) {
                            enemy.sprite.y = enemy.sprite.y - 1;
                        }
                    }
                    else {
                        enemy.targetX = 0;
                        enemy.targetY = 0;
                    }
                    if ((enemy.sprite.x === 288) && (enemy.sprite.y === 384)) {
                        enemy.targetY = 448;
                        enemy.targetX = enemy.sprite.X;
                    }
                    if ((enemy.sprite.x === 288) && (enemy.sprite.y === 448)) {
                        PlayerSingleton.getInstance().loseLife();
                        LevelSingleton.getInstance().enemyReachedGoal(enemy);
                    }


                }


        };
        return enemy;

    }
}