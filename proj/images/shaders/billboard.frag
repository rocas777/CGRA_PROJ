#ifdef GL_ES
precision highp float;
#endif

varying vec4 coords;

uniform int suppliesDropped;

void main() {

    // upperLimit = 0.51;
    // lowerLimit = -0.5;

    float limit = -0.5 + float(suppliesDropped) * ((0.51-(-0.5))/5.0);

    if (coords.x > limit)
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1);
    else {
        gl_FragColor = vec4(1.0 - (0.3 + coords.x), 0.5 + coords.x, 0.0, 1.0);
    }
}