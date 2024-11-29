import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {spawnRoom, spawnShelves } from './components/render_room.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 5; // Set camera position

// Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#233143"); // Set background colour
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Add renderer to HTML as a canvas element

// Make Canvas Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight); // Update size
    camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
    camera.updateProjectionMatrix(); // Apply changes
})

const controls = new OrbitControls( camera, renderer.domElement );
// const controls = new FirstPersonControls( camera, renderer.domElement );


controls.target = new THREE.Vector3(0,-10,-10);


//controls.update() must be called after any manual changes to the camera's transform
camera.position.set( 0, 10, 0 );
controls.update();

spawnRoom(scene);

function animate() {

	requestAnimationFrame( animate );

	// required if controls.enableDamping or controls.autoRotate are set to true
	controls.update();

	renderer.render( scene, camera );
	
}
animate();



// // Create box:
// const boxGeometry = new THREE.BoxGeometry(2, 2, 2); // Define geometry
// const boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF}); // Define material
// const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial); // Build box
// boxMesh.rotation.set(40, 0, 40); // Set box initial rotation
// scene.add(boxMesh); // Add box to canvas

// // Create spheres: 
// const sphereMeshes = [];
// const sphereGeometry = new THREE.SphereGeometry(0.1, 32, 32); // Define geometry
// const sphereMaterial = new THREE.MeshLambertMaterial({color: 0xC56CEF}); // Define material
// for (let i=0; i<4; i++) {
//     sphereMeshes[i] = new THREE.Mesh(sphereGeometry, sphereMaterial); // Build sphere
//     sphereMeshes[i].position.set(0, 0, 0);
//     scene.add(sphereMeshes[i]); // Add sphere to canvas
// }
// // Lights
// const lights = []; // Storage for lights
// // const lightHelpers = []; // Storage for light helpers
// // Properties for each light
// const lightValues = [
//     {colour: 0x14D14A, intensity: 8, dist: 12, x: 1, y: 0, z: 8},
//     {colour: 0xBE61CF, intensity: 6, dist: 12, x: -2, y: 1, z: -10},
//     {colour: 0x00FFFF, intensity: 3, dist: 10, x: 0, y: 10, z: 1},
//     {colour: 0x00FF00, intensity: 6, dist: 12, x: 0, y: -10, z: -1},
//     {colour: 0x16A7F5, intensity: 6, dist: 12, x: 10, y: 3, z: 0},
//     {colour: 0x90F615, intensity: 6, dist: 12, x: -10, y: -1, z: 0}
// ];
// for (let i=0; i<6; i++) {
//     // Loop 6 times to add each light to lights array
//     // using the lightValues array to input properties
//     lights[i] = new THREE.PointLight(
//       lightValues[i]['colour'], 
//       lightValues[i]['intensity'], 
//       lightValues[i]['dist']
//     );
  
//     lights[i].position.set(
//       lightValues[i]['x'], 
//       lightValues[i]['y'], 
//       lightValues[i]['z']
//     );
  
//     scene.add(lights[i]);
// // Add light helpers for each light
//     // lightHelpers[i] = new THREE.PointLightHelper(lights[i]);
//     // scene.add(lightHelpers[i]);
// };