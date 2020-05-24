attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float speedFactor;
uniform float time;

uniform sampler2D uSampler2;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;

    vec3 offset = vec3(0.0,0.0,sin(time*(speedFactor +0.2) + 20.0*(aVertexPosition.x + 0.3 )) *0.05);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition +offset*(aVertexPosition.x +0.55),1.0);
}
