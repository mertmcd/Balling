import './circleBar.css';
import helper from '../helper';
import SvgMaker from '../svg/svgMaker';
import BaseObject from '../BaseObject';

class CircleBar extends BaseObject{
    constructor(config = {
        bgColor: "#ffffff", fillColor: "#ff0000", centerObject:null, centerObjectScale: 0.8, 
        fillInside: true, innerWidth : 80, strokeWidth:30, strokeWidthTop:24,
        scale:{
            portrait:{w:0.2, h:0.13},
            landscape:{w:0.2, h:0.13},
        }
    }){
        super();
        let defaultConfig = {
            bgColor: "#ffffff", fillColor: "#ff0000", centerObject:null, centerObjectScale: 0.8, 
            fillInside: true, innerWidth : 80, strokeWidth:30, strokeWidthTop:24,
            scale:{
                portrait:{w:0.2, h:0.13},
                landscape:{w:0.2, h:0.13},
            }
        };

        

        config = Object.assign(defaultConfig, config);
        console.log(config);

        let bgColor = config.bgColor,
            fillColor = config.fillColor,
            centerObject = config.centerObject,
            centerObjectScale = config.centerObjectScale,
            fillInside = config.fillInside,
            innerWidth = config.innerWidth,
            strokeWidth = config.strokeWidth,
            strokeWidthTop = config.strokeWidthTop;


        let wrapper = document.createElement("div");
        wrapper.className = "circle-bar";

        let svgCircle = document.createElement("div");
        svgCircle.className = "svg-circle";

        let width = innerWidth *2+strokeWidth;
        wrapper.style.width = width + "px";
        wrapper.style.height = width + "px";
        //holder.width = width;
        let radius = Math.round(width*0.5);
        let x = radius;
        let y = radius;

        let backCircle = SvgMaker.addSvg(null,width,width,"progress-ring");
        SvgMaker.addCircle(
            backCircle, x, y, innerWidth,
            fillInside ? bgColor : "transparent", bgColor, strokeWidth,
            "progress-ring__circle"
        );

        let topCircle = SvgMaker.addSvg(null,width,width,"progress-ring");
        SvgMaker.addCircle(
            topCircle, x, y, innerWidth,
            "transparent", fillColor, strokeWidthTop,
            "progress-ring__circle"
        );

        svgCircle.appendChild(backCircle);
        svgCircle.appendChild(topCircle);

        topCircle.style.transform= "rotate(-90deg) scale(1,-1)";
        let circumference = innerWidth * 2 * Math.PI;
        topCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        topCircle.style.strokeDashoffset = `${circumference}`;

        let centerEl;
        ///is center object a string
        if(typeof centerObject == "string"){
            ///is it base64 file
            if(centerObject.indexOf("data:image")>=0){
                centerEl = helper.addImage( centerObject );
            }
            //it is a text than
            else{
                ///add text here somehow
                centerEl = document.createElement("p");
                centerEl.innerHTML = centerObject;
            }
        }
        else{
            centerEl = centerObject;
        }

        wrapper.appendChild(svgCircle);

        if(centerEl){
            wrapper.appendChild(centerEl);
            centerEl.style.maxWidth =  radius * centerObjectScale + "px";
            centerEl.style.maxHeight = radius * centerObjectScale + "px";
            centerEl.className = "circle-bar-center-object";
        }
        
        
        this.wrapper = wrapper;
        this.svgCircle = svgCircle;
        this.topCircle = topCircle;
        this.centerEl = centerEl;
        this.width = width;
        this.scale = config.scale;        
        this.circumference = circumference;


        this.updateFill(90);


    }

    defResize(w,h){
        let holder = this.wrapper;
        let bgWidth = this.width;

        let ratio = w>h ? this.scale.landscape : this.scale.portrait;
        let scale = Math.min( w * ratio.w/bgWidth, h * ratio.h/bgWidth);

        bgWidth *= scale;
        
        holder.style.transform = "scale("+scale+")";

        holder.style.left = w * 0.5 - bgWidth * 0.7 * scale + "px";
        holder.style.top = h * 0.3 - bgWidth * 0.5 * scale+ "px";

        holder.curWidth = bgWidth;
        holder.curScale = scale;

    }

    updateFill(percent){
        let circumference = this.circumference;
        let circle= this.topCircle;

        const offset = circumference - percent / 100 * circumference;
        circle.style.strokeDashoffset = offset;

    }

    locate(rx, ry){
        let holder = this.wrapper;
        holder.style.left = app.w * rx - holder.curWidth * 0.5  + "px";
        holder.style.top = app.h * ry - holder.curWidth * 0.5 + "px";
    }
}

export default CircleBar;