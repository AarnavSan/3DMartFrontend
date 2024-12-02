import { Product } from "./product";
import { checkoutCart } from "../data/databasemanager";

export class Cart{
    constructor(){
        this.products = [];
        this.totalAmount = 0;
        this.totalPrice = 0;
    }

    // Add a product to the cart
    addProduct(newProduct, quantity=1){

        //Check if this product already exists in the cart, so we can just increase the quantity
        let productExists = false;

        // Loop through all the products in the cart
        // And check if the product already exists
        this.products.forEach(existingProduct => {
            // If the product already exists, increase the quantity
            if(existingProduct.name === newProduct.name){
                // Increase the quantity of the product
                existingProduct.quantity += quantity;

                // Recalculate the total amount and cost of the cart
                this.recalculateAmountAndCost();
                productExists = true;
                return;
            }
        });

        if(productExists){
            return;
        }

        // If the product does not exist in the cart, add it
        let addedProduct = {...newProduct};
        addedProduct.quantity = quantity;
        this.products.push(addedProduct);
        this.recalculateAmountAndCost();
    }

    // Remove a product from the cart
    removeProduct(product){
        // Get the index of the product in the cart
        let index = this.products.indexOf(product);
        
        if(this.products[index].quantity == 1){
            this.products.splice(index, 1);
        }
        else{
            this.products[index].quantity -= 1;
        }
        this.recalculateAmountAndCost();
    }

    // Recalculate the total amount and cost of the cart
    recalculateAmountAndCost(){
        this.totalAmount = 0;
        this.totalPrice = 0;
        this.products.forEach(product => {
            this.totalAmount += product.quantity;
            this.totalPrice += product.price * product.quantity;
        });
    }

    checkoutCart(){
        // Checkout the cart
        // This is where you would implement the payment processing
        // For now, we will just log the cart data
        checkoutCart(this);
    }

}