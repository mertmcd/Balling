class SvgMaker{
    constructor(){}

    static addSvg(id, width, height, className){

        let svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        
        svg.id = id || "";
        svg.setAttribute("class", className);
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);
        return svg;

    }

    static addCircle( svg, x, y, radius, fillColor, strokeColor, strokeWidth, className){

        var circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');        
        circle.setAttribute("class", className);
        
        circle.setAttribute("stroke", strokeColor);
        circle.setAttribute("stroke-width", strokeWidth);
        circle.setAttribute("fill", fillColor);
        circle.setAttribute("r", radius);
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);

        console.log(circle);
        svg.appendChild(circle);
    }

    static addRectangle( svg, x, y,  w, h, roundedData, fillColor, strokeColor, strokeWidth, className){

        roundedData = roundedData || [];

        var roundedRectData = function (x,y,w, h, tlr = 0, trr = 0, brr = 0, blr = 0) {
            return 'M ' + x + ' ' +  (tlr + y)
              + ' A ' + tlr + ' ' + tlr + ' 0 0 1 ' + (tlr+x) + ' ' + y
              + ' L ' + (w - trr + x) + ' ' + y
              + ' A ' + trr + ' ' + trr + ' 0 0 1 ' + (w+x)  + ' ' + (trr+y)
              + ' L ' + (w+x) + ' ' + (h - brr+y)
              + ' A ' + brr + ' ' + brr + ' 0 0 1 ' + (w - brr+x) + ' ' + (h+y)
              + ' L ' + (blr+x) + ' ' + (h+y)
              + ' A ' + blr + ' ' + blr + ' 0 0 1 ' + x + ' ' +  (h - blr + y)
              + ' Z';
        };
        

        let pathData = roundedRectData(strokeWidth, strokeWidth, w,h, ...roundedData);

        let path = document.createElementNS('http://www.w3.org/2000/svg', 'path');        
        path.setAttribute("class", className);

        path.setAttribute("d", pathData);
        path.setAttribute("stroke", strokeColor);
        path.setAttribute("stroke-width", strokeWidth);
        path.setAttribute("fill", fillColor);
        path.setAttribute("x", x);
        path.setAttribute("y", y);

        svg.appendChild(path);

        

        //<path d="M20,230 Q40,205 50,230 T90,230" fill="none" stroke="blue" stroke-width="5"/>
    }

}


export default SvgMaker;