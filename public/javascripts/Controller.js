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
    var buildMode = 0;
    $(document).ready(function(){

        stage = setupStage.canvasInit().stage;
        setupStage.ticker();
        gameWorld = level.initialize(stage).gameWorld;
        assetManagementLocal = assetManagement.start;
        assetManagementLocal.load(stage,gameWorld);


    });

    function build(){
        buildMode = 1;
        assetManagementLocal.showBuildableGrid();
    }

    function unBuild(){
        buildMode = 0;
        assetManagementLocal.hideBuildableGrid();
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
                if(previous !== null){
                    assetManagementLocal.unloadImage(previous);

                }
                assetManagementLocal.highlightTile(currentChild.x,currentChild.y);
                previous = currentChild;


            }
        }
    }


    var tick =  function(event){
        if(buildMode===1)
        {
            tileMouse();
        }
        stage.update();
    };

    return {
        tick : tick,
        build : build,
        unBuild : unBuild
    };
})();