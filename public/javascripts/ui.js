/**
 * Created by Andrew on 23/05/2015.
 */
var Ui = function(){
    var buttons = [];
    var buildMode = 0 ;
    var previous;
    var selected;
 //move this to init mb

    var init = function (){

    };

    //this is called by an event listener so things are not so simple as it seems.

    var toggleBuildMode = function(towerType){
        var assetManagementLocal = AssetManagementSingleton.getInstance();
        if(UiSingleton.getInstance().buildMode === 0) {
            UiSingleton.getInstance().buildMode= 1;
            assetManagementLocal.showBuildableGrid();
        }
        else if((UiSingleton.getInstance().buildMode === 1) && (towerType === UiSingleton.getInstance().selected)){
            UiSingleton.getInstance().buildMode= 0;
            assetManagementLocal.hideBuildableGrid();
        }
        if(towerType){
            UiSingleton.getInstance().selected = towerType;
        }


    };




    var tileMouse = function(stage){
        for(var i =0 ; i< stage.getChildByName("tileHolder").children.length ; i++){
            var currentChild = stage.getChildByName("tileHolder").children[i] ;
            var pt = currentChild.globalToLocal(stage.mouseX , stage.mouseY);
            if(stage.mouseInBounds && currentChild.hitTest(pt.x , pt.y) && (previous != currentChild)){
                if(previous !== null){
                    AssetManagementSingleton.getInstance().unloadImage(previous);

                }
                AssetManagementSingleton.getInstance().highlightTile(currentChild.x,currentChild.y);
                previous = currentChild;


            }
        }
    };



    return {
        selected : selected,
        init : init,
        buildMode : buildMode,
        toggleBuildMode : toggleBuildMode,
        tileMouse : tileMouse

    };



};

