import database from './database.json';
import { Cart } from '../objects/cart';

function checkoutCart(cart) {
    // Checkout the cart
    // This is where you would implement the payment processing
    // For now, we will just log the cart data
    console.log("Checkout Cart");

    // Create the sale record to append
    const saleRecord = {
        timestamp: new Date().toISOString(), // Add a timestamp for the sale
        items: cart.products.map(product => ({
            product_id: product.product_id,
            name: product.name,
            quantity: product.quantity,
            price: product.price
        })),
        totalAmount: cart.totalAmount,
        totalPrice: cart.totalPrice
    };

    console.log("Sale record: ");
    console.log(saleRecord);

}

export { checkoutCart };