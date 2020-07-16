import './textBox.css';
import helper from '../helper';

function textBox(str, bgColor, textColor, maxWidth= 0.8, maxHeight=0.1){
    let box = document.createElement("div");
    box.className = "text-box";
    box.style.background = bgColor;

    let text = helper.addTextCss(str);
    text.style.color = textColor;

    box.appendChild(text);

    box.resize = function(w,h){
        let bgWidth = 400;
        let bgHeight = 60;

        let scale = Math.min(w*maxWidth/bgWidth, h*maxHeight/bgHeight);

        bgWidth *= scale;
        bgHeight *= scale;
        box.style.width = bgWidth + "px";
        box.style.height = bgHeight + "px";

        box.style.borderRadius = Math.min(scale*20,20)+"px";

        let textWidth = text.clientWidth;
        let textHeight = text.clientHeight;
        let textScale = Math.min(bgWidth*0.8/textWidth, bgHeight*0.7/textHeight);

        text.style.transform = "scale("+textScale+")";
        text.style.left = bgWidth * 0.5 - textWidth * 0.5 *textScale+ "px";
        text.style.top = bgHeight * 0.5 - textHeight * 0.5 *textScale + "px";


        


        box.curWidth = bgWidth;
        box.curHeight = bgHeight;
    }

    box.setText = function(str){
        text.innerHTML = str;
        //this.resize(app.main.lastWidth, app.w, app.h);
    }

    return box;
}


export default textBox;