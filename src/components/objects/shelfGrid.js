import {ShelfRow} from './shelfRow.js';
import * as THREE from 'three';

export class ShelfGrid{

    constructor(totalProductCategories, productCategories){
        this.productCategories = productCategories;
        this.totalProductCategories = productCategories.length;
        this.shelfRows = this.createShelfRows(totalProductCategories);
        this.totalShelves = this.calculateRowShelfCount();
    }

    createShelfRows(numberOfShelfRows){
        let shelfRows = [];
        for(let i = 0; i < numberOfShelfRows; i++){
            let productCategory = this.productCategories[i];
            let products = productCategory.products;
            let shelfRow = new ShelfRow(productCategory, products);
            shelfRows.push(shelfRow);
        }
        return shelfRows;
    }

    calculateRowShelfCount(){
        let totalShelves = 0;
            for(let i = 0; i < this.shelfRows.length; i++){
                totalShelves += this.shelfRows[i].shelves.length;
            }
            return totalShelves;
    }

    setStartPosition(position){
        this.startPosition = position;
        this.assignAllPositionsAndRotationsToShelfRows();
    }

    assignAllPositionsAndRotationsToShelfRows(){
        //Take the initial position of the shelf grid
        let position = {...this.startPosition};

        //Set the position of each shelf row based on adding an offset to the initial position in the x direction
        //The initial offset is based on what looks aesthetically pleasing
        //and has enough space for the camera to look at it.
        const SHELF_ROW_OFFSET = 8;

        for(let i = 0; i < this.shelfRows.length; i++){
            let shelfRow = this.shelfRows[i];
            
            //Set the rotation of the shelf row
            //The rotation is based on the direction of the shelf row
            //Starting from the leftmost wall, the initial rotation is 180 degrees to face the correct direction
            //Then the shelves alternate rotation based on the intended direction of the shelf row
            shelfRow.setRotation({x: 0, y: i%2 == 0 ? Math.PI : 0, z: 0});

            //Set the position of the shelf row
            shelfRow.setStartPosition({...position});

            //Update the position for the next shelf row by adding the offset
            position.z += i%2 == 0? SHELF_ROW_OFFSET : 0;
        }
    }

    spawnShelfRows(scene, interactionManager){
        for(let i = 0; i < this.shelfRows.length; i++){
            let shelfRow = this.shelfRows[i];
            shelfRow.spawnAllShelves(scene, interactionManager);
        }
    }
}
