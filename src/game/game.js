import assetManager from "./assetManager";
import Confetti from "../utils/confetti";
import Ui from "./ui";
import Level from "./level";
import AnimateTest from "./animateTest";

var gameEnded = false;
var main, clock, controls, ui;
var isTest = true;
var data, confettiMaker;
var updateFunction;

class Game {
  constructor(_main) {}

  boot(_main) {
    main = _main;
    main.data = app.data;
    data = app.data;
    main.isTest = isTest;

    main.renderer.outputEncoding = THREE.GammaEncoding;
    main.renderer.gammaFactor = 2.2;

    ////add fog here if you want fog

    clock = new THREE.Clock();

    if (app.type == "tapjoy" && window.TJ_API) {
      window.TJ_API.setPlayableBuild("v1.0");
      window.TJ_API.setPlayableAPI({
        skipAd: function () {
          app.data.hasTryAgain = false;
          this.endGame(false);
        },
      });
    }

    assetManager.loadAssets(main, (list) => {
      this.assetList = list;
      main.assets = list;
      main.assetsLoaded();
    });
  }

  init(fromRestart) {
    confettiMaker = new Confetti(main.scene);
    this.initLights();
    this.initControls();

    let cam = main.camera;
    cam.position.set(0, 20, 20);
    cam.lookAt(0, 0, 0);

    // main.initCannonDebug();
    main.world.allowSleep = true;

    this.level = new Level();
    this.level.start();

    if (fromRestart) {
      return;
    }

    ////call these functions once
    updateFunction = this.update.bind(this);
    this.initUi();
    this.update();
    this.initTouchEvents();

    this.onResizeCallback(main.lastWidth, main.lastHeight);
    setTimeout(() => {
      this.onResizeCallback(main.lastWidth, main.lastHeight);
    }, 500);

    // let animateTest = new AnimateTest("test2");
    // setTimeout(()=>{
    //     animateTest.showEndCard();
    // }, 2000);
  }

  initControls() {
    controls = main.utility.initControls();
    //controls = main.utility.initControlsPointer(); ///for pepjs
    app.controls = controls;

    if (isTest) {
      isTest = false;
      window.onkeydown = function (e) {
        if (e.key == "a" && !isTest) {
          isTest = true;
          controls = main.utility.startOrbitControls(0, 1500);
        }

        if (e.key == "s" && isTest) {
          isTest = false;
          controls.dispose && controls.dispose();
        }
        main.isTest = isTest;
      };
    }
  }

  initUi() {
    let uiDiv = document.getElementById("ui");
    ui = new Ui(uiDiv);
    ui.prepare();
  }

  update() {
    main.update();
    requestAnimationFrame(updateFunction);

    var delta = clock.getDelta();
    if (!delta || isNaN(delta)) delta = 0.01;
    if (delta > 0.03) delta = 0.03;
    var ratio = delta * 60;

    this.level.update(ratio, delta);

    confettiMaker && confettiMaker.update();

    main.CANNON && main.CANNON.cannonDebugRenderer && main.CANNON.cannonDebugRenderer.update();
    main.world && main.world.step(delta);
    main.renderer.render(main.scene, main.camera);
  }

  onResizeCallback() {
    if (!main) {
      return;
    }
    let w = window.innerWidth;
    let h = window.innerHeight;

    app.w = w;
    app.h = h;

    if (ui) {
      ui.resize(w, h);
    }
  }

  initLights() {
    let lightColor = 0xffffff;

    let ambientLight = new THREE.AmbientLight(lightColor, 1); //0.7
    main.scene.add(ambientLight);

    var dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(-300, 1000, 0);
    main.scene.add(dirLight);
  }

  initTouchEvents() {
    function pointerDown(e) {
      let install = ui.install;
      let bottomBanner = ui.bottomBanner;

      if (install && !install.classList.contains("show")) {
        install.classList.add("show");
        install.resize && install.resize();
      }

      if (bottomBanner && !bottomBanner.classList.contains("show")) {
        bottomBanner.classList.add("show");
        bottomBanner.resize && bottomBanner.resize();
      }

      if (!main.timeStarted && app.type != "mobvista") {
        main.startTimer();
      }
    }

    function pointerUp(e) {}

    let domElement = document.body;

    ///pointer events require pepjs on safari
    /*domElement.addEventListener("pointerdown", pointerDown);
        domElement.addEventListener("pointerup", pointerUp);
        domElement.addEventListener("pointermove", pointerMove);*/

    domElement.addEventListener("touchstart", pointerDown);
    domElement.addEventListener("touchend", pointerUp);

    if ("ontouchstart" in document.documentElement) {
    } else {
      domElement.addEventListener("mousedown", pointerDown);
      domElement.addEventListener("mouseup", pointerUp);
    }
  }

  endGame(didWon, reason) {
    if (gameEnded) {
      return;
    }

    gameEnded = true;
    main.gameEnded = true;

    ui.addEndCard();
    ////Call this part if the game is completely ended

    if (app.type == "tapjoy" && window.TJ_API) {
      if (didWon) {
        window.TJ_API && window.TJ_API.objectiveComplete();
      }
      window.TJ_API && window.TJ_API.gameplayFinished();

      if (window.TJ_API && window.TJ_API.directives.showEndCard) {
        // render end card
      } else {
        /* prepare for Tapjoy endcard */
        return;
      }
    }

    main.gameFinished(didWon, reason);
  }

  restartGame() {
    main.restartGame(data.totalTime);

    gameEnded = false;
    main.gameEnded = false;
    let scene = main.scene;

    for (var i = scene.children.length - 1; i >= 0; i--) {
      let obj = scene.children[i];
      scene.remove(obj);
      if (obj.body) {
        if (main.CANNON) {
          main.world.remove(obj.body);
        } else if (main.matter) {
          main.mater.removeBody(obj.body);
        }
      }
    }

    main.objectMaker.clear();
    this.init(true);
  }
}

export default Game;
