import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const canvas = document.querySelector('canvas.webgl')

const sizes = {
    width: 800,
    height: 600
}

const scene = new THREE.Scene()

const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xfff000 })
)
scene.add(mesh)


const aspectRatio = sizes.width/sizes.height

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     -1,
//     0.1,
//     100)

// camera.position.x = 2
// camera.position.y = 2

camera.position.z = 2

const cursor ={x:0, y:0}
window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = -( event.clientY / sizes.width - 0.5)
})

console.log(camera.position.length())
camera.lookAt(mesh.position)
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

const clock = new THREE.Clock()

const controls = new OrbitControls(camera, canvas)
const enableDamping = true

const animate = () =>
{
    // const elapsedTime = clock.getElapsedTime()

    // mesh.rotation.y = elapsedTime;

    renderer.render(scene, camera)

    // camera.lookAt(new THREE.Vector3())
    // camera.position.x = Math.sin(cursor.x*3)
    // camera.position.y = Math.sin(cursor.y*3)
    controls.update()

    window.requestAnimationFrame(animate)
}

animate()