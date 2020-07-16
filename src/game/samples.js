
////EMITTER SAMPLE
function addEmitter(){
    
    let particle = new THREE.Mesh(
        new THREE.BoxBufferGeometry(10,10),
        new THREE.MeshLambertMaterial({color:0xffffff})
    );

    
    let pos = new THREE.Vector3(0,60,0);

    ///if there is opacity or more than 1 color, materials get cloned on every new particle

    confettiMaker.addEmitter(
        {
            model: particle,
            //objectNames: ["obj1", "obj2"],
            position: {
                x: {min: pos.x - 50, max: pos.x+50},
                y: pos.y,
                z: pos.z
            },
            initials:{
                speed:{
                    x: .1,
                    y: {min:0, max:0.1},
                    z: {min:-0.1, max:0.1},
                },
                opacity: 1,
                scale: 0.5
            },

            props:{
                gravity:{
                    x:0, y:-0.005, z:0
                },
                scale: -0.003,
                opacity: -0.003 
            },

            lifeTime: 500,
            frequency: 1,
            quantity:1,
            name:"emitter0",
            isActive: true,
            colorList: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],

            update: function(p){
                p.rotation.x += 0.1;
                p.rotation.y += 0.1;
                p.rotation.z += 0.1;

                ///remove a particle any time with p.remove();
                /*if(p.position.y < 20){
                    p.remove();
                }*/
            },
            onEmit: function(p){
                /*if(p.isNewParticle){

                    p.traverse(child => {
                        if(child instanceof THREE.Mesh){
                            child.material = child.material.clone();
                            p.material = child.material;
                        }
                    });

                }
                */
                
            }
            
        }
    );
}

///TRAIL SAMPLE
var box = main.objectMaker.addBox({
    x:0,y:10,z:0,wx:5,wy:5,wz:5, color:0x990000
});
let headGeom = [
    new THREE.Vector3(-3,0,0),
    new THREE.Vector3(3,0,0),
];
box.trail = Helper.addTrail(main.scene, box, headGeom,"#990000", 1, 0, 120);