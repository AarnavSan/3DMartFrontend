import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { spawnBoxProduct } from './create_products.js';

function place_box_products(scene, position, rotation, boxScale, rowsOfProduct, product_data){
    let productPosition = {x: position.x, y: position.y, z: position.z};
    let productRotation = {x: rotation.x, y: rotation.y, z: rotation.z};
    let productScale = {x: boxScale.x, y: boxScale.y, z: boxScale.z};
    // let productImageFront = product_data.productImageFront;
    // let productImageSide = product_data.productImageSide;
    // let productImageBack = product_data.productImageBack;
    // let productImageTopAndBottom = product_data.productImageTopAndBottom;

    const SIZE_BASED_OFFSET = 2;
    
    
    productScale.x = boxScale.x * (SIZE_BASED_OFFSET/ rowsOfProduct);
    productScale.y = boxScale.y * (SIZE_BASED_OFFSET/ rowsOfProduct);
    productScale.y = boxScale.z * (SIZE_BASED_OFFSET/ rowsOfProduct);


    const ROW_OFFSET = 1;
    const COL_OFFSET = 1.2;

    for(let i = 0; i < rowsOfProduct; i++){
        // for(let j = 0; j < 3; j++){
        //     //spawnBoxProduct(scene, productPosition, productRotation, productScale, productImageFront, productImageSide, productImageBack, productImageTopAndBottom);
        //     spawnBoxProduct(scene, productPosition, productRotation, productScale);
        //     productPosition.x += COL_OFFSET;
        // }
        spawnBoxProduct(scene, productPosition, productRotation, productScale);
        // productPosition.x = position.x;
        productPosition.x += ROW_OFFSET;
    }
}

export {place_box_products};