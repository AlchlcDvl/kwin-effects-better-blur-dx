#version 140

uniform sampler2D texUnit;
uniform float modulation;

in vec2 uv;

out vec4 fragColor;

void main(void)
{
    fragColor = texture(texUnit, uv) * modulation;
}
