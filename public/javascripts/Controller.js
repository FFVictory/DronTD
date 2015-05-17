/**
 * Created by Andrew on 13/05/2015.
 */

var controller = {};


controller.start = (function(){
    "use strict";
    var stage;
    $(document).ready(function(){
        stage = setupStage.canvasInit().stage;
        setupStage.ticker();
        level.initialize(stage);

    });

    var fake = function(){
        var level = new Array(10);
        var i = 0;
        for(i ; i<level.length ; i++){
            level[i] = new Array(10);
        }
        assetManagement.start.load(stage,level);


    };


    var tick =  function(event){
        stage.update();
    };

    return {
        tick : tick
    };
})();