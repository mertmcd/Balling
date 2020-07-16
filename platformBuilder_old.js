var fs = require('fs');

var allPlatforms={
    /*applovin:{
        name:"applovin",
        hasLink:true
    },
    {
        name:"fb"
    },
    {
        name:"vungle"
    },
    {
        name:"unity",
        hasLink:true
    },
    {
        name:"adcolony",
        hasLink:true
    },
    {
        name:"lifestreet",
        hasLink:true
    },*/
    dapi_iron:{
        name:"dapi_iron",
        beforeHead:'<script>function getScript(e,i){var n=document.createElement("script");n.type="text/javascript",n.async=!0,i&&(n.onload=i),n.src=e,document.head.appendChild(n)}function parseMessage(e){var i=e.data,n=i.indexOf(DOLLAR_PREFIX+RECEIVE_MSG_PREFIX);if(-1!==n){var t=i.slice(n+2);return getMessageParams(t)}return{}}function getMessageParams(e){var i,n=[],t=e.split("/"),a=t.length;if(-1===e.indexOf(RECEIVE_MSG_PREFIX)){if(a>=2&&a%2===0)for(i=0;a>i;i+=2)n[t[i]]=t.length<i+1?null:decodeURIComponent(t[i+1])}else{var o=e.split(RECEIVE_MSG_PREFIX);void 0!==o[1]&&(n=JSON&&JSON.parse(o[1]))}return n}function getDapi(e){var i=parseMessage(e);if(!i||i.name===GET_DAPI_URL_MSG_NAME){var n=i.data;getScript(n,onDapiReceived)}}function invokeDapiListeners(){for(var e in dapiEventsPool)dapiEventsPool.hasOwnProperty(e)&&dapi.addEventListener(e,dapiEventsPool[e])}function onDapiReceived(){dapi=window.dapi,window.removeEventListener("message",getDapi),invokeDapiListeners()}function init(){window.dapi.isDemoDapi&&(window.parent.postMessage(DOLLAR_PREFIX+SEND_MSG_PREFIX+JSON.stringify({state:"getDapiUrl"}),"*"),window.addEventListener("message",getDapi,!1))}var DOLLAR_PREFIX="$$",RECEIVE_MSG_PREFIX="DAPI_SERVICE:",SEND_MSG_PREFIX="DAPI_AD:",GET_DAPI_URL_MSG_NAME="connection.getDapiUrl",dapiEventsPool={},dapi=window.dapi||{isReady:function(){return!1},addEventListener:function(e,i){dapiEventsPool[e]=i},removeEventListener:function(e){delete dapiEventsPool[e]},isDemoDapi:!0};init();</script>'
    },
    
    google:{
        name:"google",
        beforeHead:'<meta name="ad.size" content="width=320,height=480">',
        hasLink:true
    },
    google_exitapi:{
        name:"google_exitapi",
        type:"google",
        beforeHead:'<meta name="ad.size" content="width=320,height=480"><script src="https://tpc.googlesyndication.com/pagead/gadgets/html5/api/exitapi.js" type="text/javascript"></script>',
        hasLink:true
    },
    
};

var params= process.argv[2];
var htmlFileName= process.argv[2];

var iosLink= process.argv[3];
var androidLink= process.argv[4];
var buildVersions= process.argv[5].split(",");


var saveName='./'+htmlFileName.slice(0,htmlFileName.lastIndexOf("_")+1);
var pathName='./'+htmlFileName.slice(0,htmlFileName.lastIndexOf("/")+1);

var brotli = require('brotli');

