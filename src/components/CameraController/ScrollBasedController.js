import * as THREE from 'three';
import gsap from 'gsap';

class ScrollBasedController {
    constructor(camera, document) {
        this.camera = camera;
        this.document = document;
        this.cameraPositions = [];
        this.cameraRotations = [];
        this.currentCameraPositionIndex = 0;
        this.initializeDocumentListeners();
    }

    //Add a camera position and rotation to the list
    //Called when a shelf is placed in the store
    addCameraPositionAndRotation(position, rotation) {
        this.cameraPositions.push(position);
        this.cameraRotations.push(rotation);
    }

    //Move to the next camera position
    nextCameraPosition() {
        if (this.currentCameraPositionIndex < this.cameraPositions.length - 1) {
            this.currentCameraPositionIndex++;
        }
        else {
            this.currentCameraPositionIndex = 0;
        }
        this.moveToCurrentCameraPositionAndRotation();
    }

    //Move to the previous camera position
    prevCameraPosition() {
        if (this.currentCameraPositionIndex > 0) {
            this.currentCameraPositionIndex--;
        }
        else {
            this.currentCameraPositionIndex = this.cameraPositions.length - 1;
        }
        this.moveToCurrentCameraPositionAndRotation();
    }

    //Move to the current camera position
    moveToCurrentCameraPositionAndRotation() {
        //Move the camera to the current camera position
        // Use gsap to animate the camera movement
        gsap.to(this.camera.position, {
            x: this.cameraPositions[this.currentCameraPositionIndex].x,
            y: this.cameraPositions[this.currentCameraPositionIndex].y,
            z: this.cameraPositions[this.currentCameraPositionIndex].z,
            duration: 1
        });
        gsap.to(this.camera.rotation, {
            x: this.cameraRotations[this.currentCameraPositionIndex].x,
            y: this.cameraRotations[this.currentCameraPositionIndex].y,
            z: this.cameraRotations[this.currentCameraPositionIndex].z,
            duration: 1
        });
    }

    initializeDocumentListeners() {
        //On Scroll Up, move to next camera position
        //On Scroll Down, move to previous camera position
        //This is currently commented out as other scrolling events are used

        // this.document.addEventListener('wheel', (event) => {
        //     if (event.deltaY < 0) {
        //         this.nextCameraPosition();
        //     }
        //     else {
        //         this.prevCameraPosition();
        //     }
        // });

        // On Arrow Up, move to next camera position
        // On Arrow Down, move to previous camera position
        this.document.addEventListener('keydown', (event) => {
            if (event.key === "ArrowUp") {
                this.nextCameraPosition();
            }
            else if (event.key === "ArrowDown") {
                this.prevCameraPosition();
            }
        });

        //On Arrow Left, move to previous camera position
        this.document.addEventListener('keydown', (event) => {
            if (event.key === "ArrowLeft") {
                this.prevCameraPosition();
            }
        });

        //On Arrow Right, move to next camera position
        this.document.addEventListener('keydown', (event) => {
            if (event.key === "ArrowRight") {
                console.log("Arrow Right");
                this.nextCameraPosition();
            }
        });
    }

    initAllCameraPositionsAndRotations(shelfGrid) {
        for (let i = 0; i < shelfGrid.shelfRows.length; i++) {
            let row = shelfGrid.shelfRows[i];
            for (let j = 0; j < row.shelves.length; j++) {
                let shelf = row.shelves[j];

                const OFFSET_DISTANCE_FROM_SHELF = 3;
                const HEIGHT_OFFSET = 1;
                let cameraPosition = {
                    "x": shelf.position.x,

                    "y": shelf.position.y + HEIGHT_OFFSET,

                    "z": shelf.rotation.y == 0 
                        ? shelf.position.z - OFFSET_DISTANCE_FROM_SHELF 
                        : shelf.position.z + OFFSET_DISTANCE_FROM_SHELF
                };

                let cameraRotation = {
                    "x": shelf.rotation.x,
                    "y": shelf.rotation.y == 0 ? Math.PI : 0,
                    "z": shelf.rotation.z
                };

                this.addCameraPositionAndRotation(cameraPosition, cameraRotation);
            }
        }
        console.log(this.cameraPositions);
    }
}

export default ScrollBasedController;