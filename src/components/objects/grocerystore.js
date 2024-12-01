import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {spawnRoom } from '../render_room.js';
import { spawnBoxProduct } from '../threedplacerfunctions/create_products.js';
import { Product } from './product.js';
import { ProductCategory } from './productCategory.js';
import { Cart } from './cart.js';
import { ShelfGrid } from './shelfGrid.js';

export class GroceryStore{

    constructor(scene, interactionManager, camera, renderer, store_data){
        this.scene = scene;
        this.camera = camera;
        this.interactionManager = interactionManager;
        this.renderer = renderer;
        this.store_data = store_data;
        this.productCategories = [];
        this.setupStoreData();
        this.cart = new Cart();
    }
    
    setupStoreData(){
        for(let i = 0; i < this.store_data.length; i++){
            let productCategory = this.store_data[i];
            this.productCategories.push(new ProductCategory(this, productCategory.type, productCategory.data));
        }
        console.log(this.productCategories);
    }

    create_room(){
        //Spawn Grocery Store Room model
        spawnRoom(this.scene);

        //Calculate how many rows of shelves to spawn based on the number of product categories
        //Each product category will have 1 row of shelves
        let shelfRowCount = this.productCategories.length;

        //Now we use the shelfGrid to keep a record of the shelves
        //Each shelfGrid will have a shelfRow
        this.shelfGrid = new ShelfGrid(shelfRowCount, this.productCategories);
        console.log(this.shelfGrid);

        //Assign shelves their positions
        //Spawn first row of shelves on the left wall
        //Initial position based on designed 3D model
        const initialLeftMostPosition = {x: -7, y: 0.1, z: -9.9};
        this.shelfGrid.setStartPosition(initialLeftMostPosition);

        //Spawn shelves
        this.shelfGrid.spawnShelfRows(this.scene, this.interactionManager);
    }

    assignAllPositionsAndRotations(){

    }
}