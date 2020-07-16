import './simple.css';
import helper from '../helper';
import BaseObject from '../BaseObject';

class SimpleButton extends BaseObject{
    constructor( str = "PLAY NOW", bgColor = "#ff0000", textColor = "#ffffff" ){
        super();
        let wrapper = document.createElement("div");
        let text = document.createElement("span");

        text.style.color = textColor;
        text.innerHTML = str;
        wrapper.style.background = bgColor;    
        wrapper.className = "simple-btn";

        wrapper.appendChild(text);

        this.wrapper = wrapper;
        this.text = text;
    }

    defResize(w,h){
        let btn = this.wrapper;
        let text = this.text;

        let bgWidth = 230;
        let bgHeight = 40;
        
        let scale = Math.min(w*0.6/bgWidth, h*0.1/bgHeight);
        bgWidth *= scale;
        bgHeight *= scale;

        btn.style.width = bgWidth+"px";
        btn.style.height = bgHeight+"px";
        //let bgWidth = btn.clientWidth || 200;
        //let bgHeight = btn.clientHeight || 60;
        helper.scaleElement(text, bgWidth, bgHeight, 0.8, 0.8);

        text.style.left = (bgWidth*0.5 - text.curWidth*0.5) + "px";
        text.style.top = (bgHeight*0.5 - text.curHeight*0.5) + "px";

        btn.curWidth = bgWidth;
        btn.curHeight = bgHeight;
    }

}



export default SimpleButton;
