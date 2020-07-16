var helper = {};


helper.addImage = function(src , isInteractive){
    let img= document.createElement("img");
    img.className = "not-select"
    img.src=src;
    img.setAttribute("draggable",false);
    
    if(!isInteractive){
        img.style.pointerEvents = "none";
    }
    
    
    img.onmousedown = function(e){
        e.preventDefault();
    }
    
    img.ontouchstart = function(e){
        e.preventDefault();
    }
    return img;
}


helper.addTextCss = function( str , className = "" ){
    let p = document.createElement( "p" );
    p.className = className;
    p.innerHTML = str;
    
    return p;
}


helper.scaleElement = function(el, w, h, ratiox, ratioy, maxScale){
    if(!el)return;

    let ew = el.clientWidth;
    let eh = el.clientHeight;

    let scale = Math.min( w*ratiox/ew, h*ratioy/eh );

    if(maxScale && scale > maxScale)scale = maxScale;

    el.style.transform = "scale("+scale+")";

    el.curWidth = ew*scale;
    el.curHeight = eh*scale;
    el.curScale = scale;

}



helper.addElement = function(tag,html,styles={},attrs={}){
    if(!tag){
        console.warn("we need tag name!")
        return;
    }
    
    var el= document.createElement(tag);
    
    if(html){
        el.innerHTML=html;
    }
    var elStyles="";
    
    for(let prop in styles){
        if(styles.hasOwnProperty(prop)){
            elStyles+=prop+":"+styles[prop];
        }
    }
    
    el.setAttribute("style",elStyles);
    
    for(let prop in attrs){
        if(attrs.hasOwnProperty(prop)){
            el.setAttribute(prop,attrs[prop]);
        }
    }
    
    
    return el;
}



helper.setStyle = function(id,styleName,value){
    var item;
    
    if(typeof id!="string"){
        item= id;
    }else{
        item= document.getElementById(id);
    }
    
    if(item){
        item.style[styleName]=value;
    }
}



helper.hexToRgb = function(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });
  
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
}


helper.rgbToHex = function(r, g, b) {
    
    r=Math.round(r);
    g=Math.round(g);
    b=Math.round(b);
    
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

helper.whitenColor = function(color, ratio = 0.05){
    color = color.replace("0x","#");
    color = this.hexToRgb(color);

    color.r += 255*0.1;
    color.g += 255*0.1;
    color.b += 255*0.1;

    color.r = color.r > 255 ? 255 : color.r;
    color.g = color.g > 255 ? 255 : color.g;
    color.b = color.b > 255 ? 255 : color.b;

    color = this.rgbToHex(color.r, color.g, color.b);

    return color;
}

helper.darkenColor = function(color, ratio = 0.05){
    color = color.replace("0x","#");
    color = this.hexToRgb(color);

    color.r -= 255*0.1;
    color.g -= 255*0.1;
    color.b -= 255*0.1;

    color.r = color.r < 0 ? 0 : color.r;
    color.g = color.g < 0 ? 0 : color.g;
    color.b = color.b < 0 ? 0 : color.b;

    color = this.rgbToHex(color.r, color.g, color.b);

    return color;
}



export default helper;