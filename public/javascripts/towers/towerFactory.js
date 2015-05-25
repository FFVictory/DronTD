/**
 * Created by Andrew on 21/05/2015.
 */

//This is the skeleton , which should be extended
function TowerFactory() {


    TowerFactory.prototype.towerType = ArrowTower;
    TowerFactory.prototype.createTower = function (options) {
        switch (options.towerType) {
            case "fireTower" :
                this.towerType = FireTower;
                break;
            case "arrowTower" :
                this.towerType = ArrowTower;
                break;
            case "poisonTower" :
                this.towerType = PoisonTower;
                break;
        }
        return new this.towerType(options);
    }
};


