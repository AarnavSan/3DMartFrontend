import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import store from "../public/assets/custom-models/Grocery Store.glb";
import shelfWall from "../public/assets/custom-models/Shelf Base Wall.glb";
import shelf from "../public/assets/custom-models/Shelf.glb";

//This function spawns the room from the gltf file
//Originally meant to spawn all the objects, but then the utility of this function was 
// moved to threedplacerfunctions
function spawnRoom(scene){

    //Spawn Room from gltf
    const loader = new GLTFLoader();
    loader.load(store, function(gltf){
        scene.add(gltf.scene);
    });

}

export { spawnRoom };