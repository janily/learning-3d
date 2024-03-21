import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

const gui = new dat.GUI()

const canvas = document.querySelector('canvas.webgl')


const scene = new THREE.Scene()


const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
const AmbientLight = gui.addFolder('AmbientLight')
AmbientLight.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)


const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
directionalLight.position.set(2, 2, - 1)
const DirectionalLight = gui.addFolder('DirectionalLight')
directionalLight.castShadow = true


directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 6


directionalLight.shadow.camera.top = 2
directionalLight.shadow.camera.right = 2
directionalLight.shadow.camera.bottom = -2
directionalLight.shadow.camera.left = -2

directionalLight.shadow.radius = 10

const directionalLightHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
scene.add(directionalLightHelper)


DirectionalLight.add(directionalLight, 'intensity').min(0).max(1).step(0.001)
DirectionalLight.add(directionalLight.position, 'x').min(- 5).max(5).step(0.001)
DirectionalLight.add(directionalLight.position, 'y').min(- 5).max(5).step(0.001)
DirectionalLight.add(directionalLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(directionalLight)

const material = new THREE.MeshStandardMaterial()
material.roughness = 0.7
const SphereControls = gui.addFolder('SphereControls')
SphereControls.add(material, 'metalness').min(0).max(1).step(0.001)
SphereControls.add(material, 'roughness').min(0).max(1).step(0.001)


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    material
)
sphere.castShadow = true
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5,5),
    material
)
plane.receiveShadow = true
plane.rotation.x =-Math.PI*.5
plane.position.y= -.5
scene.add(sphere, plane)


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
controls.maxPolarAngle = Math.PI/2

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()

const animate = () =>
{
    const elapsedTime = clock.getElapsedTime()

    controls.update()
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.render(scene, camera)
    window.requestAnimationFrame(animate)
}

animate()