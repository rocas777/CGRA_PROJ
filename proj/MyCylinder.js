class MyCylinder extends CGFobject {
    /**
     * 
     * @param {*} scene - MyScene
     * @param {*} slices - "Sides" of the cylinder
     */

    constructor(scene, slices) {
        super(scene);
        this.slices = slices;
        this.initBuffers();
      }

    initBuffers() {
        //Arrays needded to store the vertices, indices, normals and texture coordinates
		this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.textCoords = [];

        //Angles needded to calculate the vertices, normals and texture coordinates
        var ang = 0;
        var alpha = 2*Math.PI/this.slices;

        //Adds the basic vertices, normals, and texture coordinates
        this.vertices.push(1, 0, 0);
        this.vertices.push(1, 3, 0);
        this.normals.push(1, 0, 0);
        this.normals.push(1, 0, 0);
        this.textCoords.push(alpha, 0);
        this.textCoords.push(alpha, 1);

        //Calculates and adds the vertices, normals, and texture coordinates
        //according to the alpha angle 'alpha' 
        for(var i = 0; i < this.slices; i++){
            this.vertices.push(Math.cos(ang), 3, -Math.sin(ang));
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, -Math.sin(ang));
            this.textCoords.push(ang/(2*Math.PI),0);
            this.textCoords.push(ang/(2*Math.PI),0);
            ang += alpha;
        }

        //Calculates the indices
        for(var i = 0; i < this.slices; i++){
            this.indices.push(2*i, 2*i+2, 2*i+1);
            this.indices.push(2*i+1, 2*i+2, 2*i+3);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    
    }
}