import './depth.css';
import helper from '../helper';
import BaseObject from '../BaseObject';

class DepthButton extends BaseObject{
    constructor( str = "PLAY NOW", bgColor = "#ff0000", textColor = "#ffffff", borderColor = "#ffffff", borderRadius = 1 ){
        super();
        let wrapper = document.createElement("div");
        let innerDiv = document.createElement("div");
        let text = document.createElement("span");

        text.style.color = textColor;
        text.innerHTML = str;
        innerDiv.style.background = bgColor;    
        wrapper.className = "depth-btn";

        let depthColor = helper.darkenColor(bgColor,0.1);

        wrapper.style.background = borderColor;

        innerDiv.appendChild(text);
        wrapper.appendChild(innerDiv);

        this.wrapper = wrapper;
        this.text = text;
        this.innerDiv = innerDiv;


        this.depthColor = depthColor;
        this.borderColor = borderColor;
        this.borderRadius = borderRadius;
    }

    defResize(w,h){
        let btn = this.wrapper;
        let text = this.text;
        let innerDiv = this.innerDiv;

        let bgWidth = 210;
        let bgHeight = 90;
        
        let scale = Math.min(w*0.6/bgWidth, h*0.1/bgHeight);

        if(w>h){
            scale = Math.min(w*0.6/bgWidth, h*0.13/bgHeight);
        }
        bgWidth *= scale;
        bgHeight *= scale;

        btn.style.width = bgWidth+"px";
        btn.style.height = bgHeight+"px";

        innerDiv.style.width = bgWidth+"px";
        innerDiv.style.height = (bgHeight *0.9)+"px";
        innerDiv.style.boxShadow = "0 " + (bgHeight *0.1)+"px "+this.depthColor;

        let borderThicknes = Math.round(Math.min(bgWidth*0.08, bgHeight*0.08));
        btn.style.border = borderThicknes + "px solid "+this.borderColor;
        
        helper.scaleElement(text, bgWidth, bgHeight, 0.8, 0.8);

        text.style.left = (bgWidth*0.5 - text.curWidth*0.5) + "px";
        text.style.top = (bgHeight*0.5 - text.curHeight*0.5) + "px";

        btn.curWidth = bgWidth + borderThicknes * 2;
        btn.curHeight = bgHeight + borderThicknes * 2;

        if(this.borderRadius){
            let radius = Math.min(bgWidth*0.5*this.borderRadius, bgHeight*0.5*this.borderRadius);
            innerDiv.style.borderRadius = radius + "px";
            btn.style.borderRadius = radius + "px";
        }
    }

}



export default DepthButton;
