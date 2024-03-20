import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper'

const canvas = document.querySelector('canvas.webgl')

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

const scene = new THREE.Scene()

// const spotLight = new THREE.SpotLight(0xffffff)
// spotLight.position.set(1,10,10)
// scene.add(spotLight)

// const AmbientLight = new THREE.AmbientLight(0xffffff,2)
// scene.add(AmbientLight)

// const DirectionalLight = new THREE.DirectionalLight(0xffffff,2)
// scene.add(DirectionalLight)

// const HemisphereLight = new THREE.HemisphereLight(0xfff000,0xffffff,2.59)
// scene.add(HemisphereLight)

// const PointLight = new THREE.PointLight(0xffffff,10,2,2)
// PointLight.position.set(1,1,1)
// scene.add(PointLight)

const RectAreaLight = new THREE.RectAreaLight(0xffffff,2,3,4)
RectAreaLight.position.set(1,-1,1)
const helper = new RectAreaLightHelper(RectAreaLight)
scene.add(helper)
scene.add(RectAreaLight)


// const SpotLight = new THREE.SpotLight(0xffffff,10,4,3,2,2)
// scene.add(SpotLight)

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/baseColor.jpg')
const normalTexture = textureLoader.load('/normalMap.jpg')

// const cubeTextureLoader = new RGBELoader()
// const envMapTexture = cubeTextureLoader.load('/environment.hdr', () =>
// {
//     envMapTexture.mapping = THREE.EquirectangularReflectionMapping
//     scene.background = envMapTexture
//     scene.environment = envMapTexture
// })


const geometry = new THREE.BoxBufferGeometry(1, 1, 1, 5, 5, 5)
const material = new THREE.MeshStandardMaterial()
material.map = texture
material.normalMap =normalTexture
material.roughness = 0.65
material.metalness = 0.45
const mesh = new THREE.Mesh(geometry, material)
    

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

    // geometry.rotation.y = elapsedTime;

    // renderer.toneMapping = THREE.ACESFilmicToneMapping
    // renderer.toneMappingExposure =0.4

    // renderer.outputEncoding = THREE.sRGBEncoding
    renderer.render(scene, camera)
    // RectAreaLight.rotation.x= elapsedTime

    // camera.lookAt(new THREE.Vector3())
    // camera.position.x = Math.sin(cursor.x*3)
    // camera.position.y = Math.sin(cursor.y*3)
    controls.update()

    window.requestAnimationFrame(animate)
}

animate()