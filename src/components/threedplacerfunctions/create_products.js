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

function spawnHitBox(scene, position, rotation, interactionManager, product){
    const HITBOX_SCALE = {"x" : 4, "y" : 0.5, "z" : 0.4};
    const HITBOX_POSITION_OFFSET_X = 1.5;
    //Create a box geometry
    const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
    // Create a white material
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 });
    // Create a mesh with the geometry and material
    const mesh = new THREE.Mesh(boxGeometry, material);
    //Set the position of the cylinder
    mesh.position.set(position.x + HITBOX_POSITION_OFFSET_X, position.y + (HITBOX_SCALE.y / 2), position.z);
    //Set the rotation of the cylinder
    mesh.rotation.set(rotation.x, rotation.y, rotation.z);
    //Set the scale of the cylinder
    mesh.scale.set(HITBOX_SCALE.x, HITBOX_SCALE.y, HITBOX_SCALE.z);
    // Set the name of the mesh to product.product_id
    mesh.name = product.name + "_$_" + product.product_id;

    mesh.addEventListener('mouseover', (event) => {
        event.target.material.color.set(0xff0000);
        event.target.material.opacity = 0.4;
        document.body.style.cursor = 'pointer';
      });
      mesh.addEventListener('mouseout', (event) => {
        event.target.material.color.set(0xffffff);
        event.target.material.opacity = 0;
        document.body.style.cursor = 'default';
      });
      mesh.addEventListener('mousedown', (event) => {
    //event.target.scale.set(1.1, 1.1, 1.1);
      });
      mesh.addEventListener('mouseup', (event) => {
        //event.target.scale.set(1.1, 1.1, 1.1);
        if (event.wasIntersectedOnMouseDown) {
          // Object was intersected when mouse down fired, so this is essentially a click event
         
        } else {
          // Object was not intersected when mouse down fired
        }
      });
      mesh.addEventListener('click', (event) => {
        //event.target.scale.set(1.0, 1.0, 1.0);
        //console.log(event);
        if(event.target.material.opacity === 0.4){
            //console.log(product.parent);
            product.addThisProductToCart();
        }
      });

      interactionManager.add(mesh);    
    // Add the cylinder to the scene
    scene.add(mesh);
}

export {spawnBoxProduct, spawnCylinderProduct, spawnHitBox};