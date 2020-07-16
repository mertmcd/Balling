
import { BloomEffect, EffectComposer, EffectPass, RenderPass, HueSaturationEffect } from "postprocessing";


let renderer = main.renderer//new WebGLRenderer();
    
const composer = new EffectComposer( renderer );
const camera = main.camera;//new PerspectiveCamera();
const scene = main.scene;//new Scene();

/// a little delay to wait for responsive
setTimeout(function(){
    const effectPass = new EffectPass(camera, new HueSaturationEffect({saturation:2}));
    effectPass.renderToScreen = true;

    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(effectPass);

    const clock = new Clock();

    console.log(renderer.domElement);

    document.body.appendChild(renderer.domElement);
    (function render() {

        requestAnimationFrame(render);
        composer.render(clock.getDelta());
        //main.renderer.render(scene,camera);

    }());
}, 50);
