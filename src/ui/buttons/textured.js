import './textured.css';
import helper from '../helper';
import BaseObject from '../BaseObject';


class TexturedButton extends BaseObject{
    constructor( text, bg, textColor = "#ffffff" ){
        super();
        let wrapper = document.createElement("div");

        let btnInner = document.createElement("div");
        let btnBg = helper.addImage(bg, true);
        
        let btnText = document.createElement("p");
        btnText.innerHTML = text;
        btnText.style.color = textColor;
        
        wrapper.className = "textured-btn-holder";
        btnInner.className = "textured-btn";
        

        btnInner.appendChild(btnBg);
        btnInner.appendChild(btnText);
        wrapper.appendChild(btnInner);

        this.wrapper = wrapper;
        this.btnInner = btnInner;
        this.btnBg = btnBg;
        this.btnText = btnText;

        //this.defResize(600,800);

        this.width = 300;
        this.height = 80;

        btnBg.onload = ()=>{
            this.resizeText();

            this.width = btnBg.naturalWidth;
            this.height = btnBg.naturalHeight;
        }
        
    }

    updateText(str){
        this.btnText.innerHTML = str;
        this.resizeText();
    }

    resizeText(ox=0.5, oy=0.52, wr = 0.8, hr = 0.8){
        let img = this.btnBg;
        let text = this.btnText;

        text.style.transform = "scale("+1+")";
        let tcw = text.clientWidth;
        let tch = text.clientHeight;

        let bw = img.naturalWidth * (img.currentScale || 1);
        let bh = img.naturalHeight * (img.currentScale || 1);
        
        let scale = Math.min(bw*wr/tcw, bh*hr/tch);
        text.style.transform = "scale("+scale+")";
        text.style.left = bw * ox - tcw * 0.5 * scale + "px";
        text.style.top = bh * oy - tch * 0.5 * scale + "px";

    }

    defResize(w,h){    
        
        return;
        
        let btnImg = this.btnImg;
        let btnInner = this.btnInner;
        let btnTextObj = this.btnTextObj;

        

        helper.scaleElement(btnTextObj, btnImg.naturalWidth, btnImg.naturalHeight,0.7,0.8);

        btnTextObj.style.left = (btnImg.naturalWidth*0.5 - btnTextObj.curWidth*0.5)+"px";
        btnTextObj.style.top = (btnImg.naturalHeight*0.5 - btnTextObj.curHeight*0.5)+"px";


        /*if(this.resizeOnce)return;

        helper.scaleElement(btnInner, w, h, 0.5,0.2);
        btnInner.style.left = (w*0.5 - btnInner.curWidth*0.5)+"px";

        this.wrapper.curWidth = btnImg.naturalWidth * btnInner.curScale;
        this.wrapper.curHeight = btnImg.naturalHeight * btnInner.curScale;

        this.wrapper.style.height = btnImg.naturalHeight * btnInner.curScale + "px";
        */
    }

}



export default TexturedButton;
