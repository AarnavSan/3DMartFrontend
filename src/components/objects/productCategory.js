import {Product} from './product.js';

export class ProductCategory{
    
    constructor(parent, name, products_data, shelfRow = null){
        this.parent = parent;
        this.name = name;
        this.products = this.unpackProducts(products_data);
        this.totalProducts = this.products.length;
    }

    /**
     * Unpacks an array of product data objects into an array of Product instances.
     */
    unpackProducts(products_data){
        let products = [];
        for(let i = 0; i < products_data.length; i++){
            let product = new Product(
                this,
                products_data[i].name, 
                products_data[i].type, 
                products_data[i].price, 
                products_data[i].quantity, 
                products_data[i].nutrition, 
                products_data[i].shelf_number, 
                products_data[i].image,
                products_data[i].scale,
                products_data[i].model_type,
                products_data[i].rowsOfProduct
            );
            
            products.push(product);
        }
        return products;
    }

    // Open the view product window for this product in the grocery store
    addThisProductToCart(product){
        this.parent.addThisProductToCart(product, quantity);
    }

    openProductWindow(product){
        this.parent.openProductWindow(product);
    }
    
}
