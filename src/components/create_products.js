import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function spawnBoxProduct(scene, position, rotation, scale, productImageFront, productImageSide, productImageBack, productImageTopAndBottom){
    //Create a box geometry
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    //Create a texture loader
    const textureLoader = new THREE.TextureLoader();
    //Load the front image
    const frontTexture = textureLoader.load(productImageFront);
    //Load the side image
    const sideTexture = textureLoader.load(productImageSide);
    //Load the back image
    const backTexture = textureLoader.load(productImageBack);
    //Load the bottom image
    const topAndBottomTexture = textureLoader.load(productImageTopAndBottom);
    //Create a material with all the images
    const boxMaterial = [
        new THREE.MeshBasicMaterial({map: frontTexture}),
        new THREE.MeshBasicMaterial({map: sideTexture}),
        new THREE.MeshBasicMaterial({map: backTexture}),
        new THREE.MeshBasicMaterial({map: sideTexture}),
        new THREE.MeshBasicMaterial({map: topAndBottomTexture}),
        new THREE.MeshBasicMaterial({map: topAndBottomTexture})
    ];
    //Create a mesh with the box geometry and material
    const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
    //Set the position of the box
    boxMesh.position.set(position.x, position.y, position.z);
    //Set the rotation of the box
    boxMesh.rotation.set(rotation.x, rotation.y, rotation.z);
    //Set the scale of the box
    boxMesh.scale.set(scale.x, scale.y, scale.z);
    //Add the box to the scene
    scene.add(boxMesh);
}

export {spawnBoxProduct};