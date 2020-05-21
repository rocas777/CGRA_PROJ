/**
* MyScene
* @constructor
*/

class MyScene extends CGFscene {

    constructor() {
        super();
    }

    init(application) {
        super.init(application);
		this.timeSum=20;
		this.nOfUpdates=1;
        this.initCameras();
        this.initLights();
		this.d = new Date();
		this.lastTime = this.d.getTime();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(20);
        
        this.enableTextures(true);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.incompleteSphere = new MySphere(this, 300, 10);
        this.cylinder = new MyCylinder(this,50);
        this.vehicle = new MyVehicle(this, 0, 0, 0, 0, 0);
		this.unitquad = new MyUnitCubeQuad(this);
		this.terrain = new MyTerrain(this);
		this.billboard = new MyBillboard(this);
    	
        this.sphereTexture = new CGFappearance(this);
        this.sphereTexture.setAmbient(1, 1, 1, 1);
        this.sphereTexture.setShininess(10.0);
        this.sphereTexture.loadTexture('images/earth.jpg');
        this.sphereTexture.setTextureWrap('REPEAT', 'REPEAT');

		this.cokeTexture = new CGFappearance(this);
        this.cokeTexture.setAmbient(1, 1, 1, 1);
        this.cokeTexture.setShininess(10.0);
        this.cokeTexture.loadTexture('images/cocacola.png');
        this.cokeTexture.setTextureWrap('REPEAT', 'REPEAT');


        //Objects connected to MyInterface
        this.displayAxis = false;
        this.displaySphere = false;
        this.displayCylinder = false;
		this.scaleFactor=1;
		this.speedFactor=1;
		this.scaleScene = 1;
        this.selectedTexture = 0;  
		this.time=0;
		this.autopilot=false;

	    this.supplies_counter=-1;
	    this.supplies = [];
	    this.l_is_pressed=false;
	    this.suppliesDropped = 0;

	    this.textureIds = { 'earth': 0,'sky':1};
	
        this.texture1 = [new CGFtexture(this, 'images/split_cubemap/left.png'),
			new CGFtexture(this, 'images/split_cubemap/right.png'),
			new CGFtexture(this, 'images/split_cubemap/front.png'),
			new CGFtexture(this, 'images/split_cubemap/back.png'),
			new CGFtexture(this, 'images/split_cubemap/top.png'),
			new CGFtexture(this, 'images/split_cubemap/bottom.png')];

	    this.texture2 = [new CGFtexture(this, 'images/split_cubemap/leftSky.png'),
			new CGFtexture(this, 'images/split_cubemap/rightSky.png'),
			new CGFtexture(this, 'images/split_cubemap/frontSky.png'),
			new CGFtexture(this, 'images/split_cubemap/backSky.png'),
			new CGFtexture(this, 'images/split_cubemap/topSky.png'),
			new CGFtexture(this, 'images/split_cubemap/bottomSky.png')];

	    this.textures = [this.texture1,this.texture2];

	    for(let i=0;i<5;i++){
		this.supplies[i] = new MySupply(this);
	    }
	    this.vehicle.reset();
    }

    initLights() {
        this.lights[0].setPosition(0, 0, 0, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();

    }

    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }

    updateAppliedTexture() {
        this.unitquad.materialLeft.setTexture(this.textures[this.selectedTexture][0]);
        this.unitquad.materialRight.setTexture(this.textures[this.selectedTexture][1]);
        this.unitquad.materialFront.setTexture(this.textures[this.selectedTexture][2]);
        this.unitquad.materialBack.setTexture(this.textures[this.selectedTexture][3]);
        this.unitquad.materialTop.setTexture(this.textures[this.selectedTexture][4]);
        this.unitquad.materialBottom.setTexture(this.textures[this.selectedTexture][5]);
    }

