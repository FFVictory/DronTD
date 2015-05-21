/**
 * Created by Andrew on 21/05/2015.
 */

var towerFactory = {};

towerFactory = (function(){

    towerFactory.prototype.towerType = arrowTower;
    towerFactory.prototype.createTower = function(options){
        switch(options.towertType){
            case "fire" :
                this.towerType = fireTower;
                break;
            case "arrow" :
                this.towerType = arrowTower;
                break;
            case "poison" :
                this.towerType = poisonTower;
                break;
        }
        return new this.towerType(options);

    };




})();