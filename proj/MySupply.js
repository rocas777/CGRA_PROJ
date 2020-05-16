/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
    constructor(scene) {
        super(scene);
	    this.scene=scene;
	    this.state=SupplyStates.INACTIVE;
        this.quad = new MyQuad(this.scene);
	this.randomAng = Math.random();

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
        this.materialTop.setDiffuse(1, 1, 1, 1);
        this.materialTop.setSpecular(1, 1, 1, 1);
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

    falling(){
	    //Front
        	this.scene.pushMatrix();
        	this.scene.translate(0, 0, 0.5);
        	this.materialTop.apply();
        	this.quad.display();
        	this.scene.popMatrix();

	    //Back
	    	this.scene.pushMatrix();
        	this.scene.translate(0, 0, -0.5);
        	this.scene.rotate(Math.PI,-1,0,0);
        	this.materialTop.apply();
        	this.quad.display();
        	this.scene.popMatrix();

	    //Right
	    	this.scene.pushMatrix();
        	this.scene.rotate(Math.PI/2,0,-1,0);
        	this.scene.translate(0, 0, 0.5);
        	this.materialTop.apply();
        	this.quad.display();
        	this.scene.popMatrix();

	    //Left
	    	this.scene.pushMatrix();
        	this.scene.rotate(Math.PI/2,0,1,0);
        	this.scene.translate(0, 0, 0.5);
        	this.materialTop.apply();
        	this.quad.display();
        	this.scene.popMatrix();

	    //Top
	    	this.scene.pushMatrix();
        	this.scene.rotate(Math.PI/2,-1,0,0);
        	this.scene.translate(0, 0, 0.5);
        	this.materialTop.apply();
        	this.quad.display();
        	this.scene.popMatrix();

	    //Bottom
		this.scene.pushMatrix();
        	this.scene.rotate(Math.PI/2,1,0,0);
        	this.scene.translate(0, 0, 0.5);
        	this.materialTop.apply();
        	this.quad.display();
        	this.scene.popMatrix();
    }

    broken(){
        	this.scene.pushMatrix();
        	this.scene.rotate(Math.PI*2*this.randomAng,0,1,0);
	    //Front
        	this.scene.pushMatrix();
        	this.scene.rotate(Math.PI/2,-1,0,0);
        	this.scene.translate(0, 0, -0.5);
        	this.materialTop.apply();
        	this.quad.display();
        	this.scene.popMatrix();

	    //Back
	    	this.scene.pushMatrix();
        	this.scene.translate(0, 0, 1.3);
        	this.scene.rotate(Math.PI/6,0,1,0);
        	this.scene.translate(0, 0, 1.7);
        	this.scene.rotate(Math.PI/2,-1,0,0);
        	this.scene.translate(0, 0, -0.5);
        	this.materialTop.apply();
        	this.quad.display();
        	this.scene.popMatrix();

	    //Right
	    	this.scene.pushMatrix();
        	this.scene.translate(0, 0, 1.3);
        	this.scene.rotate(Math.PI/5,0,1,0);
        	this.scene.rotate(Math.PI/2,-1,0,0);
        	this.scene.translate(0, 0, -0.5);
        	this.materialTop.apply();
        	this.quad.display();
        	this.scene.popMatrix();

	    //Left
	    	this.scene.pushMatrix();
        	this.scene.translate(1.2, 0, 0);
        	this.scene.rotate(Math.PI/2,-1,0,0);
        	this.scene.translate(0, 0, -0.5);
        	this.materialTop.apply();
        	this.quad.display();
        	this.scene.popMatrix();

	    //Top
	    	this.scene.pushMatrix();
        	this.scene.rotate(Math.PI*8/7,0,1,0);
        	this.scene.translate(1.2, 0, 0);
        	this.scene.rotate(Math.PI/2,-1,0,0);
        	this.scene.translate(0, 0, -0.5);
        	this.materialTop.apply();
        	this.quad.display();
        	this.scene.popMatrix();

	    //Bottom
		this.scene.pushMatrix();
        	this.scene.rotate(Math.PI/3,0,1,0);
        	this.scene.translate(2, 0, 0);
        	this.scene.rotate(Math.PI/2,-1,0,0);
        	this.scene.translate(0, 0, -0.5);
        	this.materialTop.apply();
        	this.quad.display();
        	this.scene.popMatrix();


        	this.scene.popMatrix();

	
    }

    display() {
	    if(this.state==SupplyStates.FALLING){
	        this.scene.pushMatrix();
	        this.scene.translate(this.xpos, this.ypos,this.zpos);
		this.falling();
		this.scene.popMatrix();
	    }
	    else if(this.state==SupplyStates.LANDED){
		this.scene.pushMatrix();
	        this.scene.translate(this.xpos, this.ypos,this.zpos);
		this.broken();
		this.scene.popMatrix();
	    }
    }


    drop(dropx,dropy,dropz){
	    this.xpos=dropx;
	    this.ypos=dropy;
	    this.zpos=dropz;
	    this.state=SupplyStates.FALLING;
    }

    update(){
	    if(this.state==SupplyStates.FALLING){
        	this.ypos -= 0.17;
		    this.land();
	    }
    }

    land(){
	    if(this.ypos<=0.5)
		    this.state=SupplyStates.LANDED;
    }
	 
}

const SupplyStates = {
	INACTIVE: 0,
	FALLING: 1,
	LANDED: 2
};
