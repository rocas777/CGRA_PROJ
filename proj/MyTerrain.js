/*
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */

class MyTerrain extends CGFobject {

    constructor(scene) {
        super(scene);

        //Initialize MyPlane objects
        this.ground = new MyPlane(scene,32);
        this.appearance = new CGFappearance(scene);
        this.appearance.setAmbient(1, 1, 1, 1);
        this.appearance.setDiffuse(1, 1, 1, 1);
        this.appearance.setSpecular(1, 1, 1, 1);
        this.appearance.setShininess(120);

        //Initialize Textures
        this.textureTerrain = new CGFtexture(scene, "images/split_cubemap/terrain.jpg");
        this.appearance.setTexture(this.textureTerrain);
        this.appearance.setTextureWrap('REPEAT', 'REPEAT');
        this.textureMapTerrain = new CGFtexture(scene, 'images/split_cubemap/terrainmap.png');
        this.textureColorTerrain = new CGFtexture(scene,'images/split_cubemap/altimetry.png')

        //Initialize shaders
        this.terrainShader = new CGFshader(scene.gl, "images/shaders/terrain.vert", "images/shaders/terrain.frag");

        // additional texture will have to be bound to texture unit 1
        this.terrainShader.setUniformsValues({ uSampler2: 1,uSampler3 : 2 });

        // shader code panels references
        this.shadersDiv = document.getElementById("shaders");
        this.vShaderDiv = document.getElementById("vshader");
        this.fShaderDiv = document.getElementById("fshader");
    }

    display() {
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_S, this.scene.gl.REPEAT);
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_WRAP_T, this.scene.gl.REPEAT);

        // ---- BEGIN Primitive drawing section
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.terrainShader);
        this.appearance.setTexture(this.textureTerrain);
        this.appearance.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        this.appearance.apply();
        this.textureMapTerrain.bind(1);
        this.textureColorTerrain.bind(2);
        this.scene.rotate(-0.5*Math.PI, 1, 0, 0);
        this.scene.scale(60, 60, 1);
        this.ground.display();
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.popMatrix();
    }
}