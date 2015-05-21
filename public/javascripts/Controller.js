/**
 * Created by Andrew on 13/05/2015.
 */

var controller = {};


controller.start = (function(){
    "use strict";
    var stage;
    $(document).ready(function(){

        stage = setupStage.canvasInit().stage;
        uiStage = setupStage.canvasInit().uiStage;
        setupStage.ticker();
        level.initialize(stage);
        ui.initialize(uiStage);

    });

    var fake = function(){
        var level = new Array(10);
        var i = 0;
        for(i ; i<level.length ; i++){
            level[i] = new Array(10);
        }
        assetManagement.start.load(stage,level);


    };

    function tileMouse(){
        for(var i =0 ; i< stage.getChildByName("tileHolder").children.length ; i++){
            var currentChild = stage.getChildByName("tileHolder").children[i] ;
            var pt = currentChild.globalToLocal(stage.mouseX , stage.mouseY);
            if(stage.mouseInBounds && currentChild.hitTest(pt.x , pt.y)){
                //console.log(currentChild.x + " and y is : " + currentChild.y);
                //assetManagement.start.stubName(currentChild.x,currentChild.y);

            }
        }
    }


    var tick =  function(event){
        tileMouse();
        stage.update();
        uiStage.update();
    };

    return {
        tick : tick
    };
})();