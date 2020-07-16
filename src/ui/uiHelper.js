class UiHelper{
    constructor(mainDiv){
        this.mainDiv = mainDiv;

        this.list = [];
        this.updateList = [];
    }

    add(item, addToMainDiv, callback){
        this.list.push(item);
        

        if(addToMainDiv){
            this.mainDiv.appendChild(item.wrapper);
        }

        if(callback){
            this.addCallback(item, callback);
        }
    }

    remove(item, removeFromDOM = true){
        if(this.list.indexOf(item) >= 0){
            this.list.splice(this.list.indexOf(item), 1);
        }
        else{
            console.warn("No such element in the list");
        }
        

        if(removeFromDOM){
            item.parent.removeChild(item.wrapper);
        }
    }

    resize(w,h){
        for(let item of this.list){
            item.defResize && item.defResize(w,h);
            item.resize && item.resize(w,h);
        }
    }

    addCallback(item, callback){

        let el = item.wrapper || item;

        el.addEventListener("touchstart",callback);
        if ('ontouchstart' in document.documentElement) {
            
        }
        else{
            el.addEventListener("mousedown",callback);
        }
    }

    hide(){
        this.mainDiv.classList.remove("show");
        this.mainDiv.classList.add("hide");
    }

    show(){
        this.mainDiv.classList.add("show");
        this.mainDiv.classList.remove("hide");
    }

}


export default UiHelper;

