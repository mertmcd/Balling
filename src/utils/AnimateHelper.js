window.AdobeAn = {};
require('./createjs.min');



class AnimateHelper{

    constructor(fileName, callback){
        var root;
        var canvas, stage, exportRoot, anim_container, dom_overlay_container, fnStartAnimation;
        
        var that = this;

        function init() {
            canvas = document.getElementById("canvas");
            anim_container = document.getElementById("animation_container");
            dom_overlay_container = document.getElementById("dom_overlay_container");
            var comp=AdobeAn.getComposition("970A9189C42E104AB20AD7ACF63D34F4");
            
            var lib=comp.getLibrary();
            var loader = new createjs.LoadQueue(false);
            loader.addEventListener("fileload", function(evt){handleFileLoad(evt,comp)});
            loader.addEventListener("complete", function(evt){ handleComplete(evt,comp)});
            var lib=comp.getLibrary();
            loader.loadManifest(lib.properties.manifest);
            //var lib=comp.getLibrary();
            //handleComplete({},comp);
            
        }

        
        function handleFileLoad(evt, comp) {
            var image = new Image();
            image.src = evt.item.src;
            var id = evt.item.id;
            var images = comp.getImages();
            images[id] = image;
            
            
            //var images=comp.getImages();	
            //if (evt && (evt.item.type == "image")) { images[evt.item.id] = evt.result; }
        }
        function handleComplete(evt,comp) {
            //This function is always called, irrespective of the content. You can use the variable "stage" after it is created in token create_stage.
            var lib=comp.getLibrary();
            var ss=comp.getSpriteSheet();
            var queue = evt.target;

            

            var images = comp.getImages();
            var ssMetadata = lib.ssMetadata;
            for(var i=0; i<ssMetadata.length; i++) {
                let img = images[ssMetadata[i].name];
                ss[ssMetadata[i].name] = new createjs.SpriteSheet( {"images": [img], "frames": ssMetadata[i].frames} )
            }
            exportRoot = new lib[fileName]();
            stage = new lib.Stage(canvas);	
            window.stage = stage;

            root = exportRoot;
            
            that.root = root;
            that.canvas = canvas;
            that.containerDiv = anim_container;
            that.animateReady();
            //Registers the "tick" event listener.
            fnStartAnimation = function() {
                stage.addChild(exportRoot);
                createjs.Ticker.framerate = lib.properties.fps;
                createjs.Ticker.addEventListener("tick", stage);
            }	    
            //Code to support hidpi screens and responsive scaling.
            AdobeAn.makeResponsive(true,'both',true,1,[canvas,anim_container,dom_overlay_container]);	
            AdobeAn.compositionLoaded(lib.properties.id);
            fnStartAnimation();


            callback(canvas, root, that.containerDiv);
        }

        init();
    }

    animateReady(){
        ////use canvas and root
        let canvas = this.canvas;
        let root = this.root;

        this.containerDiv.style.display = "block";
        canvas.classList.add("hide");

    }
}

export default AnimateHelper;