import { Product } from "./product";

export class Cart{
    constructor(){
        this.products = [];
        this.totalAmount = 0;
        this.totalPrice = 0;
    }

    addProduct(newProduct, quantity=1){
        let productExists = false;
        console.log(this);
        this.products.forEach(existingProduct => {
            if(existingProduct.name === newProduct.name){
                existingProduct.quantity += quantity;
                this.recalculateAmountAndCost();
                productExists = true;
                return;
            }
        });

        if(productExists){
            return;
        }
        let addedProduct = {...newProduct};
        addedProduct.quantity = quantity;
        this.products.push(addedProduct);
        this.recalculateAmountAndCost();
    }

    removeProduct(product){
        this.products = this.products.filter(item => item.product_id !== product.product_id);
        this.totalAmount -= 1;
        this.totalPrice -= product.price;
    }

    recalculateAmountAndCost(){
        this.totalAmount = 0;
        this.totalPrice = 0;
        this.products.forEach(product => {
            this.totalAmount += product.quantity;
            this.totalPrice += product.price * product.quantity;
        });
        console.log(this.totalPrice);
    }
}