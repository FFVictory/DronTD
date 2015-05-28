/**
 * Created by Andrew on 21/05/2015.
 */

//This is the skeleton , which should be extended
function TowerFactory() {

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

        tower.dealDamage = function(enemy){
            console.log("Current target : " + tower.reachableEnemies[0]);
            enemy.takeDamage(tower.damage);
        };
        tower.turn = function(){
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
            if(enemy){
                tower.dealDamage(enemy);
            }
        };

        return tower;
    }
}


