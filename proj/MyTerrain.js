/*
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTerrain extends CGFobject {

    constructor(scene) {
        super(scene);

        //Initialize MyPlane objects
        this.ground = new MyPlane(this.scene,20);
        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.5, 0.5, 0.5, 1);
        this.appearance.setDiffuse(0.5, 0.5, 0.5, 1);
        this.appearance.setSpecular(0.5, 0.5, 0.5, 1);
        this.appearance.setShininess(10);

        //Initialize Textures
        //this.textureTerrain = new CGFtexture(this.scene, "images/terrain.jpg");
        this.appearance.loadTexture("images/terrain.jpg");
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.textureMapTerrain = new CGFtexture(this.scene, 'images/terrainmap.jpg');

        //Initialize shaders
        this.terrainShader = new CGFshader(this.scene.gl, "images/shaders/terrain.vert", "images/shaders/terrain.frag");

        // additional texture will have to be bound to texture unit 1
        this.terrainShader.setUniformsValues({ uSampler2 : 1});

    }

    display() {
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.REPEAT);
        //this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.REPEAT);

        // ---- BEGIN Primitive drawing section
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.terrainShader);
        this.appearance.apply();
        this.textureMapTerrain.bind(1);
        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.scale(50, 50, 1);
        this.ground.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}