/**
 * Created by Andrew on 28/05/2015.
 */
function Projectiles(enemy,originX,originY,sprite,tower){


    this.sprite = sprite;
    this.enemy = enemy;
    this.originX = originX;
    this.originY = originY;
    this.sprite.x = originX;
    this.sprite.y = originY;
    this.tower = tower;
    var selfReference = this;



    var move = function(tarX , tarY){

        //console.log("target X , Y " + targetX + targetY);
        if(tarX > sprite.x){
            sprite.x = sprite.x+1;
        }
        if(tarX < sprite.x){
            sprite.x = sprite.x - 1;
        }

        if(tarY > sprite.y){
            sprite.y = sprite.y+1;
        }
        if(tarY < sprite.y){
            sprite.y = sprite.y - 1;
        }
    };
    var turn = function(){
        var targetX = enemy.sprite.x;
        var targetY = enemy.sprite.y;
        for(var i = 0 ; i< 12 ; i++){
            move(targetX,targetY);
        }
        if((targetX === sprite.x )&&(targetY === sprite.y)){
            tower.enemyHit(enemy);
            LevelSingleton.getInstance().projectileRemoval(selfReference);
            enemy.die();
        }


    };

    selfReference.turn  = turn;
    return {
        selfReference : selfReference,
    }
}