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

    // Set the position and rotation of the shelf
    setPosition(position) {
        this.position = position;
    }
    setRotation(rotation) {
        this.rotation = rotation;
    }

    // Spawn the shelf in the scene
    spawnShelf(scene, interactionManager) {
        let position = this.position;
        let rotation = this.rotation;

        //SPAWN SHELF WALL
        //spawn Shelf wall based on given position and rotation
        // Spawn the shelf wall at the given position and rotation
        const loader = new GLTFLoader();
        loader.load(shelfWall, function(gltf){
            
            scene.add(gltf.scene);
            gltf.scene.position.set(position.x, position.y, position.z);
            gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
        });

        //SPAWN SHELVES
        //Spawn 3 shelves based on given position and rotation
        // Create an offset based on the position of the shelf wall
        // So that the shelves are placed on the wall
        // At a certain height
        this.shelfPositions = [];
        let shelfPosition = {x: position.x, y: position.y - 1, z: position.z};

        // Spawn 3 shelves in a loop
        for (let i = 0; i < 3; i++) {
            this.shelfPositions.push({...shelfPosition});
            this.spawnShelfRack(scene, interactionManager, {...shelfPosition}, rotation);
            shelfPosition.y += 0.6;
        }
        
        //SPAWN PRODUCTS
        this.spawnProducts(scene, interactionManager);
    }

    // Spawn the shelf rack in the scene
    spawnShelfRack(scene,interactionManager, position, rotation) {
        //Spawn shelf at shelfPosition
        const loader = new GLTFLoader();
        loader.load(shelf, function(gltf){
            scene.add(gltf.scene);
            gltf.scene.position.set(position.x, position.y, position.z);
            gltf.scene.rotation.set(rotation.x, rotation.y, rotation.z);
        });
    }

    // Spawn the products in the scene
    spawnProducts(scene, interactionManager) {
        //Spawn all products on the shelf
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
            place_hitbox(scene, position, this.rotation, interactionManager, product);
            this.spawnProduct(scene, product, position);
            this.spawnSproductTag(scene, position, product);
        }
    }

    spawnSproductTag(scene, position, product) {
        // Spawn product tag at given position
        // use three js Text geometry to create a 3d text
        // Add the text to the scene
        // Spawn the product name and price

        // Spawn a white rectangle with the product name and price
        // Add the rectangle to the scene
        // Add the product name and price to the rectangle
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 100;
    const context = canvas.getContext('2d');

    // Draw background
    context.fillStyle = 'white';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate font size based on product name length
    let fontSize = 48;
    if (product.name.length > 10) {
        fontSize = 48 - (product.name.length - 10) * 1.5;
        if (fontSize < 22) fontSize = 22; // Minimum font size
    }

    // Draw product name
    context.fillStyle = 'black';
    context.font = `bold ${fontSize}px Arial`;
    context.fillText(product.name, 10, 40);

    // Draw product price
    context.font = '30px Arial';
    context.fillText(`$${product.price.toFixed(2)}`, 10, 80);

    // Create texture and material
    const texture = new THREE.CanvasTexture(canvas);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const geometry = new THREE.PlaneGeometry(0.4, 0.1);
    const mesh = new THREE.Mesh(geometry, material);

    // Position and rotation of the mesh
    let meshPosition = {...position};
    let meshRotation = {...this.rotation};

    // Offset the position based on the rotation
    meshPosition.z += meshRotation.y == 0 ? -0.6 : 0.6;

    // Rotate the mesh based on the rotation of the shelf
    meshRotation.y = meshRotation.y == 0 ? Math.PI : 0;

    // Set the position and rotation of the mesh
    mesh.position.set(meshPosition.x, meshPosition.y, meshPosition.z);
    mesh.rotation.set(meshRotation.x, meshRotation.y, meshRotation.z);

    // Add the mesh to the scene
    scene.add(mesh);
    }

    spawnProduct(scene, product, position) {
        //Spawn product at given position
        place_box_products(scene, position, this.rotation, product);
    }
}
