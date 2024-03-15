import './style.css'
import * as THREE from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import Stats from 'three/examples/jsm/libs/stats.module'

const canvas = document.querySelector('canvas.webgl')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene();
scene.add(new THREE.AxesHelper(5))

const cubeGeometry = new THREE.BoxGeometry()
const cubeMaterial = new THREE.MeshNormalMaterial()
const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height,0.1,1000)
camera.position.z = 2
scene.add(camera)


console.log(cubeMesh.position.distanceTo(camera.position))


const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
document.body.appendChild(renderer.domElement)
// renderer.render(scene, camera)


const controls = new TransformControls(camera, renderer.domElement)
controls.attach(cubeMesh)
scene.add(controls)

const stats = Stats()
document.body.appendChild(stats.dom)

function animate()
{
    requestAnimationFrame(animate)
    render()
    stats.update()
}

function render()
{
    renderer.render(scene, camera)
}

animate()