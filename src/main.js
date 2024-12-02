import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import ScrollBasedController from './components/CameraController/ScrollBasedController.js';

import { InteractionManager } from 'three.interactive';

import database from './components/data/database.json';
import { GroceryStore } from './components/objects/grocerystore.js';

//The main.js file is the entry point of the application
//All the code starts from here
//The scene, camera, renderer, and other central objects are created here

// Three.js is a 3D library that makes it easy to create 3D graphics in the browser
// The scene is the container for all objects in the 3D space
// Scene
const scene = new THREE.Scene();

// The camera is the object that captures the 3D scene
// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 5; // Set camera position

// The renderer is the object that renders the 3D scene
//It handles the rendering of the scene
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
	renderer.physicallyCorrectLights = true;
}
setupRenderer(renderer);
document.body.appendChild(renderer.domElement); // Add renderer to HTML as a canvas element

// The interaction manager is the object that handles user interactions with the 3D scene
// Like hovering, clicking etc.
// Interaction Manager
const interactionManager = new InteractionManager(
	renderer,
	camera,
	renderer.domElement
  );

// Make Canvas Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight); // Update size
    camera.aspect = window.innerWidth / window.innerHeight; // Update aspect ratio
    camera.updateProjectionMatrix(); // Apply changes
})


// Create a grocery store object
// This object is responsible for creating and managing the entire grocery store
// As well as all of the UI elements and interactions
// Hence it needs all the central objects like the scene, camera, renderer, etc.
let groceryStore = new GroceryStore(document, scene, interactionManager, camera, renderer, database);
groceryStore.create_room();

// Currently commented out, but below are the different types of camera controls that can be used
// that are included in the threejs library
// However, we have created our own custom camera controls
// const controls = new OrbitControls( camera, renderer.domElement );
// controls.target = new THREE.Vector3(0,-10,-10);
// const controls = new CustomFirstPersonControls( camera, scene, renderer.domElement );

// This is the custom camera controller that we have created
// It works on mouse scroll and moves the camera to different set positions
// More on information about this is present in the ScrollBasedController.js file
let scrollBasedController = new ScrollBasedController(camera, document, groceryStore.shelfGrid);
scrollBasedController.initAllCameraPositionsAndRotations(groceryStore.shelfGrid);
scrollBasedController.moveToCurrentCameraPositionAndRotation();

// The animate function is called every frame
function animate() {

	// Call the animate function recursively
	requestAnimationFrame( animate );

	// Update the Interaction Manager
	interactionManager.update();

	// Render the scene
	renderer.render( scene, camera );
}
animate();