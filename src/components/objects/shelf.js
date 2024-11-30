import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import shelfWall from "../../public/assets/custom-models/Shelf Base Wall.glb";
import shelf from "../../public/assets/custom-models/Shelf.glb";
import { place_box_products } from '../threedplacerfunctions/place_products';

export class Shelf {

    constructor(productCategory, products) {
        this.productCategory = productCategory;
        this.products = products;
    }

    setPosition(position) {
        this.position = position;
    }
    setRotation(rotation) {
        this.rotation = rotation;
    }

    getProductFromPosition(position) {
        //Return the product at the given position
        //Calculate which product to be returned based on order of products and base position
    }

    spawnShelf(scene) {
        let position = this.position;
        let rotation = this.rotation;
        //SPAWN SHELF WALL
        //spawn Shelf wall based on given position and rotation
        const loader = new GLTFLoader();
        loader.load(shelfWall, function(gltf){
            
            scene.add(gltf.scene);
            gltf.scene.position.set(position.x, position.y, position.z);
            gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
        });
    

        //SPAWN SHELVES
        //Spawn 2 shelf based on given position and rotation
        // Create an offset based on the position of the shelf wall
        // So that the shelves are placed on the wall
        // At a certain height
        this.shelfPositions = [];

        let shelfPosition = {x: position.x, y: position.y - 1, z: position.z};
        this.shelfPositions.push({...shelfPosition});
        // console.log(shelfPosition);
        //Spawn shelf 1 at shelfPosition
        this.spawnShelfRack(scene, {...shelfPosition}, rotation);
    
        //Spawn shelf 2 at shelfPosition
        shelfPosition.y += 0.6;
        this.shelfPositions.push({...shelfPosition});
        this.spawnShelfRack(scene, {...shelfPosition}, rotation);
    
        //Spawn shelf 3 at shelfPosition
        shelfPosition.y += 0.4;
        this.shelfPositions.push({...shelfPosition});
        this.spawnShelfRack(scene, {...shelfPosition}, rotation);
    }

    spawnShelfRack(scene, position, rotation){
        //Spawn shelf at shelfPosition
        const loader = new GLTFLoader();
        loader.load(shelf, function(gltf){
            scene.add(gltf.scene);
            gltf.scene.position.set(position.x, position.y, position.z);
            gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
        });

        this.spawnProducts(scene);
    }

    spawnProducts(scene) {
        //Spawn all products on the shelf
        for (let i = 0; i < this.products.length; i++) {
            let product = this.products[i];
            let position = {...this.shelfPositions[i]};
            position.x -= 1.5;
            position.y += 1.1;
            position.z += this.rotation.y == 0 ? -0.2 : 0.2;
            this.spawnProduct(scene, product, position);
        }
    }

    spawnProduct(scene, product, position) {
        //Spawn product at given position
        place_box_products(scene, position, this.rotation, {x: 1, y: 1, z: 0.2}, 4, product);
    }
}
