const canvas = document.querySelector('.webgl');
const size = {
    width: 800,
    height: 600,
}
const scene = new THREE.Scene();
const cubeGeometry = new THREE.BoxGeometry(1,1,1);
const cubeMaterial = new THREE.MeshBasicMaterial({
    color: "#0000A5"
});

const cubeMesh = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cubeMesh);

const camera = new THREE.PerspectiveCamera(75,size.width/size.height);
camera.position.x = 1;
camera.position.y = .5;
camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
});

renderer.setSize(size.width, size.height);
renderer.render(scene,camera);