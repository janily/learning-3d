import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import gsap from 'gsap'

let modelEles;

const controlsColor = document.querySelector('.controls');

const colors = [
    {
        texture: 'wood.jpeg',
        size: [2,2,2],
        shininess: 60
    },
    {
        texture: 'denim.jpeg',
        size: [3, 3, 3],
        shininess: 0
    },
    {
        color: '66533C'
    },
    {
        color: '173A2F'
    },
    {
        color: '153944'
    },
    {
        color: '27548D'
    },
    {
        color: '438AAC'
    }  
    ]

const gltfLoader = new GLTFLoader()

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

let tl = gsap.timeline()

// 初始化材质
const INITIAL_MTL = new THREE.MeshPhongMaterial( { color: 0xf1f1f1, shininess: 10 } );

// 设置模型颜色
function initColor(parent, mtl) {
    parent.traverse((o) => {
      if (o.isMesh) {
          o.material = mtl;
      }
    });
}

// model
gltfLoader.load('stool_dup/scene.gltf', (gltf) => {
    gltf.scene.scale.set(0.5,0.5,0.5)
    gltf.scene.rotation.set(0,3.5,0)

    modelEles = gltf.scene

    initColor(modelEles, INITIAL_MTL)

    scene.add(gltf.scene)

    gui.add(gltf.scene.rotation, 'x').min(0).max(9)
    gui.add(gltf.scene.rotation, 'y').min(0).max(9)
    gui.add(gltf.scene.rotation, 'z').min(0).max(9)

    tl.to(gltf.scene.rotation, {y: 4.7, duration: 1})
    tl.to(gltf.scene.scale, {x: 0.7, y: 0.7, z: 0.7,duration: 1}, "-=1")
    tl.to(gltf.scene.position, {x: -0.8})
    tl.to(gltf.scene.rotation, {y:4.1, duration: 1})
    tl.to(gltf.scene.scale, {x:0.7, y: 0.7, z: 0.7, duration: 1}, "-=1")
    tl.to(controlsColor, {opacity: 1, duration: 1})

})



// Lights

// const pointLight = new THREE.AmbientLight(0xffffff, 1)
// pointLight.position.x = 2
// pointLight.position.y = 3
// pointLight.position.z = 4
// scene.add(pointLight)

// Add lights
// const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.61 );
//     hemiLight.position.set( 0, 50, 0 );
// // Add hemisphere light to scene   
// scene.add( hemiLight );

// Add lights
const spointLight = new THREE.SpotLight( 0xffffff, 0xffffff, 1 );
spointLight.position.set( 0, 50, 0 );
// Add hemisphere light to scene   
scene.add( spointLight );


const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
    dirLight.position.set( -8, 12, 8 );
    dirLight.castShadow = true;
    dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
// Add directional Light to scene    
scene.add( dirLight );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.minDistance = 2;
controls.maxDistance = 10;
// controls.target.set( 0, 0.5, - 0.2 );
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

const TRAY = document.getElementById('js-tray-slide');

// 设置颜色面板
function buildColors(colors) {
    for (let [i, color] of colors.entries()) {
      let swatch = document.createElement('div');
      swatch.classList.add('tray__swatch');
      
      if (color.texture)
      {
        swatch.style.backgroundImage = "url(" + color.texture + ")";   
      } else
      {
        swatch.style.background = "#" + color.color;
      }
  
      swatch.setAttribute('data-key', i);
      TRAY.append(swatch);
    }
}

buildColors(colors);

// 颜色面板
const swatches = document.querySelectorAll(".tray__swatch");

// 监听点击事件，来设置颜色
for (const swatch of swatches) {
    swatch.addEventListener('click', selectSwatch);
}

// 设置颜色方法
function selectSwatch(e) {
    let color = colors[parseInt(e.target.dataset.key)];
    let new_mtl;
  
    if (color.texture) {
      let txt = new THREE.TextureLoader().load(color.texture);
  
      txt.repeat.set( color.size[0], color.size[1], color.size[2]);
      txt.wrapS = THREE.RepeatWrapping;
      txt.wrapT = THREE.RepeatWrapping;
        
      new_mtl = new THREE.MeshPhongMaterial( {
        map: txt,
        shininess: color.shininess ? color.shininess : 10
      });    
    } 
    else {
      new_mtl = new THREE.MeshPhongMaterial({
        color: parseInt('0x' + color.color),
        shininess: color.shininess ? color.shininess : 10
      });
    }
      
    setMaterial(modelEles, new_mtl);
  }

function setMaterial(parent, mtl) {
    parent.traverse((o) => {
        if (o.isMesh) {
            o.material = mtl;
        }
    });
}