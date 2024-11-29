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

    spawnShelves(scene);
}

function spawnShelfRow(scene, startingPosition, rotation, directionOfShelves, shelfCount){
    let position = startingPosition;
    
    const shelfOffset = 4.2;

    for (let i = 0; i < shelfCount; i++)
    {
        spawnShelf(scene, structuredClone(position), structuredClone(rotation));
        position[directionOfShelves] += shelfOffset;
    }
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
    let shelfPosition = {x: position.x, y: position.y - 1, z: position.z};
    console.log(shelfPosition);

    //Spawn shelf 1 at shelfPosition
    spawnShelfRack(scene, structuredClone(shelfPosition), structuredClone(rotation));

    //Spawn shelf 2 at shelfPosition
    shelfPosition.y += 0.6;
    console.log(shelfPosition);
    spawnShelfRack(scene, structuredClone(shelfPosition), structuredClone(rotation));

    //Spawn shelf 2 at shelfPosition
    shelfPosition.y += 0.4;
    console.log(shelfPosition);
    spawnShelfRack(scene, structuredClone(shelfPosition), structuredClone(rotation));
}

function spawnShelfRack(scene, position, rotation){
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
    //Spawn first row of shelves on the left wall
    spawnShelfRow(scene, 
        {x: -7, y: 0.1, z: -9.9}, 
        {x: 0, y: -Math.PI, z: 0}, 
        'x', 
        4);

    //Spawn second and third row of shelves in the middle of the store
    spawnShelfRow(scene, 
        {x: -7, y: 0.1, z: 0}, 
        {x: 0, y: -Math.PI, z: 0}, 
        'x', 
        4);
    spawnShelfRow(scene, 
        {x: -7, y: 0.1, z: 0}, 
        {x: 0, y: 0, z: 0}, 
        'x', 
        4);

    //Spawn second and third row of shelves in the middle of the store
    spawnShelfRow(scene, 
        {x: 9, y: 0.1, z: -8}, 
        {x: 0, y: Math.PI/2, z: 0}, 
        'z', 
        8);
}

export { spawnRoom };