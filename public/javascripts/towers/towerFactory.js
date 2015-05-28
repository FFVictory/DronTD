/**
 * Created by Andrew on 21/05/2015.
 */

//This is the skeleton , which should be extended
function TowerFactory() {
"use strict";
    this.createTower = function (options) {
        var tower;
        switch (options.towerType) {
            case "fireTower" :
                tower = new FireTower(options);
                break;
            case "arrowTower" :
                tower = new ArrowTower(options);
                break;
            case "poisonTower" :
                tower = new PoisonTower(options);
                break;
        }
        tower.turnDelay = 100;
        tower.sprite = "undefined";
        tower.level = LevelSingleton.getInstance();
        tower.enemies = tower.level.enemies;
        tower.reachableEnemies =[];


        tower.calcRanges = function(){
            var spriteX = tower.sprite.x;
            var spriteY = tower.sprite.y;
            tower.minRangeX = spriteX - tower.range;
            tower.minRangeY = spriteY - tower.range;
            tower.maxRangeX = spriteX + tower.range;
            tower.maxRangeY = spriteY + tower.range;

        };

        tower.setSprite = function(sprite){
            tower.sprite = sprite;
        };

        tower.enemyHit = function(enemy){
            enemy.takeDamage(tower.damage);
            return enemy.health;
        };
        tower.dealDamage = function(enemy){
            if(enemy.ready === true) {
                var assetManagementLocal = AssetManagementSingleton.getInstance();
                var projectileSprite = assetManagementLocal.loadProjectile(tower.towerType);
                var projectile = new Projectiles(enemy,tower.sprite.x , tower.sprite.y ,projectileSprite,tower).selfReference;
                LevelSingleton.getInstance().projectiles.push(projectile);
                console.log("projetile product : " + projectile);
                console.log("Current target : " + tower.reachableEnemies[0]);
                console.log("target . x : " + tower.reachableEnemies[0].sprite.x);
                console.log("target . y : " + tower.reachableEnemies[0].sprite.y);

            }
            else{
                console.log("not ready");
            }
        };
        tower.turn = function(){
            tower.level = LevelSingleton.getInstance();
            tower.enemies = tower.level.enemies;
            tower.enemies = tower.enemies.filter(function(obj){
               if(obj.ready === false){
                   return false;
               }
               else{
                   return true;
               }
            });
            tower.reachableEnemies = tower.enemies.filter(function(obj){
                var objX = obj.sprite.x;
                var objY = obj.sprite.y;
                //eto dolzhno bitj true
                if((( objX < tower.maxRangeX) && (objX > tower.minRangeX )) && (( objY < tower.maxRangeY )&&( objY > tower.minRangeY )) ){
                    return true
                }
                //if((obj.sprite.x < enemies.sprite.x) && (obj.sprite.y )
            });
            var enemy = tower.reachableEnemies[0];
            if(enemy) {
                if (enemy.health > 0) {
                    tower.dealDamage(enemy);
                }

            }
        };

        return tower;
    }
}


