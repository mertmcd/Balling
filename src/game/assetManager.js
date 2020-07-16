var assetManager={};


import JSZip from 'jszip';

var thingsToLoad=[
    {type:"texture", src:require('../../assets/textures/sea.jpg'), name:"sea"},
];

///Comment this if you don't use brotli
var unbrotli = require('../brotli/unbrotli');

assetManager.loadAssets=function(main, callback){
    
    let data = app.data;
    //zipManager = new THREE.LoadingManager();


    var modelsToLoad=[

        
        //{name:"well", gltf: require('../../assets/models/well.zip')},
        //{name:"tree", gltf: require('../../assets/models/tree/scene.gltf')},
        
        
        {
            name: "wellBrotli", 
            type: "brotli", 
            gltf:{
                gltf: require('../../assets/brotli_models/well/scene.gltf.br'),
                bin: require('../../assets/brotli_models/well/scene.bin.br'),
                textures: {
                    "textures/phong7_baseColor.jpeg": require('../../assets/brotli_models/well/textures/phong7_baseColor.jpeg'),
                }
            }
        }
        
    ];


    
    let totalModel = modelsToLoad.length;
    let modelLoaded=0;
    let list = {};
    

    main.loader.loadBulk(thingsToLoad);
    
    var loader = new THREE.GLTFLoader()
    
    
    if(modelsToLoad.length==0){
        assetsLoaded(list,callback);
        return;
    }

    function zipModelLoaded(name, gltf){
        list[name]=gltf;
            
        modelLoaded++;
        if(modelLoaded>=totalModel){
            assetsLoaded(list,callback);
        }
    }

    
    for(let md of modelsToLoad){
        ///check if it is a brotli file
        if(md.type == "brotli"){
            loadBrotliModel(md, zipModelLoaded, loader);
            continue;
        }

        ///check if it is a zip file
        if(md.gltf.indexOf("data:application/zip;base64") == 0){
            loadZipModel(md, zipModelLoaded, loader);
            continue;
        }
        
        md.gltf = JSON.stringify(JSON.parse(md.gltf));
        loader.parse(md.gltf, '', (gltf) => {
            list[md.name]=gltf;
            
            modelLoaded++;
            if(modelLoaded>=totalModel){
                assetsLoaded(list,callback);
            }
        });
        
    }

    
}

/////////////ZIP LOADER
function base64toBlob(base64Data, contentType) {
    contentType = contentType || '';
    var sliceSize = 1024;
    var byteCharacters = atob(base64Data);
    var bytesLength = byteCharacters.length;
    var slicesCount = Math.ceil(bytesLength / sliceSize);
    var byteArrays = new Array(slicesCount);

    for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
        var begin = sliceIndex * sliceSize;
        var end = Math.min(begin + sliceSize, bytesLength);

        var bytes = new Array(end - begin);
        for (var offset = begin, i = 0; offset < end; ++i, ++offset) {
            bytes[i] = byteCharacters[offset].charCodeAt(0);
        }
        byteArrays[sliceIndex] = new Uint8Array(bytes);
    }
    return new Blob(byteArrays, { type: contentType });
}

