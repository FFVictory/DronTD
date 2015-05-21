/**
 * Created by Andrew on 13/05/2015.
 */

var controller = {};


controller.start = (function(){
    "use strict";
    var stage;
    var gameWorld;
    var assetManagementLocal;
    var previous; //refactor mb
    $(document).ready(function(){

        stage = setupStage.canvasInit().stage;
        setupStage.ticker();
        gameWorld = level.initialize(stage).gameWorld;
        assetManagementLocal = assetManagement.start;
        assetManagementLocal.load(stage,gameWorld);


    });

    function build(){
        assetManagementLocal.showBuildableGrid();
    }

    var fake = function(){
        var level = new Array(10);
        var i = 0;
        for(i ; i<level.length ; i++){
            level[i] = new Array(10);
        }
        assetManagementLocal.load(stage,level);


    };

    function tileMouse(){
        for(var i =0 ; i< stage.getChildByName("tileHolder").children.length ; i++){
            var currentChild = stage.getChildByName("tileHolder").children[i] ;
            var pt = currentChild.globalToLocal(stage.mouseX , stage.mouseY);
            if(stage.mouseInBounds && currentChild.hitTest(pt.x , pt.y) && (previous != currentChild)){
                assetManagementLocal.removeChild(previous);
                previous = currentChild;
                console.log(currentChild.x + " and y is : " + currentChild.y);
                assetManagement.start.stubName(currentChild.x,currentChild.y);

            }
        }
    }


    var tick =  function(event){
        tileMouse();
        stage.update();
    };

    return {
        tick : tick,
        build : build
    };
})();