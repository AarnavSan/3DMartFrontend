import { Shelf } from './shelf.js';
import * as THREE from 'three';

export class ShelfRow {

    constructor(productCategory, products) {
        this.productCategory = productCategory;
        this.products = products;
        this.shelves = this.createAllShelvesForRow();
    }


    createAllShelvesForRow() {
        //Create all shelf objects for this row
        let shelves = [];

        //Iterate through all products in the row
        for (let i = 0; i < this.products.length; i++) {
            //Each shelf will have 3 products
            //If there are less than 3 products, then the shelf will have less than 3 products
            let chosenProducts = [];
            for (let j = 0; i < this.products.length && j < 3; j++) {
                chosenProducts.push(this.products[i]);
                i++;
            }
            
            //If there are less than 3 products, then decrement i so that the next shelf can start with the remaining products
            i--;
            //Create the shelf object with chosen 3 products
            let shelf = new Shelf(this.productCategory, chosenProducts);

            //Add the shelf to the shelves array
            shelves.push(shelf);
        }
        console.log(shelves);
        return shelves
    }

    //Set the starting position of the shelf row
    setStartPosition(position) {
        this.startPosition = position;
        this.setAllShelvesPositionAndRotation();
    }

    //Set the rotation of the shelf row
    setRotation(rotation) {
        this.rotation = rotation;
    }

    setAllShelvesPositionAndRotation() {
        //Set the position and rotation of each shelf in the row
        //The position is based on the initial position of the shelf row
        //A constant offset is added
        const SHELF_OFFSET = 4.2;
        let position = this.startPosition;

        //Iterate through all shelves in the row
        //Set the position and rotation of each shelf
        for (let i = 0; i < this.shelves.length; i++) {
            //Set the position of the shelf
            let shelf = this.shelves[i];
            shelf.setPosition({ ...position });
            //Set the rotation of the shelf
            shelf.setRotation(this.rotation);
 
            //Update the position for the next shelf by adding the offset
            position.x += SHELF_OFFSET;
        }
    }

    spawnAllShelves(scene, interactionManager) {
        //Spawn all shelves in the row
        for (let i = 0; i < this.shelves.length; i++) {
            let shelf = this.shelves[i];
            shelf.spawnShelf(scene, interactionManager);
        }
    }
}
