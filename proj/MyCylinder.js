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
        this.texCoords = [];

        //Angles needded to calculate the vertices, normals and texture coordinates
        var ang = 0;
        var alpha = 2*Math.PI/this.slices;

        //Adds the basic vertices, normals, and texture coordinates
        this.vertices.push(1, 0, 0);
        this.vertices.push(1, 2, 0);
        this.normals.push(1, 0, 0);
        this.normals.push(1, 0, 0);
        this.texCoords.push(0, 0);
        this.texCoords.push(0, 1);

        //Calculates and adds the vertices, normals, and texture coordinates
        //according to the alpha angle 'alpha' 
        for(var i = 0; i < this.slices; i++){
            this.vertices.push(Math.cos(ang), 2, Math.sin(ang));
            this.vertices.push(Math.cos(ang), 0, Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, Math.sin(ang));
            this.normals.push(Math.cos(ang), 0, Math.sin(ang));
            this.texCoords.push(1-i/this.slices,0);
            this.texCoords.push(1-i/this.slices,1);
            ang += alpha;
        }

        //Calculates the indices
	    var i;
        for(i = 0; i < this.slices; i++){
            this.indices.push(2*i, 2*i+2, 2*i+1);
            this.indices.push(2*i+1, 2*i+2, 2*i+3);

	    //imprimir parte de dentro
            this.indices.push(2*i+2, 2*i, 2*i+1);
            this.indices.push(2*i+2, 2*i+1, 2*i+3);
        }

	    //ligação entre ultima aresta e primeira
        this.indices.push(2*i, 0, 2*i+1);
        this.indices.push(1, 0, 2*i);

        this.indices.push(0, 2*i, 2*i+1);
        this.indices.push(0, 1, 2*i);

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
