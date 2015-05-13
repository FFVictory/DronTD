/**
 * Created by Andrew on 13/05/2015.
 */

var controller = {};


controller.start = (function(){
    "use strict";

    $(document).ready(function(){
        setupStage.canvasInit();
        setupStage.ticker();

    });


    var tick =  function(event){
    };

    return {
        tick : tick
    };
})();