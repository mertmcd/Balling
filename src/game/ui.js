import UiHelper from "../ui/uiHelper";
import Banner from "../ui/core/banner";
import BottomBanner from "../ui/core/bottomBanner";
import TexturedButton from "../ui/buttons/textured";

var main;

class Ui{
    constructor(div){
        main = app.main;
        this.div = div;
        var uiHelper = new UiHelper(div);
        this.uiHelper = uiHelper;
    }

    prepare(){
        ////BANNER
        let banner = new Banner("SOME TEXT HERE", "#ffffff", "#333333");
        this.uiHelper.add(banner, true);

        ///BOTTOM BANNER
        let bb = new BottomBanner(require('../../assets/ui/bottomBanner0.png'));
        this.uiHelper.add(bb, true, main.gotoLink);

        /*
        ////BUTTON
        let btn = new TexturedButton("PLAY NOW!", require('../../assets/ui/bottomBanner0.png'), "#ff0000");
        this.uiHelper.add(btn, true);
        */

        //btn.css("opacity", 0.5);
        //btn.attr("data-asd", "asd"); ///sets attribute
        //btn.attr("data-asd"); ///gets attribute

        /*
        btn, bb, banner aren't dom objects. to use dom object of them use
        btn.wrapper 
        bb.wrapper
        banner.wrapper
        */
        
    }


    resize(w,h){
        this.uiHelper.resize(w,h);
    }

    addEndCard(){

    }

    show(){
        this.div.classList.add("hide");
        this.div.classList.remove("show");
    }

    hide(){
        this.div.classList.add("show");
        this.div.classList.remove("hide");
    }
}

export default Ui;