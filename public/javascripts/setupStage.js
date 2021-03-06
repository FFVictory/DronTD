/**
 * Created by Drew on 13/05/2015.
 */
var setupStage = (function(){
    var stage;
    var canvasContext;
    var canvas;
    var uiStage;
    var uiCanvasContext;
    var uiCanvas;
    //initilizes the canvas
    var canvasInit = function(){
        canvas = document.getElementById("gameCanvas");
        stage = new createjs.Stage(canvas);
        stage.snapToPixelEnabled = true;
        canvasContext = canvas.getContext('2d');


        return {
            stage : stage,
            uiStage : uiStage
        };
    };
    //dolbaebi
    var ticker = function(){
        createjs.Ticker.setFPS(30);
        createjs.Ticker.useRAF = true;
        createjs.Ticker.addEventListener("tick" , controller.start.tick);

    };
    var stopTicker = function(){
        createjs.Ticker.removeAllEventListeners();
    };

    return {
        stopTicker : stopTicker,
        canvasInit: canvasInit,
        ticker: ticker
    };
})();
