import * as THREE from 'three';
import { FirstPersonControls } from 'three/addons/controls/FirstPersonControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { spawnRoom } from '../render_room.js';
import { spawnBoxProduct } from '../threedplacerfunctions/create_products.js';
import { Product } from './product.js';
import { ProductCategory } from './productCategory.js';
import { Cart } from './cart.js';
import { ShelfGrid } from './shelfGrid.js';

export class GroceryStore {

    constructor(document, scene, interactionManager, camera, renderer, store_data) {
        this.document = document;
        this.scene = scene;
        this.camera = camera;
        this.interactionManager = interactionManager;
        this.renderer = renderer;
        this.store_data = store_data;
        this.productCategories = [];
        this.setupStoreData();
        this.manageCartButton();
        this.manageViewProductWindow();
        this.cart = new Cart();
        this.isCartOpen = false;
        this.isViewingProduct = false;
        this.productUnderView = null;
    }

    setupStoreData() {
        for (let i = 0; i < this.store_data.length; i++) {
            let productCategory = this.store_data[i];
            this.productCategories.push(new ProductCategory(this, productCategory.type, productCategory.data));
        }
        console.log(this.productCategories);
    }

    create_room() {
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
        const initialLeftMostPosition = { x: -7, y: 0.1, z: -9.9 };
        this.shelfGrid.setStartPosition(initialLeftMostPosition);

        //Spawn shelves
        this.shelfGrid.spawnShelfRows(this.scene, this.interactionManager);
    }

    assignAllPositionsAndRotations() {

    }

    manageViewProductWindow() {
        const closeProductButton = this.document.createElement('span');
        closeProductButton.innerHTML = '&times;';
        Object.assign(closeProductButton.style, {
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: '#ff5c5c',
            cursor: 'pointer',
            fontSize: '24px',
            fontWeight: 'bold',
            transition: 'color 0.3s',
        });
    
        closeProductButton.addEventListener('mouseover', () => {
            closeProductButton.style.color = '#ff0000';
        });
        closeProductButton.addEventListener('mouseout', () => {
            closeProductButton.style.color = '#ff5c5c';
        });
    
        this.productWindow = this.document.createElement('div');
        Object.assign(this.productWindow.style, {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '400px',
            maxWidth: '90%',
            height: 'auto',
            maxHeight: '80%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            border: '1px solid #ddd',
            padding: '20px',
            display: 'none',
            overflowY: 'auto',
            zIndex: '1000',
            fontFamily: '"Arial", sans-serif',
            textAlign: 'center',
        });
    
        this.productWindow.appendChild(closeProductButton);
        this.document.body.appendChild(this.productWindow);
    
        const updateProductWindow = (product) => {
            let productHTML = `
                <h2 style="margin-bottom: 15px; font-size: 1.5rem; color: #333;">${product.name}</h2>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto; object-fit: cover; border-radius: 8px; margin-bottom: 15px;">
                <p style="margin-bottom: 10px; font-size: 1rem; color: #555;">Price: <strong>$${product.price.toFixed(2)}</strong></p>
                <label for="quantityInput" style="margin-right: 10px; font-size: 0.9rem; color: #444;">Quantity:</label>
                <input type="number" id="quantityInput" name="quantity" min="1" value="1" style="width: 60px; padding: 5px; font-size: 0.9rem; border: 1px solid #ccc; border-radius: 5px; margin-bottom: 20px;">
                <br>
                <button id="addToCartButton" style="padding: 10px 20px; background-color: #28a745; color: #fff; border: none; border-radius: 5px; font-size: 1rem; cursor: pointer; transition: background-color 0.3s;">
                    Add to Cart
                </button>
            `;
            this.productWindow.innerHTML = '';
            this.productWindow.insertAdjacentHTML('beforeend', productHTML);
            this.productWindow.appendChild(closeProductButton);
    
            const addToCartButton = this.document.getElementById('addToCartButton');
            addToCartButton.addEventListener('click', () => {
                const quantity = parseInt(this.document.getElementById('quantityInput').value);
                if (quantity > 0) {
                    this.cart.addProduct(product, quantity);
                    this.isViewingProduct = false;
                    this.toggleProductWindow();
                    this.toggleCartWindow();
                }
            });
    
            addToCartButton.addEventListener('mouseover', () => {
                addToCartButton.style.backgroundColor = '#218838';
            });
            addToCartButton.addEventListener('mouseout', () => {
                addToCartButton.style.backgroundColor = '#28a745';
            });
        };
    
        const toggleProductWindow = () => {
            if (this.isViewingProduct && this.productUnderView) {
                updateProductWindow(this.productUnderView);
                this.productWindow.style.display = 'block';
                this.cartWindow.style.display = 'none';
            } else {
                this.productWindow.style.display = 'none';
            }
        };
    
        closeProductButton.addEventListener('click', () => {
            this.isViewingProduct = false;
            toggleProductWindow();
        });
    
        this.toggleProductWindow = toggleProductWindow;
    }
    

