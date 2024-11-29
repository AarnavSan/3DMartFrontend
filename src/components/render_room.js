import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import store from "../public/assets/custom-models/Grocery Store.glb";
import shelfWall from "../public/assets/custom-models/Shelf Base Wall.glb";
import shelf from "../public/assets/custom-models/Shelf.glb";

function spawnRoom(scene){

    //Spawn Room from gltf
    const loader = new GLTFLoader();
    loader.load(store, function(gltf){
        scene.add(gltf.scene);
    });

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.5); // Create light
    scene.add(mainLight); // Add light to canvas

    spawnShelves(scene, 3);
}



function spawnShelf(scene, position, rotation){
    //spawn shelf wall based on given position and rotation
    const loader = new GLTFLoader();
    loader.load(shelfWall, function(gltf){
        
        scene.add(gltf.scene);
        gltf.scene.position.set(position.x, position.y, position.z);
        gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
    });

    //Spawn 2 shelf based on given position and rotation
    // Create an offset based on the position of the shelf wall
    // So that the shelves are placed on the wall
    // At a certain height
    let shelfPosition = {x: position.x, y: position.y + 1.5, z: position.z};
    console.log(shelfPosition);

    //Spawn shelf 1 at shelfPosition
    spawnShelfRack(scene, structuredClone(shelfPosition), structuredClone(rotation));

    //Spawn shelf 2 at shelfPosition
    shelfPosition.y += 1.5;
    console.log(shelfPosition);
    spawnShelfRack(scene, structuredClone(shelfPosition), structuredClone(rotation));
}

function spawnShelfRack(scene, position, rotation){
    console.log(position);
    //Spawn shelf at shelfPosition
    const loader = new GLTFLoader();
    loader.load(shelf, function(gltf){
        scene.add(gltf.scene);
        gltf.scene.position.set(position.x, position.y, position.z);
        gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
        console.log(gltf.scene);
    });
}

function spawnShelves(scene, shelfCount){
    let position = {x: 0, y: 0.1, z: -9};
    let rotation = {x: 0, y: 0, z: 0};

    for (let i = 0; i < shelfCount; i++){
        
        // position.x += 10;
        //position.y += 10;
        // position.z += 10;
        spawnShelf(scene, structuredClone(position), structuredClone(rotation));
        position.x += 10;
        //position.y += 10;
        position.z += 10;

        // rotation.x += 0;
        // rotation.y += 45;
        // rotation.z += 0;
    }
}

export { spawnRoom, spawnShelves };