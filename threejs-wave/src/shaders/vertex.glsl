#pragma glslify: snoise = require('glsl-noise/simplex/3d.glsl');

uniform vec2 uFrequency;
uniform float uTime;

varying vec2 vUv;
varying float vElevation;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec3 pos = position;
  float noiseFreq = 1.0;
  float noiseAmp = 1.4;
  vec3 noisePos = vec3(pos.x * noiseFreq + uTime/5.0, pos.y, pos.z);

  elevation += snoise(noisePos) * noiseAmp;

  modelPosition.z += elevation;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;

  vUv = uv;
  vElevation = elevation;
}