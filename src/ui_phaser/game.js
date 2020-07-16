import assetManager from "./assetManager";
import phaserPlusPlus from "./ppp.js";

import 'phaser';

let gameScene = {
    key: "game-scene",
    active: true,
    create: createGame,
    update: updateGame,
    preload: preloadGame
};
let uiScene = {
    key: "ui-scene",
    active: true,
    create: createUi,
};

let lastWidth, lastHeight, aspectRatio;
let currentWidth, currentHeight, squareness, isLandscape;
let currentTime, deltaTime;
let main, data;

let gameData = {};

/** @type {Phaser.Scene} */
let scene;
/** @type {Phaser.Scene} */
let ui;

function preloadGame(){
        
}

function createGame() {
    this.input.on("pointerdown", function () {
        main.interacted();
    });

    if (scene) {
        gameData.isRestarted = true;
        startGame.call(this);
        return;
    } else {
        gameData.isRestarted = false;
    }

    main = app.main;
    data = app.data;

    lastWidth = main.lastWidth;
    lastHeight = main.lastHeight;

    scene = this;
    scene.lastWidth = lastWidth;
    scene.lastHeight = lastHeight;

    assetManager.loadAssets.call(this, main, () => {
        phaserPlusPlus.upgradePhaser();
        startGame.bind(this)();        
    });

    main.game.events.on("gameresized", function (w, h) {
        resizeAll(w, h);
    });

    main.game.events.on("postresized", function (w, h) {});

    main.game.events.on("gamecontinue", function (w, h) {
        
    });

    main.game.events.on("gamepaused", function (w, h) {
        
    });
}




function startGame() {
    if (data.soundEnabled) {
        if (app.type != "mobvista") app.playMusic();
        main.game.soundOn = true;
    }
    
    let text = scene.add.text(
        0,0,"THIS SCENE BROUGHT TO YOU by PHASER", 
        {
            fontFamily:'ui-font', fontSize: 40, color:'#000000',
            align:'center',
            wordWrap:{width:400}
        }
    ).setOrigin(0.5);

    text.onResizeCallback = function(w,h){
        let scale = Math.min(w*0.5/this.width, h*0.25/this.height);

        this.setScale(scale);
        this.x = w*0.5;
        this.y = h*0.75;

        scene.tweens.killTweensOf(this);

        scene.tweens.add({
            targets: this,
            scale: this.scale*0.8,
            duration: 500,
            yoyo: true,
            repeat: -1,
            repeatDelay: 1000,
            ease:"Back"
        })
    }


    var particles = this.add.particles('particles');

    let emitter = particles.createEmitter({
        frame: { frames: [ 6 ]},
        x: 600, y: 450,
        lifespan: { min: 600, max: 800 },
        angle: { start: 0, end: 360, steps: 64 },
        speed: 200,
        quantity: 64,
        scale: { start: 0.2, end: 0.1 },
        frequency: -1,
        blendMode: 'ADD'
    });


    function emitTime(){

        let x = Math.round(lastWidth*Math.random());
        let y = Math.round(lastHeight*Math.random());
        
        emitter.emitParticleAt(x, y, 64);
        
        let time = Math.round(1000+1000*Math.random());
        scene.time.delayedCall(time, ()=>{
            emitTime();
        })
    }


    emitTime();


}



function updateGame(time, delta) {
    currentTime = time;
    deltaTime = delta;

    main.update();

}

function resizeAll(w, h) {
    lastWidth = w;
    lastHeight = h;

    scene.lastWidth = lastWidth;
    scene.lastHeight = lastHeight;

    currentWidth = w;
    currentHeight = h;

    scene.resizeWidth = w;
    scene.resizeHeight = h;
    ui.resizeWidth = w;
    ui.resizeHeight = h;

    aspectRatio = lastWidth / lastHeight;
    squareness = aspectRatio > 1 ? 1 / aspectRatio : aspectRatio;
    isLandscape = w > h;

    scene.aspectRatio = aspectRatio;
    scene.squareness = squareness;
    scene.isLandscape = isLandscape;

    ui.aspectRatio = aspectRatio;
    ui.squareness = squareness;
    ui.isLandscape = isLandscape;

    //scene.resizeManager.resize(w, h);
    //ui.resizeManager.resize(w, h);
}

function createUi() {
    ui = this;
}



function endGame() {
    scene.time.delayedCall(200, () => {
        if (data.endCardFullScreenClick) {
            scene.input.on("pointerdown", main.gotoLink);
        }
    });

    scene.time.delayedCall(2000, () => {
        if (data.goToMarketDirectly) {
            main.gotoLink();
        }
    });
}

export {
    gameScene,
    uiScene
};