    speedUpdate(){
	    this.vehicle.speedFactor = this.speedFactor;
    }    

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
	    this.updateAppliedTexture();
    }
    
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys();
		for(let i=0;i<=this.supplies_counter;i++){
	    this.supplies[i].update();
		}
		this.d = new Date();
		this.timeSum+=this.d.getTime()-this.lastTime;
		this.nOfUpdates+=1;
	
		if(this.autopilot){
			console.log((this.timeSum/this.nOfUpdates),this.d.getTime()-this.lastTime);
			if(this.d.getTime()-this.lastTime<(this.timeSum/this.nOfUpdates)*2){
				this.vehicle.setSpeed(this.d.getTime()-this.lastTime);
				this.vehicle.turn((this.d.getTime()-this.lastTime)*Math.PI/2500);
			}
			else{
				this.vehicle.setSpeed(0);
		}
		
			this.time += this.d.getTime()-this.lastTime;
			if((this.time-5000)*(this.time-5000)<=400){
				console.log(this.time,this.vehicle.xPos,this.vehicle.zPos);
				this.time=0;
				this.summer=0;
			}
		}
		this.lastTime = this.d;
        this.vehicle.update();
        this.billboard.update();
    }

    checkKeys() {

        var text="Keys pressed: ";
        var keysPressed=false;

        // Check for key codes e.g. in https://keycode.info/
		if(!this.autopilot){
        	if (this.gui.isKeyPressed("KeyW")) {
        	    this.vehicle.accelerate(0.01);
        	    text+=" W ";
        	    keysPressed=true;
        	}
	
        	if (this.gui.isKeyPressed("KeyS")) {
        	    this.vehicle.accelerate(-0.01);
        	    text+=" S ";
        	    keysPressed=true;
        	}
	
        	if(this.gui.isKeyPressed("KeyA")){
        	    this.vehicle.turn(Math.PI*5/180);
        	    text += " A ";
        	    keysPressed = true;
        	}
	
        	if(this.gui.isKeyPressed("KeyD")){
        	    this.vehicle.turn(-Math.PI*5/180);
        	    text += " D ";
        	    keysPressed = true;
        	}

			if(this.gui.isKeyPressed("KeyP")){
				this.d = new Date();
				this.lastTime = this.d;
				this.autopilot=true;
        	    keysPressed = true;
        	}
		}

        if(this.gui.isKeyPressed("KeyR")){
            this.vehicle.reset();
            this.billboard.reset();
	        this.supplies_counter=-1;
	        this.suppliesDropped = 0;
            text += " R ";
            keysPressed = true;
	    	this.autopilot=false;
        }

		if(this.gui.isKeyPressed("KeyL")){
			this.suppliesDropped += 1;
	    	if(this.l_is_pressed==false){
	  			this.l_is_pressed=true;
				if(this.supplies_counter<4){
					this.supplies_counter+=1;
					this.supplies[this.supplies_counter].drop(this.vehicle.xPos,10,this.vehicle.zPos);
					console.log(this.supplies_counter);
				}
           		text += " L ";
	    	}
            keysPressed = true;
        }

		if(!keysPressed){
        	this.vehicle.turn(0);
			this.l_is_pressed=false;
		}
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
       

		this.pushMatrix();
	    this.scale(this.scaleScene,this.scaleScene,this.scaleScene);
        // Draw axis
        if (this.displayAxis){
            this.axis.display();
	    }

        this.setDefaultAppearance();
	    this.pushMatrix();
        this.scale(50,50,50);
        this.unitquad.display();
	    this.popMatrix();

	    this.setDefaultAppearance();
		this.pushMatrix();
		this.translate(0,-0.1,0);
		this.terrain.display();
		this.popMatrix();


        // ---- BEGIN Primitive drawing section

        //This sphere does have defined texture coordinates
	    this.pushMatrix();

	    this.scale(0.5,0.5,0.5);

		this.pushMatrix();
		this.billboard.display();
		this.popMatrix();

	    this.pushMatrix();
        if(this.displayCylinder){
		this.cokeTexture.apply();
            	this.cylinder.display();
		}
	    this.popMatrix();

		this.pushMatrix();
        this.vehicle.display();
		this.popMatrix();

        if(this.displaySphere){
            this.pushMatrix();
            this.sphereTexture.apply();
            this.incompleteSphere.display();
            this.popMatrix();
	    }

	    this.pushMatrix();
	    for(let i=0;i<=this.supplies_counter;i++){
		    this.supplies[i].display();
	    }
	    this.popMatrix();
	
		this.popMatrix();

        // ---- END Primitive drawing section
    }
}
