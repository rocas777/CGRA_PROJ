/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, deltaY, initSpeed, xPos, yPos, zPos){
        super(scene);
        this.body = new MySphere(scene, 200, 7);
	this.leme = new MyTriangle(scene);
        this.deltaY = deltaY;
        this.initSpeed = initSpeed;
        this.speed = initSpeed;
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
        this.initBuffers();
	this.val=0;
	    this.speedFactor = 1;
    }

    update(){
        this.xPos += (this.speed) * Math.sin(this.deltaY) * this.speedFactor;
        this.zPos += (this.speed) * Math.cos(this.deltaY) * this.speedFactor;
    }

    accelerate(val){
        this.speed = this.speed + val;
    }

    turn(val){
	this.val=val;
        this.deltaY = this.deltaY + val;
    }

    reset(){
        this.deltaY = 0;
        this.initSpeed = 0;
        this.speed = 0;
        this.xPos = 0;
        this.yPos = 0;
        this.zPos = 0;
    }
    displayLemes(){	
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -2);
	this.scene.scale(0.5,0.5,0.5);

	//baixo
	this.scene.pushMatrix();

        this.scene.translate(0, -1.3, 0);
	if(this.val==-Math.PI*5/180)
		this.scene.rotate(-Math.PI/8,0,-1,0);
	if(this.val==Math.PI*5/180)
		this.scene.rotate(-Math.PI/8,0,1,0);
	this.scene.rotate(Math.PI/2,0,0,-1);
	this.scene.rotate(Math.PI/2,1,0,0);
	this.leme.display();
        this.scene.popMatrix();

	//cima
	this.scene.pushMatrix();

        this.scene.translate(0, 1.3, 0);
	if(this.val==-Math.PI*5/180)
		this.scene.rotate(-Math.PI/8,0,-1,0);
	if(this.val==Math.PI*5/180)
		this.scene.rotate(-Math.PI/8,0,1,0);
	this.scene.rotate(Math.PI/2,0,0,1);
	this.scene.rotate(Math.PI/2,1,0,0);
	this.leme.display();
        this.scene.popMatrix();
	
	
        this.scene.pushMatrix();
	
        
	//esquerda
        this.scene.pushMatrix();
	this.scene.rotate(Math.PI,0,0,1);
        this.scene.translate(1.5, 0, 0.5);
	this.scene.rotate(Math.PI/2,1,0,0);
	this.leme.display();
        this.scene.popMatrix();

	//direita
        this.scene.pushMatrix();
        this.scene.translate(1.5, 0, 0.5);
	this.scene.rotate(Math.PI/2,1,0,0);
	this.leme.display();
        this.scene.popMatrix();
	
        this.scene.popMatrix();

        this.scene.popMatrix();
    }


    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, 10, this.zPos);        				
	this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
        this.scene.rotate(this.deltaY, 0, 1, 0);
        this.scene.pushMatrix();
	this.displayLemes();
        this.scene.popMatrix();	


	this.scene.scale(1,1,2);
        this.body.display();
        this.scene.popMatrix();	
    }

}


