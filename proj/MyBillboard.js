class MyBillboard extends CGFobject{

    constructor(scene) {
        super(scene);

        this.board = new MyPlane(scene,10);

    }
}