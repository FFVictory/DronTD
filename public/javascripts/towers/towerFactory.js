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

        tower.testHujni = function(){
            alert("vse zbs teperj");
        };

        return tower;
    }
}


