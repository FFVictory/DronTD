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
    var previous; //refactor mb
    $(document).ready(function(){

        stage = setupStage.canvasInit().stage;
        setupStage.ticker();
        uiLocal = UiSingleton.getInstance();
        gameWorld = new level.initialize(stage).gameWorld;
        assetManagementLocal = assetManagement.start;
        assetManagementLocal.load(stage,gameWorld);
        level.addTower(2,2,"arrowTower");

    });


    var fake = function(){
        var level = new Array(10);
        var i = 0;
        for(i ; i<level.length ; i++){
            level[i] = new Array(10);
        }
        assetManagementLocal.load(stage,level);


    };



    var tick =  function(event){

        if(uiLocal.buildMode===1)
        {
            uiLocal.tileMouse();
        }

        stage.update();
    };

    return {
        tick : tick

    };
})();