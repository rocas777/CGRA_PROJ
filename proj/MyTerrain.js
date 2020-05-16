class MyTerrain extends CGFobject{

    constructor(scene) {
        super(scene);
        this.terrain = new MyPlane(scene, 20);
    }

    initShaders(){
        this.shader = new CGFshader(this.scene.gl, "/images/shaders/terrain.vert", "images/shaders/terrain.frag");
        this.shader.setUniformsValues({uSampler2: 1});
    }
}
