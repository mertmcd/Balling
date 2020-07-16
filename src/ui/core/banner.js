import './banner.css';
import helper from "../helper";
import BaseObject from '../BaseObject';

class Banner extends BaseObject{
    constructor(str, textColor, bgColor, opacity = 1){
        super();
        let wrapper = helper.addElement( "div", null, {background: bgColor.replace("0x","#")}, {class:"banner show"} );
        let text = helper.addElement("span", str,{},{class:"text"});

        wrapper.style.opacity = opacity;

        let fontSize = 40;
        text.style.color = textColor.replace("0x", "#");
        text.style.fontSize = fontSize + "px";
        text.style.height = (Number(fontSize)+5)+"px"
        wrapper.appendChild(text);

        this.wrapper = wrapper;
        this.text = text;
        
    }

    defResize(w,h){
        let banner = this.wrapper;
        let bannerText = this.text;

        if(!bannerText.curScale)bannerText.curScale = 1;

        let tw = bannerText.clientWidth / bannerText.curScale;
        let th = bannerText.clientHeight / bannerText.curScale;
        
        let bscale = Math.min( w*0.9 / tw, banner.clientHeight*0.8/th);
        bannerText.style.transform = "scale("+bscale+")";

        bannerText.style.left = (w*0.5 - tw*0.5*bscale) + "px";
        bannerText.style.top = (banner.clientHeight*0.5 - th*0.5*bscale) + "px";
    }

}

export default Banner;
