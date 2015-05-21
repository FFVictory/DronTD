/**
 * Created by Andrew on 21/05/2015.
 */

var towerFactory = {};

towerFactory = (function(){

    towerFactory.prototype.towerType = arrowTower;
    towerFactory.prototype.createTower = function(options){
        switch(options.towertType){
            case "fireTower" :
                this.towerType = fireTower;
                break;
            case "arrowTower" :
                this.towerType = arrowTower;
                break;
            case "poisonTower" :
                this.towerType = poisonTower;
                break;
        }
        return new this.towerType(options);

    };




})();