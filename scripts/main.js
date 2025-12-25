import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputColorSpace = THREE.SRGBColorSpace;

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(40,20,50);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
renderer.setPixelRatio(window.devicePixelRatio);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = true;
controls.minDistance=5;
controls.maxDistance=100;
controls.minPolarAngle=0.5;
controls.maxPolarAngle=1.5;
controls.autoRotate=false;
controls.target = new THREE.Vector3(0,1,0);
controls.update()

const light_1 = new THREE.AmbientLight(0xffffff, 1.0);
scene.add(light_1);

const gridHelper = new THREE.GridHelper( 40, 20 ); // ( size, divisions )
scene.add( gridHelper );

const gltfLoader = new GLTFLoader();
gltfLoader.load('./public/models/Human Foot in Blender.glb', (gltf) => {
    const gltfScene = gltf.scene;
    scene.add(gltfScene)
})

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};

animate();