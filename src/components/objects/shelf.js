import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import shelfWall from "../../public/assets/custom-models/Shelf Base Wall.glb";
import shelf from "../../public/assets/custom-models/Shelf.glb";
import { place_box_products, place_hitbox } from '../threedplacerfunctions/place_products';
import { int } from 'three/webgpu';

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

    spawnShelf(scene, interactionManager) {
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
        this.spawnShelfRack(scene, interactionManager, {...shelfPosition}, rotation);
        
        //Spawn shelf 2 at shelfPosition
        shelfPosition.y += 0.6;
        this.shelfPositions.push({...shelfPosition});
        this.spawnShelfRack(scene, interactionManager, {...shelfPosition}, rotation);
    
        //Spawn shelf 3 at shelfPosition
        shelfPosition.y += 0.6;
        this.shelfPositions.push({...shelfPosition});
        this.spawnShelfRack(scene, interactionManager, {...shelfPosition}, rotation);
        
        this.spawnProducts(scene, interactionManager);
        console.log(this);
    }

    spawnShelfRack(scene,interactionManager, position, rotation) {
        //Spawn shelf at shelfPosition
        const loader = new GLTFLoader();
        loader.load(shelf, function(gltf){
            scene.add(gltf.scene);
            gltf.scene.position.set(position.x, position.y, position.z);
            gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
        });
    }

    spawnProducts(scene, interactionManager) {
        //Spawn all products on the shelf
        console.log("Length of products: " + this.products.length);
        console.log(this.products);
        for (let i = 0; i < this.products.length; i++) {
            let product = this.products[i];
            let position = {...this.shelfPositions[i]};

            //Since the center of the shelf is at the center of the shelf wall
            //We need to offset the product to the left and forward (relative to shelf direction)
            //The offset is based on the width of the shelf
            const X_AXIS_OFFSET = 1.5;
            const Z_AXIS_OFFSET = 0.2;
            const Y_AXIS_OFFSET = 1.05;

            position.x -= X_AXIS_OFFSET;
            position.y += Y_AXIS_OFFSET;
            position.z += this.rotation.y == 0 ? -Z_AXIS_OFFSET : Z_AXIS_OFFSET;
            console.log("Hitbox for : " + product.name);
            place_hitbox(scene, position, this.rotation, interactionManager, product);
            this.spawnProduct(scene, product, position);
        }
    }

    spawnProduct(scene, product, position) {
        //Spawn product at given position
        
        console.log(product);
        place_box_products(scene, position, this.rotation, product);
    }
}
