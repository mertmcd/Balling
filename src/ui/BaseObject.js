class BaseObject{
    constructor(){

    }

    css(name, value){
        this.wrapper.style[name] = value;
    }

    attr(name, value){
        if(value == undefined){
            return this.wrapper.getAttribute(name);
        }

        this.wrapper.setAttribute(name, value);
    }
}

export default BaseObject;