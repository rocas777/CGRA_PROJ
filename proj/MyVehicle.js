/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, deltaY, initSpeed, xPos, yPos, zPos){
        super(scene);
        this.autopilot = false;
        this.body = new MySphere(scene, 300, 15);
	    this.leme = new MyTriangle(scene);
	    this.cabineC = new MyCylinder(scene,50);
	    this.cabineS1 = new MySphere(scene, 16, 8);
	    this.cabineS2 = new MySphere(scene, 16, 8);
	    this.motorH1 = new MySphere(scene, 16, 8);
	    this.motorH2 = new MySphere(scene, 16, 8);
	    this.ventoinha1 = new MySquare(scene);
	    this.ventoinha2 = new MySquare(scene);
	    this.bandeira = new MyPlane(scene,20);
        this.deltaY = deltaY;
        this.initSpeed = initSpeed;
        this.speed = initSpeed;
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
        this.initBuffers();
	    this.val=0;
	    this.speedFactor = 1;
	    this.canCountTime = false;
	    this.time=0;
	    this.ang=0;
	    this.randAng1 = Math.random();
	    this.randAng2 = Math.random();

	    this.bandeiraTexture = new CGFappearance(scene);
        this.bandeiraTexture.setAmbient(1, 1, 1, 1);
        this.bandeiraTexture.setShininess(10.0);
        this.bandeiraTexture.loadTexture('images/bandeira.jpeg');
        this.bandeiraTexture.setTextureWrap('REPEAT', 'REPEAT');
        this.flagShader = new CGFshader(this.scene.gl,'images/shaders/flag.vert','images/shaders/flag.frag');

	    this.zepTexture = new CGFappearance(scene);
        this.zepTexture.setAmbient(1, 1, 1, 1);
        this.zepTexture.setShininess(10.0);
        this.zepTexture.loadTexture('images/zep.png');
        this.zepTexture.setTextureWrap('REPEAT', 'REPEAT');

	    this.lemeTexture = new CGFappearance(scene);
        this.lemeTexture.setDiffuse(1, 0, 0, 1);
        this.lemeTexture.setSpecular(1, 0, 0, 1);
        this.lemeTexture.setShininess(10);
        this.lemeTexture.setTextureWrap('REPEAT', 'REPEAT');
    }

    setSpeed(val){
	    this.speed = 10*Math.PI/5000*val;
    }

    update(){
        this.ang += this.speed*3;
        if(!this.autopilot){
            this.xPos += (this.speed) * Math.sin(this.deltaY) * this.speedFactor;
            this.zPos += (this.speed) * Math.cos(this.deltaY) * this.speedFactor;
        }
        else{
            this.xPos += (this.speed) * Math.sin(this.deltaY);
            this.zPos += (this.speed) * Math.cos(this.deltaY);            
        }
    }

    accelerate(val){
        this.speed = this.speed + val;
    }


    turn(val){
	    this.val=val;
	    this.deltaY += val;
    }

    reset(){
        this.deltaY = 0;
        this.initSpeed = 0;
        this.speed = 0;
        this.xPos = 0;
        this.yPos = 0;
        this.zPos = 0;
	    this.time=0;
	    this.canCountTime = false;
    }

    displayLemes(){	
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -2);
	    this.scene.scale(0.5,0.5,0.5);

	    //Baixo
	    this.scene.pushMatrix();

        this.scene.translate(0, -1.3, 0);
	    if(this.val<0)
		    this.scene.rotate(Math.PI/8,0,1,0);
	    if(this.val>0)
		    this.scene.rotate(Math.PI/8,0,-1,0);
	    this.scene.rotate(Math.PI/2,0,0,-1);
	    this.scene.rotate(Math.PI/2,1,0,0);
	    this.leme.display();
        this.scene.popMatrix();

	    //Cima
	    this.scene.pushMatrix();

        this.scene.translate(0, 1.3, 0);
	    if(this.val<0)
		    this.scene.rotate(Math.PI/8,0,1,0);
	    if(this.val>0)
		    this.scene.rotate(Math.PI/8,0,-1,0);
	    this.scene.rotate(Math.PI/2,0,0,1);
	    this.scene.rotate(Math.PI/2,1,0,0);
	    this.leme.display();
	    this.scene.popMatrix();
	
	
        this.scene.pushMatrix();
	
        
	    //Esquerda
        this.scene.pushMatrix();
	    this.scene.rotate(Math.PI,0,0,1);
        this.scene.translate(1.5, 0, 0.5);
	    this.scene.rotate(Math.PI/2,1,0,0);
	    this.leme.display();
        this.scene.popMatrix();

	    //Direita
        this.scene.pushMatrix();
        this.scene.translate(1.5, 0, 0.5);
	    this.scene.rotate(Math.PI/2,1,0,0);
	    this.leme.display();
        this.scene.popMatrix();
	
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    cabine(){
        this.scene.pushMatrix();
	    this.scene.scale(1,2,1);
	    this.cabineC.display();
        this.scene.popMatrix();
	    this.cabineS1.display();
        this.scene.pushMatrix();
        this.scene.translate(0,4,0);
	    this.cabineS2.display();
        this.scene.popMatrix();		

	    this.scene.pushMatrix();
        this.scene.translate(-0.5,0,1.2);
	    this.scene.scale(0.5,2,0.5);
	    this.motorH1.display();
        this.scene.popMatrix();	

	    this.scene.pushMatrix();
        this.scene.translate(-0.5,0,-1.2);
	    this.scene.scale(0.5,2,0.5);
	    this.motorH2.display();
        this.scene.popMatrix();	
    }

    ventoinhas(){
	    this.scene.pushMatrix();
        this.scene.translate(0.24,-1.2,-0.775);
	    this.scene.rotate(Math.PI/2,1,0,0);
	    this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI*2*this.randAng1 + this.ang, 0, 1, 0);
	    this.scene.scale(0.05,1,0.25);
        this.scene.rotate(Math.PI/2, -1, 0, 0);
	    this.ventoinha1.display();
        this.scene.popMatrix();

	    this.scene.pushMatrix();
        this.scene.translate(-0.24,-1.2,-0.775);
	    this.scene.rotate(Math.PI/2,1,0,0);
	    this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.rotate(Math.PI*2*this.randAng2 + this.ang, 0, 1, 0);
	    this.scene.scale(0.05,1,0.25);
        this.scene.rotate(Math.PI/2, -1, 0, 0);
	    this.ventoinha2.display();
        this.scene.popMatrix();
    }

    bandeiraDisplay(){
	    this.scene.pushMatrix();
	    this.bandeiraTexture.apply();
        this.scene.translate(0, 0, -4);  
	    this.scene.scale(1,1,1.5);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
	    this.scene.pushMatrix();
	    this.bandeira.display();
        this.scene.popMatrix();
	
	    this.scene.pushMatrix();
        this.scene.rotate(Math.PI, 0, 1, 0);
	    this.bandeira.display();
        this.scene.popMatrix();	 
        this.scene.popMatrix();
    }

    display() {

        this.scene.pushMatrix();
        this.scene.translate(this.xPos, 10, this.zPos);        				
	    this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
        this.scene.rotate(this.deltaY, 0, 1, 0);
	    this.bandeiraDisplay();
        this.scene.pushMatrix();
	    this.lemeTexture.apply();
	    this.displayLemes();
	    this.scene.popMatrix();
	    this.ventoinhas();
	    this.scene.scale(1,1,2);
	    this.zepTexture.apply();
        this.body.display();
	    this.scene.pushMatrix();
        this.scene.translate(0,-1.1,-0.2);
	    this.scene.scale(0.2,0.2,0.1);
	    this.scene.rotate(Math.PI/2,1,0,0);
	    this.scene.rotate(Math.PI/2,0,1,0);
	    this.cabine();
        this.scene.popMatrix();	
        this.scene.popMatrix();
    }

}


