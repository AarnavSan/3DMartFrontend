import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {spawnRoom } from './components/render_room.js';
import { spawnBoxProduct } from './components/threedplacerfunctions/create_products.js';
import database from './components/data/database.json';
import { GroceryStore } from './components/objects/grocerystore.js';

console.log(database);


// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 5; // Set camera position

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
function setupRenderer(renderer){
	// Renderer
	renderer.setClearColor("#233143"); // Set background colour
	renderer.setSize(window.innerWidth, window.innerHeight);
	//Initialize a renderer
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.VSMShadowMap;
	renderer.outputEncoding = THREE.sRGBEncoding;
	renderer.toneMapping = THREE.ACESFilmicToneMapping;
	//renderer.physicallyCorrectLights = true;
}
setupRenderer(renderer);
document.body.appendChild(renderer.domElement); // Add renderer to HTML as a canvas element

// Make Canvas Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight); // Update size
    camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
    camera.updateProjectionMatrix(); // Apply changes
})

const controls = new OrbitControls( camera, renderer.domElement );
controls.target = new THREE.Vector3(0,-10,-10);


//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 10, 0 );
controls.update();

let groceryStore = new GroceryStore(scene, camera, renderer, database);
groceryStore.create_room();

// //Spawn Grocery Store Room model
// spawnRoom(scene);

//Spawn Box Product
// spawnBoxProduct(scene, 
// 	{x: 0, y: 0, z: 0}, 
// 	{x: 0, y: 0, z: 0}, 
// 	{x: 1, y: 1, z: 0.1}, 
// 	"https://cdn.pixabay.com/photo/2016/03/31/19/58/avatar-1295429_960_720.png",
// 	"https://cdn.pixabay.com/photo/2017/02/14/03/03/ama-dablam-2064522_1280.jpg",
// 	"https://cdn.pixabay.com/photo/2024/03/08/16/22/clouds-8621202_1280.jpg",
// 	"https://cdn.pixabay.com/photo/2021/11/21/21/14/mountain-6815304_1280.jpg");

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );
	
}
animate();

