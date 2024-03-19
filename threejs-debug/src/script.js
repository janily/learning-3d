import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

import * as dat from 'lil-gui'

const canvas = document.querySelector('canvas.webgl')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()

const Col = {
    color: 0xfff000
}

const Spin = {
    spin: () =>
    {
        gsap.to(mesh.rotation, {duration:1, y: mesh.rotation.y + Math.PI*2})
    }
}

const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 5, 5, 5)
const material = new THREE.MeshBasicMaterial({ color: Col.color })
const mesh = new THREE.Mesh(geometry, material) 
scene.add(mesh)
const gui = new dat.GUI()


const Rotation = gui.addFolder('Rotation')
Rotation.add(mesh.rotation, 'x',0,5,.01)
Rotation.add(mesh.rotation, 'y',0,5,.1)
Rotation.add(mesh.rotation, 'z',0,5,.1)
Rotation.close()


const Position = gui.addFolder('Position')
Position.add(mesh.position, 'x',0,5,.01)
Position.add(mesh.position, 'y',0,5,.1)
Position.add(mesh.position, 'z',0,5,.1)
Position.close()

const Spinning = gui.addFolder('Spin')
Spinning.add(Spin,'spin')
Spinning.close()

const Customization = gui.addFolder('Customization')
Customization.add(mesh.material, 'wireframe')
Customization.close()

const Color = gui.addFolder('Color')
Color.addColor(Col, 'color').onChange(() =>
{
    material.color.set(Col.color)
})
Color.close()

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



const Camera = gui.addFolder('Camera')
Camera.add(camera.position,'z',0,10,.1)
Camera.add(camera.position,'x',0,10,.1)
Camera.add(camera.position,'y',0,10,.1)
Camera.close()


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



window.addEventListener('dblclick',() =>
{
    if(!document.fullscreenElement)
    {
        canvas.requestFullscreen()
    }
    else
    {
        document.exitFullscreen()
    }
})


window.addEventListener('resize', () => 
{
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()    

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})
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