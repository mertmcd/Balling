class Helper{
    constructor(){}

    static addTrail(scene, target, trailHeadGeometry, trailColor = "#000000", startAlpha = 1, endAlpha = 0, trailLength = 60) {
        // create the trail renderer object
        var trail = new THREE.TrailRenderer( scene, true );
        // create material for the trail renderer
        var trailMaterial = THREE.TrailRenderer.createBaseMaterial();

        let c = new THREE.Color( trailColor );
        trailMaterial.uniforms.headColor.value.set( c.r, c.g, c.b, startAlpha );
        trailMaterial.uniforms.tailColor.value.set( c.r, c.g, c.b, endAlpha );

        // initialize the trail
        trail.initialize( trailMaterial, trailLength, false, 0, trailHeadGeometry, target );
        trail.activate();

        return trail;
    }
}


export default Helper;