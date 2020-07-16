var list = [];

class SpriteSheetCSS{
    constructor(){

    }

    static add(target, src, frameWidth, frameHeight, numOfRows, numOfCols, totalFrame,speed = 1,repeat=0,yoyo){
        if(src){
            target.style.background = "url(" +src + ")";
        }
        
        target.style.width = frameWidth + "px";
        target.style.height = frameHeight + "px";

        let no = 0;
        let row = 0;
        let col = 0;
        totalFrame = totalFrame === undefined ? numOfRows*numOfCols : totalFrame;

        list.push({
            target, frameWidth, frameHeight,totalFrame,no,row,col,speed,
            time:0, numOfCols, numOfRows,repeat,yoyo,
            step:1
        });
    }

    static remove(target){
        for(let i= list.length-1;i>=0;i--){
            if(list[i].target == target){
                list.splice(i,1);
            }
        }
    }

    static update(ratio = 1){
        for(let i= list.length-1;i>=0;i--){
            let anim = list[i];
            anim.time+= anim.speed*ratio;
            if(anim.time >= 1){
                anim.time = 0;
                anim.col+=anim.step;
                anim.no+=anim.step;

                if(anim.no >= anim.totalFrame || anim.no <= 0){
                    if(anim.yoyo){
                        anim.step *= -1;
                        if(anim.step == 1){
                            anim.repeat--;
                        }
                        anim.col+= anim.step;
                    }
                    else{
                        anim.repeat--;
                        anim.col = 0;
                        anim.row = 0;
                        anim.no = 0;
                    }
                    
                    if(anim.repeat<0){
                        list.splice(i,1);
                        continue;
                    }

                    //anim.no = 0;
                    
                }

                
                if(anim.col < 0 && anim.step == -1){
                    anim.col = anim.numOfCols-1;
                    anim.row--;
                }
            
                if(anim.col >= anim.numOfCols && anim.step == 1){
                    anim.col = 0;
                    anim.row++;
                }
                
                //console.log(anim.row, anim.col);

                let posx = -anim.col * anim.frameWidth + "px";
                let posy = -anim.row * anim.frameHeight + "px";

                anim.target.style.backgroundPosition = posx +" " +posy;

            }
        }
    }
}

export default SpriteSheetCSS;