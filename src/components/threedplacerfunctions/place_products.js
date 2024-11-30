import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { spawnBoxProduct, spawnCylinderProduct } from './create_products.js';

function place_box_products(scene, position, rotation, product){
    let productPosition = {x: position.x, y: position.y, z: position.z};
    let productRotation = {x: rotation.x, y: rotation.y, z: rotation.z};
    let productScale = {x: product.scale.x, y: product.scale.y, z: product.scale.z};
    // let productImageFront = product_data.productImageFront;
    // let productImageSide = product_data.productImageSide;
    // let productImageBack = product_data.productImageBack;
    // let productImageTopAndBottom = product_data.productImageTopAndBottom;

    const SIZE_BASED_OFFSET = 1.8;
    const ROW_GAP_OFFSET = 0.4 / (SIZE_BASED_OFFSET * product.rowsOfProduct);
    

    // productScale.x = product.scale.x * (SIZE_BASED_OFFSET/ product.rowsOfProduct);
    // productScale.y = product.scale.y * (SIZE_BASED_OFFSET/ product.rowsOfProduct);
    // productScale.z = product.scale.z * (SIZE_BASED_OFFSET/ product.rowsOfProduct);

    //Adjust the position of the product based on the scale/height of product
    productPosition.y += productScale.y/2;

    for(let i = 0; i < product.rowsOfProduct; i++){
        // for(let j = 0; j < 3; j++){
        //     //spawnBoxProduct(scene, productPosition, productRotation, productScale, productImageFront, productImageSide, productImageBack, productImageTopAndBottom);
        //     spawnBoxProduct(scene, productPosition, productRotation, productScale);
        //     productPosition.x += COL_OFFSET;
        // }
        if(product.model_type === "box"){
            spawnBoxProduct(scene, productPosition, productRotation, productScale, product.image);
            productPosition.x += (productScale.x) + ROW_GAP_OFFSET;
        }
        if(product.model_type == "cylinder"){
            spawnCylinderProduct(scene, productPosition, productRotation, productScale, product.image);
            productPosition.x += ((productScale.x) * 2) + ROW_GAP_OFFSET;
        }
        
        // productPosition.x = position.x;
        
    }
}

export {place_box_products};