fs.readFile('./'+htmlFileName, "utf8", function(err, data) {
    
    data = data.replace('<script type="text/javascript" src="/build/main.js"></script>', '');
    
    //for(var platform of allPlatforms){
    for(let name of buildVersions){
        let platform = allPlatforms[name];
        
        let platformName = name;
        
        if(platform){
            platformName = platform.type || platformName;
        }
        
        let extras = '';
        if(name != "dashboard" && name != "test"){
            extras += `<script>var type= "${platformName}";</script>`;
        }
        
        if(platform){
            if(platform.beforeHead){
                extras += platform.beforeHead;
            }
        }
        
        extras += "</head>";
        
        let saveData = data.replace( "</head>", extras );
        
        if( name == "test" ){
            fs.readFile('./build/main.js', "utf8", function(err, mainJs) {

                //saveData = saveData.replace("</body>","<script>"+mainJs+"</script></body>");
                let bodyIndex = saveData.lastIndexOf("</body>");
                saveData = saveData.slice(0,bodyIndex) + "<script>"+mainJs+"</script>" + saveData.slice(bodyIndex);
                
                fs.writeFile(pathName + name + ".html", saveData, function (err) {
                    if (err) throw err;
                    console.log('Saved '+platformName);
                });
            });
            continue;
        }
        else if( name == "brotli"){
            let brotliPath = pathName+'/brotli/';
            if (!fs.existsSync(brotliPath)){
                fs.mkdirSync(brotliPath);
            }

            fs.readFile('./build/main.js', "utf8", function(err, mainJs) {
                let assetNo = 0;

                let removeFromCompressList = [
                    {
                        searchStart: '{"accessors"',
                        searchEnd: "}]}'",
                        name: "models",
                    }
                ];

                for(let i=0;i<removeFromCompressList.length;i++){
                    let rd = removeFromCompressList[i];
                    let list = [];
                    let assetNo = 0;
                    for(let j=0;j<20;j++){
                        let startIndex = mainJs.indexOf(rd.searchStart)-1;
                        let endIndex = mainJs.indexOf(rd.searchEnd, startIndex+10);
    
                        if(startIndex<0)break;
    
                        let asset = mainJs.slice(startIndex, endIndex+1);
                        list.push(asset);
    
                        mainJs = mainJs.slice(0,startIndex) + "om"+i+".asset"+assetNo+ mainJs.slice(endIndex+1);
                        assetNo++;
                    }

                    let objStr = "var om"+i+" = {";

                    for(let k=0; k<list.length; k++){
                        let asset = list[i];
                        objStr += "asset" + k +":"+asset +",";
                    }
                    objStr += "}";
                    if(list.length > 0){
                        fs.writeFile(brotliPath + rd + ".js", objStr, function (err) {
                            if (err) throw err;
                        });
                    }

                }

                ////get models
                let modelList = [];
                for(let i=0;i<20;i++){
                    let startIndex = mainJs.indexOf('{"accessors"')-1;
                    let endIndex = mainJs.indexOf("}]}'", startIndex+10);

                    if(startIndex<0)break;

                    let modelJson = mainJs.slice(startIndex, endIndex+1);
                    modelList.push(modelJson);

                    mainJs = mainJs.slice(0,startIndex) + "outsideModels.asset"+assetNo+ mainJs.slice(endIndex+1);
                    assetNo++;
                }

                let modelObjStr = "var outsideModels = {";
                for(let i=0; i<modelList.length; i++){
                    let modelJson = modelList[i];
                    modelObjStr += "asset" + i +":"+modelJson +",";
                }
                modelObjStr += "}";
                if(modelList.length > 0){
                    fs.writeFile(brotliPath + "models.js", modelObjStr, function (err) {
                        if (err) throw err;
                    });
                }
                
                ////get zip models
                assetNo = 0;
                let modelZipList = [];
                for(let i=0;i<20;i++){
                    let startIndex = mainJs.indexOf('"data:application/zip;base64,');
                    let endIndex = mainJs.indexOf('"', startIndex+10);

                    if(startIndex<0)break;

                    let modelZip = mainJs.slice(startIndex, endIndex+1);
                    modelZipList.push(modelZip);

                    mainJs = mainJs.slice(0,startIndex) + "outsideZipModels.asset"+assetNo+ mainJs.slice(endIndex+1);
                    assetNo++;
                }

                let modelZipObjStr = "var outsideZipModels = {";
                for(let i=0; i<modelZipList.length; i++){
                    let modelZip = modelZipList[i];
                    modelZipObjStr += "asset" + i +":"+modelZip +",";
                }
                modelZipObjStr += "}";
                
                fs.writeFile(brotliPath + "zipModels.js", modelZipObjStr, function (err) {
                    if (err) throw err;
                });

                ////get images
                assetNo = 0;
                let base64List = [];
                for(let i=0;i<20;i++){
                    let startIndex = mainJs.indexOf('"data:image/');
                    let endIndex = mainJs.indexOf('"', startIndex+10);

                    if(startIndex<0)break;

                    let base64 = mainJs.slice(startIndex, endIndex+1);
                    base64List.push(base64);

                    mainJs = mainJs.slice(0,startIndex) + "outsideImages.asset"+assetNo+ mainJs.slice(endIndex+1);
                    assetNo++;
                }

                let base64ObjStr = "var outsideImages = {";
                for(let i=0; i<base64List.length; i++){
                    let base64 = base64List[i];
                    base64ObjStr += "asset" + i +":"+base64 +",";
                }
                base64ObjStr += "}";

                fs.writeFile(brotliPath + "assets.js", base64ObjStr, function (err) {
                    if (err) throw err;
                });


                ////get other base 64's
                assetNo = 0;
                let otherBase64List = [];
                for(let i=0;i<20;i++){
                    let startIndex = mainJs.indexOf('"data:;base64,');
                    let endIndex = mainJs.indexOf('"', startIndex+10);

                    if(startIndex<0)break;

                    let base64 = mainJs.slice(startIndex, endIndex+1);
                    otherBase64List.push(base64);

                    mainJs = mainJs.slice(0,startIndex) + "otherAssets.asset"+assetNo+ mainJs.slice(endIndex+1);
                    assetNo++;
                }

                let otherBase64ObjStr = "var otherAssets = {";
                for(let i=0; i<otherBase64List.length; i++){
                    let base64 = otherBase64List[i];
                    otherBase64ObjStr += "asset" + i +":"+base64 +",";
                }
                otherBase64ObjStr += "}";

                
                fs.writeFile(brotliPath + "others.js", otherBase64ObjStr, function (err) {
                    if (err) throw err;
                });
                


                let extraScripts = "";
                if(base64List.length > 0)extraScripts += base64ObjStr +";";
                if(modelList.length > 0)extraScripts += modelObjStr +";";
                if(modelZipList.length > 0)extraScripts += modelZipObjStr +";";
                if(otherBase64List.length > 0)extraScripts += otherBase64ObjStr +";";
                extraScripts += "";

                fs.writeFile(brotliPath + "main.js", mainJs, function (err) {
                    if (err) throw err;
                    var brotliData = brotli.compress(fs.readFileSync(brotliPath + 'main.js'))

                    fs.writeFile(brotliPath+"main.br", brotliData, function (err) {
                        if (err) throw err;
                    });
                });

                fs.writeFile(brotliPath + "extras.js", extraScripts, function (err) {
                    if (err) throw err;
                });
                
                

                /*
                let bodyIndex = saveData.lastIndexOf("</body>");
                saveData = saveData.slice(0,bodyIndex) +
                            //extraScripts + 
                            //"<script>"+mainJs+"</script>" + 
                            saveData.slice(bodyIndex);
                */
                
                            
                if(base64List.length > 0){                    
                    fs.writeFile(brotliPath + name + ".html", saveData, function (err) {
                        if (err) throw err;
                        console.log('Saved '+platformName);
                    });
                }

            });
            continue;
        }
        
        fs.writeFile(pathName+name+".html", saveData, function (err) {
            if (err) throw err;
            console.log('Saved '+platformName);
        });
    }
    
});








