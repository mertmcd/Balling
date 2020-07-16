import './lineBar.css';
import helper from '../helper';
import BaseObject from '../BaseObject';

class LineBar extends BaseObject{
    constructor(data={
        bgColor, fillColor, roundedFill:false,
        width:400, height:60,radius:20, borderThickness:5, borderColor:"#ffffff",
        text:"LEVEL 1", textColor:"#ffffff",
    }){

        super();
        let wrapper = document.createElement("div");
        wrapper.style.width = data.width+"px";
        wrapper.style.height = data.height+"px";
        wrapper.style.borderRadius = data.radius+"px";
        wrapper.style.border = data.borderThickness + "px solid "+data.borderColor;

        let bgRect = document.createElement("div");
        let barRect = document.createElement("div");

        if(data.roundedFill){
            barRect.style.borderRadius = data.radius+"px";
        }
        
        bgRect.style.background = data.bgColor;
        barRect.style.background = data.fillColor;
        //barRect.style.borderRadius = data.radius+"px";

        let barText = document.createElement("p");
        barText.innerHTML = data.text;
        barText.style.color = data.textColor;

        barText.style.lineHeight = data.height + "px";
        
        wrapper.className = "line-bar";
        bgRect.className = "line-bar-bg";
        barRect.className = "line-bar-fill";
        
        wrapper.appendChild(bgRect);
        wrapper.appendChild(barRect);
        wrapper.appendChild(barText);
        
        this.width = data.width;
        this.height = data.height;

        this.wrapper = wrapper;
        this.barRect = barRect;
        this.bgRect = bgRect;
        this.barText = barText;

        this.update(0);
    }

    updateText(str){
        this.barText.innerHTML = str;
    }

    update(ratio){
        ratio = ratio > 1 ? 1 : ratio;
        ratio = ratio < 0 ? 0 : ratio;

        let left = this.width * ratio - this.width;
        if(left >0)left = 0;
        this.barRect.style.left = left + "px";
    }
}


export default LineBar;