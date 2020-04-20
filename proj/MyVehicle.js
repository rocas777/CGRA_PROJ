/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, deltaY, initSpeed, xPos, yPos, zPos) {
        super(scene);
        this.pyramid = new MyPyramid(scene, 4, 10);
        this.deltaY = deltaY;
        this.initSpeed = initSpeed;
        this.speed = 0;
        this.xPos = xPos;
        this.yPos = yPos;
        this.zPos = zPos;
    }

    update(){

    }


    display() {
        var rotationMatrix = [
            1, 0, 0, 0,
            0, Math.cos(Math.PI/2), Math.sin(Math.PI/2), 0,
            0, -Math.sin(Math.PI/2), Math.cos(Math.PI/2), 0,
            0, 0, 0, 1
        ];
        this.scene.pushMatrix();
        this.scene.multMatrix(rotationMatrix);
        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.pyramid.display();
        this.scene.popMatrix();
    }

}


