/**
 * Created by Drew on 13/05/2015.
 */
var setupStage = (function(){
    var stage;
    var canvasContext;
    var canvas;
    //initilizes the canvas
    var canvasInit = function(){
        alert("canvasInit");
        canvas = document.getElementById("gameCanvas");
        stage = new createjs.Stage(canvas);
        stage.snapToPixelEnabled = true;
        canvasContext = canvas.getContext('2d');
    };
    //dolbaebi
    var ticker = function(){
        createjs.Ticker.setFPS(30);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.addEventListener("tick" , controller.start.tick);

    };

    return {
        canvasInit: canvasInit,
        ticker: ticker
    };
})();
