class Snapshot{
    constructor(){

    }

    static take(main, objectList, addLights=true, cameraPos, resolution = 1){

        let rendererConfig = {
            antialias: true,
            alpha: true,
            preserveDrawingBuffer: true
        };
        
    
        let tempScene = new THREE.Scene();
        let tempRenderer = new THREE.WebGLRenderer(rendererConfig);
    
        tempRenderer.outputEncoding = main.renderer.outputEncoding;
        tempRenderer.gammaFactor = main.renderer.gammaFactor;
        tempRenderer.setClearColor(0x000000, 0);
    
        
        var meshList = objectList;
        
        if(!meshList){
            meshList = main.scene.children.concat();
        }
        else if(addLights){
            for(let i=0;i<main.scene.children.length;i++){
                let obj = main.scene.children[i];
                if(obj.type.indexOf("Light") >= 0){
                    meshList.push(obj);
                }
            }
        }
        
        for(let obj of meshList){
            tempScene.add(obj.clone());
        }
        
        
        function resizeCanvas(canvas, renderer) {
        
            //var resolution = 2;
            var scale = 1 / resolution;
            canvas.setAttribute('style', ' -ms-transform: scale(' + scale + '); -webkit-transform: scale3d(' + scale + ', 1);' + ' -moz-transform: scale(' + scale + '); -o-transform: scale(' + scale + '); transform: scale(' + scale + ');' + ' transform-origin: top left;');
            var iw = window.innerWidth,
                ih = window.innerHeight;
            
      
            /*var realWidth = iw;
            var realHeight = ih;
      
            if (!iw || !ih) {
              setTimeout(function () {
                resizeCanvas(event);
              }, 500);
              return;
            }*/
      
      
            document.body.style.maxWidth = iw + "px";
            document.body.style.maxHeight = ih + "px";
            iw *= resolution;
            ih *= resolution;
            var styleWidth = iw + "px";
            var styleHeight = ih + "px";
            canvas.style.maxWidth = styleWidth;
            canvas.style.maxHeight = styleHeight;
            canvas.style.width = styleWidth;
            canvas.style.height = styleHeight;
            
            renderer.setSize(iw, ih);
            
        }
        
        resizeCanvas(tempRenderer.domElement, tempRenderer);
    
        let mainCamera = main.camera;
        let tempPos = mainCamera.position.clone();

        if(cameraPos){
            mainCamera.position.copy(cameraPos);
        }
        
    
        tempRenderer.render(tempScene, mainCamera);
        
        let src = tempRenderer.domElement.toDataURL();
    
        for(let i=tempScene.children.length-1;i>=0;i--){
            tempScene.remove(tempScene.children[i]);
        }
    
        mainCamera.position.copy(tempPos);
    
        return src;
    
    
    }


    
    

}


export default Snapshot;
