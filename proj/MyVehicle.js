/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, deltaY, initSpeed, xPos, yPos, zPos){
        super(scene);
        this.pyramid = new MyPyramid(scene, 4, 10);
        this.deltaY = deltaY;
        this.initSpeed = initSpeed;
        this.speed = initSpeed;
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
        this.initBuffers();
    }

    update(){

    }

    accelerate(val){
        this.speed = this.speed + val;
        this.translate
    }

    reset(){
        this.deltaY = 0;
        this.initSpeed = 0;
        this.speed = 0;
        this.xPos = 0;
        this.yPos = 0;
        this.zPos = 0;
    }


    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.scene.rotate(this.deltaY, 0, 1, 0);
        this.pyramid.display();
        this.scene.popMatrix();
    }

}


