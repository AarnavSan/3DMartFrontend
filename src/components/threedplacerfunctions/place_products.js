import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { spawnBoxProduct, spawnCylinderProduct, spawnHitBox } from './create_products.js';

function place_box_products(scene, position, rotation, product){
    //Spawn the products in the scene
    let productPosition = {x: position.x, y: position.y, z: position.z};
    let productRotation = {x: rotation.x, y: rotation.y, z: rotation.z};
    let productScale = {x: product.scale.x, y: product.scale.y, z: product.scale.z};

    //Size based offset is to increase the gap between the products based on the size of the product
    const SIZE_BASED_OFFSET = 1.8;
    //Row gap offset is to increase the gap between the rows of the product
    //The gap is based on the size of the product
    const ROW_GAP_OFFSET = 0.4 / (SIZE_BASED_OFFSET * product.rowsOfProduct);
    
    //Adjust the position of the product based on the scale/height of product
    productPosition.y += productScale.y/2;

    for(let i = 0; i < product.rowsOfProduct; i++){
        //Spawn the box products in the scene
        if(product.model_type === "box"){
            spawnBoxProduct(scene, productPosition, productRotation, productScale, product.image);
            //Increase the x position of the product to put a constant gap
            productPosition.x += (productScale.x) + ROW_GAP_OFFSET;
        }
        //Spawn the cylinder products in the scene
        if(product.model_type == "cylinder"){
            spawnCylinderProduct(scene, productPosition, productRotation, productScale, product.image);
            //Increase the x position of the product to put a constant gap
            productPosition.x += ((productScale.x) * 2) + ROW_GAP_OFFSET;
        }
        
    }
}

// place the hitbox to manage interactions with it
function place_hitbox(scene, position, rotation, interactionManager, product){
    spawnHitBox(scene, position, rotation, interactionManager, product);
}

export {place_box_products, place_hitbox};