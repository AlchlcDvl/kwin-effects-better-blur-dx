#version 140

uniform sampler2D texUnitOld;
uniform sampler2D texUnitNew;
uniform vec2 halfpixel;
uniform float borderIgnore;

in vec2 uv;

out vec4 fragColor;

void main() {
    if (any(greaterThan(abs(uv - 0.5), vec2(0.5 - borderIgnore)))) {
        discard;
    }

    vec4 colorOld = vec4(0.0);
    colorOld += texture(texUnitOld, uv + vec2(-halfpixel.x, -halfpixel.y));
    colorOld += texture(texUnitOld, uv + vec2(halfpixel.x, -halfpixel.y));
    colorOld += texture(texUnitOld, uv + vec2(-halfpixel.x, halfpixel.y));
    colorOld += texture(texUnitOld, uv + vec2(halfpixel.x, halfpixel.y));
    colorOld /= 4.0;

    vec4 colorNew = vec4(0.0);
    colorNew += texture(texUnitNew, uv + vec2(-halfpixel.x, -halfpixel.y));
    colorNew += texture(texUnitNew, uv + vec2(halfpixel.x, -halfpixel.y));
    colorNew += texture(texUnitNew, uv + vec2(-halfpixel.x, halfpixel.y));
    colorNew += texture(texUnitNew, uv + vec2(halfpixel.x, halfpixel.y));
    colorNew /= 4.0;

    // discard (almost) identical pixels (using squared vec distance)
    vec4 colorDiff = colorOld - colorNew;
    if (dot(colorDiff, colorDiff) < 0.001) {
        discard;
    }

    // not discarded -> different
    fragColor = vec4(1.0);
}