function loadZipModel(md, callback, loader){

    let zipFile = md.gltf;
    let [match, contentType, base64] = zipFile.match(/^data:(.+);base64,(.*)$/);

    let blob = base64toBlob(base64, contentType);

    new Promise( function ( resolve, reject ) {
        resolve(JSZip.loadAsync( blob ));        
    })
    .then( function ( zip ) {

        var fileMap = {};
        var pendings = [];

        for ( var file in zip.files ) {

            var entry = zip.file( file );
            if ( entry === null ) continue;
            pendings.push( entry.async( 'blob' ).then( function ( file, blob ) {
                fileMap[ file ] = URL.createObjectURL( blob );
            }.bind( this, file ) ) );
        }

        return Promise.all( pendings ).then( function () {
            return fileMap;
        });

    })
    .then( function ( fileMap ) {

        let numOfAssets = Object.keys(fileMap).length;
        let assetsLoaded = 0;

        let gltf, images = {}, bin;
        function itemLoaded(item, data){
            let name = data.name;
            let type = data.type;
            let fileType = name.slice(name.lastIndexOf(".")+1);

            //name = name.slice(name.indexOf("/")+1);
            if(type == "image"){
                name = name.slice(name.lastIndexOf("textures/"));
            }
            else{
                name = name.slice(name.lastIndexOf("/")+1);
            }

            if(type == "gltf"){
                gltf = item;
            }
            else if(type == "image"){
                item = item.replace("data:text/plain;base64", "data:image/"+fileType+";base64");
                images[name] = item;
            }
            else if(type == "bin"){
                item = item.replace("data:text/plain;base64", "data:application/octet-stream;base64");
                bin = {name, item};
            }

            assetsLoaded++;
            
            if(assetsLoaded >= numOfAssets){
                
                if(gltf.buffers){
                    gltf.buffers[0].uri = bin.item;
                }
                if(gltf.images){
                    for(let i=0;i<gltf.images.length;i++){                    
                        gltf.images[i].uri = images[gltf.images[i].uri];
                    }
                }                

                gltf = JSON.stringify(gltf);                
                
                loader.parse(gltf, '', (gltf) => {
                    callback(md.name, gltf);
                });
            }

        }

        for(let prop in fileMap){
            let file = fileMap[prop];
            
            if(prop.indexOf(".gltf") >= 0){
                fetch(file)
                .then( response => response.json())
                .then( json => itemLoaded(json, {name: prop, type:"gltf"}))
            }
            else if(prop.indexOf(".bin") >= 0){
                fetch(file)
                .then( response => response.blob())
                .then( blob =>{
                    var reader = new FileReader() ;
                    reader.onload = function(){ itemLoaded(this.result, {name: prop, type:"bin"}) } ; // <--- `this.result` contains a base64 data URI
                    reader.readAsDataURL(blob) ;
                })
            }
            else {
                fetch(file)
                .then( response => response.blob())
                .then( blob =>{
                    var reader = new FileReader() ;
                    reader.onload = function(){ itemLoaded(this.result, {name: prop, type:"image"}) } ; // <--- `this.result` contains a base64 data URI
                    reader.readAsDataURL(blob) ;
                })
            }
            
        }
        

    }).catch(  );


}

function loadZipModelNotFb(md, callback){
    let zipFile = md.gltf;
    let [match, contentType, base64] = zipFile.match(/^data:(.+);base64,(.*)$/);

    let blob = base64toBlob(base64, contentType);

    let url = URL.createObjectURL( blob );

    

    var zipManager = new THREE.LoadingManager();

    new Promise( function( resolve, reject ) {

		
        new THREE.ZipLoader().load( url ).then( function( zip ) {

            zipManager.setURLModifier( zip.urlResolver );
            resolve( zip.find( /\.(gltf|glb)$/i )[ 0 ] );

        } );


	} ).then( function ( file ) {

		new THREE.GLTFLoader( zipManager ).load( file, function ( gltf ) {
            callback(md.name, gltf);
            
            //app.main.scene.add( gltf.scene );            

		} );

	} );

}

////BROTLI LOADER

function decompress(e,n){
    return unbrotli(_base64ToArrayBuffer(e));
}

function _base64ToArrayBuffer(e){
    var decoded = window.atob(e);
    var len = decoded.length;
    var arr = new Uint8Array(len);

    for(let i=0; i<len; i++){
        arr[i]=decoded.charCodeAt(i);
    }
    
    return arr;
}

function decompressString(str){
    return new Promise(function(resolve, reject){
        resolve(new TextDecoder("utf-8").decode(decompress(str)));
    })
}

function decompressArrayBuffer(arr){
    return new Promise(function(resolve,reject){
        resolve(decompress(arr).buffer)
    })
}

function _arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

function loadBrotliModel(md, callback, loader){
    
    let gltfBr = md.gltf.gltf;
    let binBr = md.gltf.bin;
    let textures = md.gltf.textures;
    
    gltfBr = gltfBr.slice(13);
    binBr = binBr.slice(13);

    var gltf;
    var bin;

    decompressString(gltfBr).then(function(_gltf){
        gltf = _gltf;
        modelCompressed();
    });

    decompressArrayBuffer( binBr).then( function( blob ) { 
        bin = "data:application/octet-stream;base64," + _arrayBufferToBase64(blob); 
        modelCompressed();
    });

    function modelCompressed(){
        if(!bin || !gltf)return;

        gltf = gltf.replace("scene.bin", bin);

        for(let tex in textures){
            gltf = gltf.replace(tex, textures[tex]);
        }

        loader.parse(gltf, '', (gltf) => {
            callback(md.name, gltf);
        });
        
    }
    
    

}



function assetsLoaded(list,callback){
    

    callback(list);
    
}



export default assetManager;





