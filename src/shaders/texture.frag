uniform sampler2D texUnit;
uniform float modulation;

varying vec2 uv;

void main(void)
{
    gl_FragColor = texture2D(texUnit, uv) * modulation;
}
