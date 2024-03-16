import './style.css'
import * as THREE from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import gsap from 'gsap'

const scene = new THREE.Scene()
scene.add(new THREE.AxesHelper(5))

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight,0.1,1000)

camera.position.z=2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshNormalMaterial()

const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

const controls = new TransformControls(camera, renderer.domElement)
controls.attach(cube)
scene.add(controls)

const stats = Stats()
document.body.appendChild(stats.dom)

const clock = new THREE.Clock()
gsap.to(cube.rotation, {duration: 1, delay: 2, x: 0.2*2*Math.PI, repeat: -1})

function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene,camera)
    stats.update()
}

animate()

function render(){
    renderer.render(scene,camera)
}

animate()