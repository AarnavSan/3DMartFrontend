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

    //Setup the store data
    // It creates a product category for each type of product
    // It basically reads off othe database and creates the productCategory objects
    // Then it stores them in the productCategories array for the grocery store
    setupStoreData() {
        for (let i = 0; i < this.store_data.length; i++) {
            let productCategory = this.store_data[i];
            this.productCategories.push(new ProductCategory(this, productCategory.type, productCategory.data));
        }
        //console.log(this.productCategories);
    }

    //Spawn the grocery store room
    // This handles loading the grocery store room model, as well as creating and spawning all the shelves
    // and products in the store
    create_room() {
        //Spawn Grocery Store Room model
        spawnRoom(this.scene);

        //Calculate how many rows of shelves to spawn based on the number of product categories
        //Each product category will have 1 row of shelves
        let shelfRowCount = this.productCategories.length;

        //Now we use the shelfGrid to keep a record of the shelves
        //Each shelfGrid will have a shelfRow
        this.shelfGrid = new ShelfGrid(shelfRowCount, this.productCategories);
        // console.log(this.shelfGrid);

        //Assign shelves their positions
        //Spawn first row of shelves on the left wall
        //Initial position based on designed 3D model
        const initialLeftMostPosition = { x: -5, y: 0.1, z: -9.9 };
        this.shelfGrid.setStartPosition(initialLeftMostPosition);

        //Spawn shelves
        this.shelfGrid.spawnShelfRows(this.scene, this.interactionManager);
    }

    //This function is responsible for adding a product to the cart
    addProductToCart(product, quantity) {
        this.cart.addProduct(product, quantity);
    }

    //This function is responsible for creating the view product window
    /**
     * Manages the product view window in the grocery store application.
     * This function creates and styles the product view window, including the close button,
     * and sets up event listeners for interactions such as closing the window, adding a product to the cart,
     * and updating the product view window with the selected product's details.
     * The product view window is displayed when a product is clicked in the store.
     * - Creates a close button for the product view window with hover effects.
     * - Creates the product view window with specific styles and appends it to the document body.
     * - Defines a function to update the product view window with the selected product's details.
     * - Defines a function to toggle the visibility of the product view window.
     * - Sets up event listeners for closing the window and adding a product to the cart.
     */
    manageViewProductWindow() {
        // Create the close button for the product view window
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
    
        // Add hover effects to the close button
        closeProductButton.addEventListener('mouseover', () => {
            closeProductButton.style.color = '#ff0000';
        });
        closeProductButton.addEventListener('mouseout', () => {
            closeProductButton.style.color = '#ff5c5c';
        });
    
        // Create the product view window
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
            backgroundColor: '#ffffff',
            borderRadius: '15px',
            boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)',
            border: '1px solid #eaeaea',
            padding: '20px',
            display: 'none',
            overflowY: 'auto',
            zIndex: '1000',
            fontFamily: '"Arial", sans-serif',
            textAlign: 'center',
        });
    
        // Append the close button to the product view window
        this.productWindow.appendChild(closeProductButton);
        this.document.body.appendChild(this.productWindow);
    
        // Function to update the product view window with the selected product's details
        const updateProductWindow = (product) => {
            let productHTML = `
                <h2 style="margin-bottom: 15px; font-size: 1.8rem; color: #333; font-weight: bold;">${product.name}</h2>
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: auto; object-fit: cover; border-radius: 12px; margin-bottom: 15px;">
                <p style="margin-bottom: 15px; font-size: 1.2rem; color: #666;">Price: <strong>$${product.price.toFixed(2)}</strong></p>
                <div style="margin-bottom: 20px;">
                    <label for="quantityInput" style="margin-right: 10px; font-size: 1rem; color: #555;">Quantity:</label>
                    <input type="number" id="quantityInput" name="quantity" min="1" value="1" style="width: 60px; padding: 8px; font-size: 1rem; border: 1px solid #ddd; border-radius: 8px;">
                </div>
                <button id="addToCartButton" style="padding: 12px 25px; background-color: #28a745; color: #fff; border: none; border-radius: 8px; font-size: 1rem; cursor: pointer; font-weight: bold; transition: background-color 0.3s, transform 0.2s;">
                    Add to Cart
                </button>
                <div style="margin-top: 30px;">
                    <h3 style="margin-bottom: 10px; font-size: 1.4rem; color: #444;">Nutrition Information</h3>
                    <div style="font-size: 1rem; color: #555; text-align: left;">
                        <p><strong>Calories:</strong> ${product.nutritionFacts.calories}</p>
                        <p><strong>Protein:</strong> ${product.nutritionFacts.protein}g</p>
                        <p><strong>Fat:</strong> ${product.nutritionFacts.fat}g</p>
                        <p><strong>Sodium:</strong> ${product.nutritionFacts.sodium}mg</p>
                        <p><strong>Fiber:</strong> ${product.nutritionFacts.fiber}g</p>
                        <p><strong>Carbs:</strong> ${product.nutritionFacts.carbs}g</p>
                        <p><strong>Sugars:</strong> ${product.nutritionFacts.sugars}g</p>
                        <p><strong>Potassium:</strong> ${product.nutritionFacts.potassium}mg</p>
                        <p><strong>Vitamins:</strong> ${product.nutritionFacts.vitamins}</p>
                        <p><strong>Minerals:</strong> ${product.nutritionFacts.minerals}</p>
                    </div>
                </div>
            `;
            this.productWindow.innerHTML = '';
            this.productWindow.insertAdjacentHTML('beforeend', productHTML);
            this.productWindow.appendChild(closeProductButton);
    
            // Add event listener to the "Add to Cart" button
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
    
            // Add hover effects to the "Add to Cart" button
            addToCartButton.addEventListener('mouseover', () => {
                addToCartButton.style.backgroundColor = '#218838';
            });
            addToCartButton.addEventListener('mouseout', () => {
                addToCartButton.style.backgroundColor = '#28a745';
            });
            addToCartButton.addEventListener('mousedown', () => {
                addToCartButton.style.transform = 'scale(0.95)';
            });
            addToCartButton.addEventListener('mouseup', () => {
                addToCartButton.style.transform = 'scale(1)';
            });
        };
    
        // Function to toggle the visibility of the product view window
        const toggleProductWindow = () => {
            if (this.isViewingProduct && this.productUnderView) {
                updateProductWindow(this.productUnderView);
                this.productWindow.style.display = 'block';
                this.cartWindow.style.display = 'none';
            } else {
                this.productWindow.style.display = 'none';
            }
        };
    
        // Add event listener to the close button to close the product view window
        closeProductButton.addEventListener('click', () => {
            this.isViewingProduct = false;
            toggleProductWindow();
        });
    
        // Assign the toggle function to the class instance
        this.toggleProductWindow = toggleProductWindow;
    }
    
    

    /**
     * Manages the shopping cart button and cart window.
     * 
     * This function creates and manages the shopping cart button and the cart window.
     * It handles the creation of the cart window, the close button, and the cart button.
     * It also updates the cart window with the current cart contents and toggles the visibility
     * of the cart window and cart button.
     *
     * The cart window is created with a fixed position on the right side of the screen.
     * It contains a header and a message indicating that the cart is empty. The close button
     * is positioned at the top-left corner of the cart window and changes color on hover.
     * The cart button is positioned at the top-right corner of the screen and changes color
     * and scale on hover and click.
     * 
     * The `updateCartWindow` function updates the cart window with the current cart contents,
     * including the product image, name, price, and quantity. It also displays the total number
     * of items and the total price.
     * 
     * The `toggleCartWindow` function toggles the visibility of the cart window based on the
     * `isCartOpen` property.
     * 
     * The `toggleCartButton` function toggles the visibility of the cart button based on the
     * `isCartOpen` property.
     * 
     * Event listeners are added to the close button and cart button to handle click events
     * and toggle the visibility of the cart window and cart button.
     */
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
    
        // Initial content for the cart window
        this.cartWindow.innerHTML = `
            <h2 style="margin-bottom: 20px; color: #333;">Shopping Cart</h2>
            <p style="color: #777;">Your cart is empty.</p>
        `;
    
        // Append the cart window to the document body
        this.document.body.appendChild(this.cartWindow);
    
        // Create the close button for the cart window
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
    
        // Add hover effects to the close button
        closeButton.addEventListener('mouseover', () => {
            closeButton.style.color = '#ff0000';
        });
        closeButton.addEventListener('mouseout', () => {
            closeButton.style.color = '#ff5c5c';
        });
    
        // Append the close button to the cart window
        this.cartWindow.appendChild(closeButton);
    
        // Function to update the cart window with the current cart contents
        const updateCartWindow = () => {
            const totalAmount = this.cart.totalAmount;
            const totalPrice = this.cart.totalPrice;
            const products = this.cart.products;
    
            let productsHTML = `
            <h2 style="margin-bottom: 20px; color: #333;">Shopping Cart</h2>
            `;
    
            // If there are products in the cart, display them
            if (products.length > 0) {
                products.forEach(product => {
                    productsHTML += `
                    <div data-product-id="${product.product_id}" style="margin-bottom: 15px; border-bottom: 1px solid #ddd; padding-bottom: 10px; display: flex; align-items: center;">
                        <img src="${product.image}" alt="${product.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px; margin-right: 10px;">
                        <div style="flex-grow: 1;">
                            <p style="margin: 5px 0; font-size: 1rem; color: #444;"><strong>${product.name}</strong></p>
                            <p style="margin: 5px 0; font-size: 0.9rem; color: #666;">Cost: $${product.price.toFixed(2)}</p>
                            <div style="display: flex; align-items: center; gap: 10px;">
                                <button class="minus-button" data-product-id="${product.product_id}" style="padding: 5px 10px; background-color: #f8d7da; border: none; border-radius: 5px; color: #721c24; cursor: pointer; font-size: 0.9rem;">-</button>
                                <span style="font-size: 1rem; color: #333;">${product.quantity}</span>
                                <button class="plus-button" data-product-id="${product.product_id}" style="padding: 5px 10px; background-color: #d4edda; border: none; border-radius: 5px; color: #155724; cursor: pointer; font-size: 0.9rem;">+</button>
                            </div>
                        </div>
                    </div>
                    `;
                });
    
                // Display total items and total price
                productsHTML += `
                    <p style="margin-top: 20px; font-size: 1rem; color: #444;">Total Items: <strong>${totalAmount}</strong></p>
                    <p style="margin-top: 5px; font-size: 1rem; color: #444;">Total Price: <strong>$${totalPrice.toFixed(2)}</strong></p>
                `;
            } else {
                // If the cart is empty, display a message
                productsHTML += `
                    <p style="color: #777;">Your cart is empty.</p>
                `;
            }
    
            // Update the cart window content
            this.cartWindow.innerHTML = productsHTML;
    
            // Add event listeners to plus and minus buttons
            const plusButtons = this.cartWindow.querySelectorAll('.plus-button');
            const minusButtons = this.cartWindow.querySelectorAll('.minus-button');
    
            plusButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-product-id');
                    const product = products.find(p => p.product_id === productId);
                    if (product) this.cart.addProduct(product);
                    updateCartWindow();
                });
            });
    
            minusButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const productId = button.getAttribute('data-product-id');
                    const product = products.find(p => p.product_id === productId);
                    if (product) {
                        // Remove the product's div if quantity becomes 0
                        if (product.quantity === 1) {
                            const productDiv = this.cartWindow.querySelector(`[data-product-id="${productId}"]`);
                            if (productDiv) {
                                productDiv.remove();
                            }
                        }
                        this.cart.removeProduct(product);
                        
                    }
                    updateCartWindow();
                });
            });
            
    
            // Ensure the close button is still present
            if (!this.cartWindow.contains(closeButton)) {
                this.cartWindow.appendChild(closeButton);
            }
        };
    
        // Function to toggle the visibility of the cart window
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
    
        // Add hover and click effects to the cart button
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
    
        // Append the cart button to the document body
        this.document.body.appendChild(cartButton);
    
        // Function to toggle the visibility of the cart button
        const toggleCartButton = () => {
            if (this.isCartOpen) {
                cartButton.style.display = 'none';
            } else {
                cartButton.style.display = 'block';
            }
            toggleCartWindow();
        };
    
        // Add event listener to the close button to close the cart window
        closeButton.addEventListener('click', () => {
            this.isCartOpen = false;
            toggleCartWindow();
            toggleCartButton();
        });
    
        // Add event listener to the cart button to open the cart window
        cartButton.addEventListener('click', () => {
            this.isCartOpen = true;
            toggleCartWindow();
            toggleCartButton();
        });
    
        // Assign the toggle function to the class instance
        this.toggleCartWindow = toggleCartWindow;
    }
    
    

    // Opens the product view window with the selected product's details
    openProductWindow(product) {
        this.isViewingProduct = true;
        this.productUnderView = product;
        this.toggleProductWindow();
    }

    // Initializes the product view window management
    manageProductWindow() {
        this.manageViewProductWindow();
    }
}