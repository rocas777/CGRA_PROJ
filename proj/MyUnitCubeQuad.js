/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);

        this.initCubeMaterials();
    }

    initCubeMaterials(){
        this.materialBottom = new CGFappearance(this.scene);
        this.materialBottom.setAmbient(1, 1, 1, 1);
        this.materialBottom.setDiffuse(0, 0, 0, 1);
        this.materialBottom.setSpecular(0, 0, 0, 1);
        this.materialBottom.setShininess(10.0);
        this.materialBottom.loadTexture('images/split_cubemap/bottom.png');
        this.materialBottom.setTextureWrap('REPEAT', 'REPEAT');

        this.materialTop = new CGFappearance(this.scene);
        this.materialTop.setAmbient(1, 1, 1, 1);
        this.materialTop.setDiffuse(0, 0, 0, 1);
        this.materialTop.setSpecular(0, 0, 0, 1);
        this.materialTop.setShininess(10.0);
        this.materialTop.loadTexture('images/split_cubemap/top.png');
        this.materialTop.setTextureWrap('REPEAT', 'REPEAT');

        this.materialBack = new CGFappearance(this.scene);
        this.materialBack.setAmbient(1, 1, 1, 1);
        this.materialBack.setDiffuse(0, 0, 0, 1);
        this.materialBack.setSpecular(0, 0, 0, 1);
        this.materialBack.setShininess(10.0);
        this.materialBack.loadTexture('images/split_cubemap/back.png');
        this.materialBack.setTextureWrap('REPEAT', 'REPEAT');

	this.materialRight = new CGFappearance(this.scene);
        this.materialRight.setAmbient(1, 1, 1, 1);
        this.materialRight.setDiffuse(0, 0, 0, 1);
        this.materialRight.setSpecular(0, 0, 0, 1);
        this.materialRight.setShininess(10.0);
        this.materialRight.loadTexture('images/split_cubemap/right.png');
        this.materialRight.setTextureWrap('REPEAT', 'REPEAT');

	this.materialLeft = new CGFappearance(this.scene);
        this.materialLeft.setAmbient(1, 1, 1, 1);
        this.materialLeft.setDiffuse(0, 0, 0, 1);
        this.materialLeft.setSpecular(0, 0, 0, 1);
        this.materialLeft.setShininess(10.0);
        this.materialLeft.loadTexture('images/split_cubemap/left.png');
        this.materialLeft.setTextureWrap('REPEAT', 'REPEAT');

	this.materialFront = new CGFappearance(this.scene);
        this.materialFront.setAmbient(1, 1, 1, 1);
        this.materialFront.setDiffuse(0, 0, 0, 1);
        this.materialFront.setSpecular(0, 0, 0, 1);
        this.materialFront.setShininess(10.0);
        this.materialFront.loadTexture('images/split_cubemap/front.png');
        this.materialFront.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {

        //bottom
        this.scene.pushMatrix();
        //this.scene.setLightBlue();
        this.scene.scale(50,50,50);
        this.scene.rotate(-90*Math.PI/180,1,0,0);
        this.scene.translate(0, 0, -0.5);
        this.materialBottom.apply();
        this.quad.display();
        this.scene.popMatrix();

        //top
        this.scene.pushMatrix();
        //this.scene.setLightBlue();
        this.scene.scale(50,50,50);
        this.scene.rotate(90*Math.PI/180,1,0,0);
        this.scene.translate(0, 0, -0.5);
        this.materialTop.apply();
        this.quad.display();
        this.scene.popMatrix();



        //Lower Z
        this.scene.pushMatrix();
        //this.scene.setLightBlue();
        this.scene.scale(50,50,50);
        this.scene.translate(0, 0, -0.5)
        this.materialFront.apply();
        this.quad.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        //this.scene.setLightBlue();
        this.scene.scale(50,50,50);
        this.scene.translate(0, 0, 0.5)
        this.scene.rotate(180*Math.PI/180,0,1,0);
        this.materialBack.apply();
        this.quad.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        //this.scene.setLightBlue();
        this.scene.scale(50,50,50);
        this.scene.translate(-0.5, 0, 0)
        this.scene.rotate(90*Math.PI/180,0,1,0);
        this.materialLeft.apply();
        this.quad.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        //this.scene.setLightBlue();
        this.scene.scale(50,50,50);
        this.scene.translate(0.5, 0, 0)
        this.scene.rotate(-90*Math.PI/180,0,1,0);
        this.materialRight.apply();
        this.quad.display();
        this.scene.popMatrix();
    }
}
