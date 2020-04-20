/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks, deltaY, initSpeed, position){
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.deltaY = deltaY;
        this.initSpeed = initSpeed;
        this.position = position;
        this.initBuffers();
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

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    update(){
        
    }
}


