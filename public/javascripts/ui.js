/**
 * Created by Andrew on 23/05/2015.
 */
var Ui = function(){
    var buttons = [];
    var buildMode = 0;
    var assetManagementLocal = assetManagement.start; //move this to init mb

    var init = function (){
        alert("yo");
        buildMode = 1;
        assetManagementLocal.showBuildableGrid();
    };
    var build = function (){
        buildMode = 1;
        assetManagementLocal.showBuildableGrid();
    };


    var unBuild  = function(){
        buildMode = 0;
        assetManagementLocal = assetManagement.start;
        assetManagementLocal.hideBuildableGrid();
    };

    var tileMouse = function(){
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
    };


    return {
        init : init,
        build : build,
        unBuild : unBuild,
        tileMouse : tileMouse
    };



};

