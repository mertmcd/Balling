import './bottomBanner.css';
import helper from "../helper";
import BaseObject from '../BaseObject';

class BottomBanner extends BaseObject{
    constructor(imageSrc, opacity = 1){
        super();
        var wrapper= document.createElement("div");
        wrapper.className="bottom-banner";
        if(opacity != 1){
            wrapper.style.opacity = opacity;
        }
        
            
        
        var innerDiv = document.createElement("div");    
        var img = helper.addImage(imageSrc, true);
        
        innerDiv.appendChild(img);
        innerDiv.style.height = "100%";
        wrapper.appendChild(innerDiv);

        this.wrapper = wrapper;

        
    }
}

export default BottomBanner;