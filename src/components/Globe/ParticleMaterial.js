import * as THREE from "three";

export default function createParticleMaterial() {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,

    uniforms: {
      uColor: {
        value: new THREE.Color("#629c04"),
      },
    },

    vertexShader: `
      void main() {

        vec4 mvPosition =
          modelViewMatrix *
          vec4(position,1.0);

        gl_PointSize = 5.0;

        gl_Position =
          projectionMatrix *
          mvPosition;
      }
    `,

    fragmentShader: `
      uniform vec3 uColor;

      void main(){

        vec2 uv =
          gl_PointCoord - 0.5;

        float d = length(uv);

        float alpha =
          smoothstep(
            0.5,
            0.15,
            d
          );

        gl_FragColor =
          vec4(uColor, alpha);
      }
    `,
  });
}