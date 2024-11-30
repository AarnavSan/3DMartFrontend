import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { add } from 'three/webgpu';

function spawnBoxProduct(scene, position, rotation, scale, productImageFront="https://cdn.pixabay.com/photo/2024/11/27/18/38/landscape-9228975_1280.jpg"){
    //Create a box geometry
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    addAndPlaceModel(scene, position, rotation, scale, productImageFront, boxGeometry);
}

function spawnCylinderProduct(scene, position, rotation, scale, productImageFront="https://cdn.pixabay.com/photo/2024/11/27/18/38/landscape-9228975_1280.jpg"){
    //Create a cylinder geometry
    const cylinderGeometry = new THREE.CylinderGeometry(1, 1, 1, 32);
    addAndPlaceModel(scene, position, rotation, scale, productImageFront, cylinderGeometry);
}

function addAndPlaceModel(scene, position, rotation, scale, productImageFront, geometry){
    //Create a texture loader
    const textureLoader = new THREE.TextureLoader();
    //Load the front image
    const frontTexture = textureLoader.load(productImageFront);
    //Create a material with all the images
    const material = new THREE.MeshBasicMaterial({ map: frontTexture });
    //Create a mesh with the cylinder geometry and material
    const mesh = new THREE.Mesh(geometry, material);
    //Set the position of the cylinder
    mesh.position.set(position.x, position.y, position.z);
    //Set the rotation of the cylinder
    mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    //Set the scale of the cylinder
    mesh.scale.set(scale.x, scale.y, scale.z);
    //Add the cylinder to the scene
    scene.add(mesh);
}

export {spawnBoxProduct, spawnCylinderProduct};