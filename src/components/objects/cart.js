import { Product } from "./product";

export class Cart{
    constructor(){
        this.products = [];
        this.totalAmount = 0;
        this.totalCost = 0;
    }

    addProduct(newProduct){
        let productExists = false;
        console.log(this);
        this.products.forEach(existingProduct => {
            if(existingProduct.name === newProduct.name){
                existingProduct.quantity += 1;
                this.recalculateAmountAndCost();
                console.log('Product already exists in cart');
                productExists = true;
                return;
            }
        });

        if(productExists){
            return;
        }
        let addedProduct = {...newProduct};
        addedProduct.quantity = 1;
        this.products.push(addedProduct);
        this.recalculateAmountAndCost();
    }

    removeProduct(product){
        this.products = this.products.filter(item => item.product_id !== product.product_id);
        this.totalAmount -= 1;
        this.totalCost -= product.price;
    }

    recalculateAmountAndCost(){
        this.totalAmount = 0;
        this.totalCost = 0;
        this.products.forEach(product => {
            this.totalAmount += product.quantity;
            this.totalCost += product.price * product.quantity;
        });
    }
}