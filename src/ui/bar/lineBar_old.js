import './lineBar.css';
import helper from '../helper';
import SvgMaker from '../svg/svgMaker';

class LineBar{
    constructor(bgColor, fillColor, borderRadiusRatio=0.1, endObject, portraitWidth= 0.8, landscapeWidth=0.65){

        let wrapper = document.createElement("div");
        wrapper.className = "line-bar";
        wrapper.style.background = bgColor;
        //let svg = SvgMaker.addSvg("line-bar", width+2*strokeWidth,height+2*strokeWidth);
        //SvgMaker.addRectangle(svg, strokeWidth, strokeWidth, width, height, borders, fillColor, strokeColor, strokeWidth);

        let fill = document.createElement("div");
        fill.style.background = fillColor;
        
        wrapper.appendChild(fill);
        
        if(endObject){
            //let endHolder = document.createElement("div");
            let endEl;

            if(typeof endObject == "string"){
                ///is it base64 file
                if(endObject.indexOf("data:image")>=0){
                    endEl = helper.addImage( endObject );
                }
                //it is a text than
                else{
                    ///add text here somehow
                    endEl = document.createElement("p");
                    endEl.innerHTML = endObject;
                }
            }
            else{
                endEl = endObject;
            }

            wrapper.appendChild(endEl);
            endEl.className = "line-bar-object";
        }


        this.wrapper = wrapper;
    }
}

/*
function lineBar( bgColor, fillColor, borderRadiusRatio=0.1, endImageSrc, portraitWidth= 0.8, landscapeWidth=0.65){
    let holder = document.createElement("div");
    holder.className = "line-bar";
    holder.style.background = bgColor;

    let fill = document.createElement("div");
    fill.style.background = fillColor;
    fill.ratio = 1;

    let endHolder = document.createElement("div");
    //let endImage = helper.addImage(endImageSrc);
    let endImage = `
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="none" x="0px" y="0px" width="32px" height="32px" viewBox="0 0 32 32">
    <defs>
    <g id="Layer0_0_FILL">
    <path fill="${fillColor}" stroke="none" d="
    M 25.25 17.95
    L 23.45 17.95 23.45 19.3 21.2 19.3 21.2 17.95 19.4 17.95 19.4 19.3 17.1 19.3 17.1 17.95 15.3 17.95 15.3 19.3 12.85 19.3 12.85 17.95 11.05 17.95 11.05 19.3 8.85 19.3 8.85 17.95 7.05 17.95 7.05 19.3 5.1 19.3 5.1 21.3 7.05 21.3 7.05 24.95 5.1 24.95 5.1 26.95 7.05 26.95 7.05 27.95 8.85 27.95 8.85 26.95 11.05 26.95 11.05 27.95 12.85 27.95 12.85 26.95 15.3 26.95 15.3 27.95 17.1 27.95 17.1 26.95 19.4 26.95 19.4 27.95 21.2 27.95 21.2 26.95 23.45 26.95 23.45 27.95 25.25 27.95 25.25 26.95 26.9 26.95 26.9 24.95 25.25 24.95 25.25 21.3 26.9 21.3 26.9 19.3 25.25 19.3 25.25 17.95
    M 21.2 21.3
    L 23.45 21.3 23.45 24.95 21.2 24.95 21.2 21.3
    M 17.1 21.3
    L 19.4 21.3 19.4 24.95 17.1 24.95 17.1 21.3
    M 12.85 21.3
    L 15.3 21.3 15.3 24.95 12.85 24.95 12.85 21.3
    M 8.85 21.3
    L 11.05 21.3 11.05 24.95 8.85 24.95 8.85 21.3
    M 22 16.9
    L 22 10.45 24.3 10.45 16 4.1 7.7 10.45 10.05 10.45 10.05 16.9 22 16.9 Z"/>
    </g>
    </defs>
    
    <g transform="matrix( 1, 0, 0, 1, 0,0) ">
    <use xlink:href="#Layer0_0_FILL"/>
    </g>
    </svg>
    `;
    //endHolder.appendChild(endImage);
    endHolder.innerHTML = endImage;
    endHolder.style.background = bgColor;

    holder.appendChild(fill);
    holder.appendChild(endHolder);

    holder.fill = fill;

    holder.resize = function(w,h){
        let bgWidth = 400;//224 21
        let bgHeight = 40;

        let maxWidth = w>h ? landscapeWidth : portraitWidth;
        let maxHeight = w>h ? 0.05:0.03;

        let scale = Math.min(w*maxWidth/bgWidth, h*maxHeight/bgHeight);

        //bgWidth *= scale;
        bgHeight *= scale;
        bgWidth = maxWidth * w;
        holder.style.width = bgWidth + "px";
        holder.style.height = bgHeight + "px";

        holder.style.borderRadius = Math.min(scale*20,20)+"px";

        fill.style.borderRadius = holder.style.borderRadius;

        let borderRadius = borderRadiusRatio * bgHeight;
        fill.style.left =  borderRadius + "px";
        fill.style.top =  borderRadius + "px";

        fill.style.width = bgWidth -borderRadius*2 + "px";
        fill.style.height = bgHeight -borderRadius*2 + "px";

        

        holder.style.left = w * 0.5 - bgWidth * 0.5 + "px";
        holder.style.top = h * 0.1 + "px";

        if(app.data.hasBanner){
            holder.style.top = h * 0.12 + "px";
        }

        endHolder.style.width = bgHeight*1.5 + "px";
        endHolder.style.height = bgHeight*1.5 + "px";
        endHolder.style.right = -bgHeight * 0.5 + "px";
        
        fill.fullWidth = bgWidth - borderRadius * 2;
        if(endImageSrc){
            fill.fullWidth -= bgHeight * 0.9;
        }


        holder.curWidth = bgWidth;
        holder.curHeight = bgHeight;

        this.updateFill(fill.ratio);
    }


    holder.updateFill = function(ratio){
        fill.ratio = ratio;
        
        fill.style.width = fill.fullWidth * ratio + "px";

    }

    holder.updateFillRatio = function(val){
        fill.ratio += val;
        fill.ratio = fill.ratio > 1 ? 1 : fill.ratio;
        fill.ratio = fill.ratio < 0 ? 0 : fill.ratio;

        this.updateFill(fill.ratio);
    }

    return holder;
}
*/

export default LineBar;