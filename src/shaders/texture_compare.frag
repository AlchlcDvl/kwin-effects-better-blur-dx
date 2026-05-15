uniform sampler2D texUnitOld;
uniform sampler2D texUnitNew;
uniform vec2 halfpixel;
uniform float borderIgnore;

varying vec2 uv;

void main() {
    if (any(greaterThan(abs(uv - 0.5), vec2(0.5 - borderIgnore)))) {
        discard;
    }

    vec4 colorOld = vec4(0.0);
    colorOld += texture2D(texUnitOld, uv + vec2(-halfpixel.x, -halfpixel.y));
    colorOld += texture2D(texUnitOld, uv + vec2(halfpixel.x, -halfpixel.y));
    colorOld += texture2D(texUnitOld, uv + vec2(-halfpixel.x, halfpixel.y));
    colorOld += texture2D(texUnitOld, uv + vec2(halfpixel.x, halfpixel.y));
    colorOld /= 4.0;

    vec4 colorNew = vec4(0.0);
    colorNew += texture2D(texUnitNew, uv + vec2(-halfpixel.x, -halfpixel.y));
    colorNew += texture2D(texUnitNew, uv + vec2(halfpixel.x, -halfpixel.y));
    colorNew += texture2D(texUnitNew, uv + vec2(-halfpixel.x, halfpixel.y));
    colorNew += texture2D(texUnitNew, uv + vec2(halfpixel.x, halfpixel.y));
    colorNew /= 4.0;

    // discard (almost) identical pixels (using squared vec distance)
    vec4 colorDiff = colorOld - colorNew;
    if (dot(colorDiff, colorDiff) < 0.001) {
        discard;
    }

    // not discarded -> different
    gl_FragColor = vec4(1.0);
}