    manageCartButton() {
        // Create the cart window
        this.cartWindow = this.document.createElement('div');
        Object.assign(this.cartWindow.style, {
            position: 'absolute',
            top: '0',
            right: '0',
            width: '350px',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderLeft: '1px solid #ddd',
            padding: '20px',
            display: 'none',
            overflowY: 'auto',
            zIndex: '1000',
            fontFamily: '"Arial", sans-serif',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        });
    
        this.cartWindow.innerHTML = `
            <h2 style="margin-bottom: 20px; color: #333;">Shopping Cart</h2>
            <p style="color: #777;">Your cart is empty.</p>
        `;
    
        this.document.body.appendChild(this.cartWindow);
    
        // Create the close button
        const closeButton = this.document.createElement('span');
        closeButton.innerHTML = '&times;';
        Object.assign(closeButton.style, {
            position: 'absolute',
            top: '15px',
            left: '15px',
            color: '#ff5c5c',
            cursor: 'pointer',
            fontSize: '24px',
            fontWeight: 'bold',
            transition: 'color 0.3s',
        });
    
        closeButton.addEventListener('mouseover', () => {
            closeButton.style.color = '#ff0000';
        });
        closeButton.addEventListener('mouseout', () => {
            closeButton.style.color = '#ff5c5c';
        });
    
        this.cartWindow.appendChild(closeButton);
    
        const updateCartWindow = () => {
            const totalAmount = this.cart.totalAmount;
            const totalPrice = this.cart.totalPrice;
            const products = this.cart.products;
    
            let productsHTML = `
                <h2 style="margin-bottom: 20px; color: #333;">Shopping Cart</h2>
            `;
    
            if (products.length > 0) {
                products.forEach(product => {
                    productsHTML += `
                        <div style="margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px;">
                            <img src="${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 10px;">
                            <p style="margin: 5px 0; font-size: 1rem; color: #444;"><strong>${product.name}</strong></p>
                            <p style="margin: 5px 0; font-size: 0.9rem; color: #666;">Cost: $${product.price.toFixed(2)}</p>
                            <p style="margin: 5px 0; font-size: 0.9rem; color: #666;">Quantity: ${product.quantity}</p>
                        </div>
                    `;
                });
    
                productsHTML += `
                    <p style="margin-top: 20px; font-size: 1rem; color: #444;">Total Items: <strong>${totalAmount}</strong></p>
                    <p style="margin-top: 5px; font-size: 1rem; color: #444;">Total Price: <strong>$${totalPrice.toFixed(2)}</strong></p>
                `;
            } else {
                productsHTML += `
                    <p style="color: #777;">Your cart is empty.</p>
                `;
            }
    
            this.cartWindow.innerHTML = productsHTML;
    
            if (!this.cartWindow.contains(closeButton)) {
                this.cartWindow.appendChild(closeButton);
            }
        };
    
        const toggleCartWindow = () => {
            if (this.isCartOpen) {
                updateCartWindow();
                this.cartWindow.style.display = 'block';
            } else {
                this.cartWindow.style.display = 'none';
            }
        };
    
        // Create the cart button
        const cartButton = this.document.createElement('button');
        cartButton.innerHTML = '🛒';
        Object.assign(cartButton.style, {
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '60px',
            height: '60px',
            backgroundColor: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s, transform 0.2s',
        });
    
        cartButton.addEventListener('mouseover', () => {
            cartButton.style.backgroundColor = '#218838';
        });
        cartButton.addEventListener('mouseout', () => {
            cartButton.style.backgroundColor = '#28a745';
        });
        cartButton.addEventListener('mousedown', () => {
            cartButton.style.transform = 'scale(0.95)';
        });
        cartButton.addEventListener('mouseup', () => {
            cartButton.style.transform = 'scale(1)';
        });
    
        this.document.body.appendChild(cartButton);
    
        const toggleCartButton = () => {
            if (this.isCartOpen) {
                cartButton.style.display = 'none';
            } else {
                cartButton.style.display = 'block';
            }
            toggleCartWindow();
        };
    
        closeButton.addEventListener('click', () => {
            this.isCartOpen = false;
            toggleCartWindow();
            toggleCartButton();
        });
    
        cartButton.addEventListener('click', () => {
            this.isCartOpen = true;
            toggleCartWindow();
            toggleCartButton();
        });
    
        this.toggleCartWindow = toggleCartWindow;
    }
    

    openProductWindow(product) {
        this.isViewingProduct = true;
        this.productUnderView = product;
        this.toggleProductWindow();
        
    }

    manageProductWindow() {
        this.manageViewProductWindow();
    }
}