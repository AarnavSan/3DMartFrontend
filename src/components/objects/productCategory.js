import {Product} from './product.js';

export class ProductCategory{
    unpackProducts(products_data){
        let products = [];
        for(let i = 0; i < products_data.length; i++){
            let product = new Product(products_data[i].name, products_data[i].type, products_data[i].price, products_data[i].quantity, products_data[i].nutrition);
            products.push(product);
        }
        return products;
    }
    constructor(name, products_data, shelfRow = null){
        this.name = name;
        this.products = this.unpackProducts(products_data);
        this.totalProducts = this.products.length;
    }

    
}
