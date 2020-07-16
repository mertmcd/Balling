import AnimateHelper from "../utils/AnimateHelper";

require('../../assets/animate/8bit/test');
import anime from 'animejs/lib/anime.es.js';

class AnimateTest{
    constructor(fileName){
        this.isReady = false;
        new AnimateHelper(fileName, (canvas, root, containerDiv)=>{
            this.canvas = canvas;
            this.root = root;
            this.containerDiv = containerDiv;
            this.animateReady();
        });
    }

    animateReady(){
        this.isReady = true;

        
    }

    showEndCard(){

        this.root.gotoAndPlay(0);
        let coverDiv = document.createElement("div");
        coverDiv.className = "screen";
        document.body.appendChild(coverDiv);
        coverDiv.style.zIndex = 100;
        coverDiv.style.background = "rgba(0,0,0,1)";
        coverDiv.style.opacity = 0;

        anime({
            targets: coverDiv,
            opacity: 0.5,
            duration:500,
            easing:"linear"
        });

        let canvas = this.canvas;
        canvas.style.zIndex = 101;
        canvas.style.background = "transparent";
        canvas.classList.add("show");
        canvas.classList.remove("hide");

        let btn_txt = this.root.btn.btn_txt;
        btn_txt.text = "PLAY NOW!";
        btn_txt.textAlign = "center";
        btn_txt.lineWidth = 500;

        let wid = btn_txt.getBounds().width;
        let hei = btn_txt.getBounds().height;
        let scale = Math.min(1, 220/wid);

        btn_txt.scaleX = scale;
        btn_txt.scaleY = scale;

        btn_txt.x = 0;
        btn_txt.y = -hei * 0.5*scale;

        this.root.btn.on("click", ()=>{
            app.main.gotoLink();
        });
    }
}


export default AnimateTest;