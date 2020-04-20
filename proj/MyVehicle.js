/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        this.pyramid = new MyPyramid(scene, 4, 10);
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
        this.pyramid.display();
        this.scene.popMatrix();
    }

}


