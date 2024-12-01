import { v4 as uuidv4 } from 'uuid';


export class Product{

    constructor(parent, name, type, price, quantity, nutrition, shelf_number = null, image = null, scale = null, model_type = null, rowsOfProduct = 4){
        this.parent = parent;
        this.product_id = uuidv4();
        this.name = name;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
        this.model_type = model_type;
        this.scale = scale;
        this.image = image;
        this.shelf_number = shelf_number;
        this.rowsOfProduct = rowsOfProduct;
        this.nutritionFacts = new NutritionFacts(nutrition.calories, nutrition.carbs, nutrition.fat, nutrition.fiber, nutrition.minerals, nutrition.potassium, nutrition.protein, nutrition.sodium, nutrition.sugars, nutrition.vitamins);
    }
    
    viewThisProduct(){
        let newProduct = {...this};
        newProduct.quantity = 1;
        this.parent.parent.openProductWindow(newProduct);
    }

    addThisProductToCart(quantity=1){
        this.parent.parent.cart.addProduct(this, quantity);
    }
}

class NutritionFacts{
    constructor(calories, carbs, fat, fiber, minerals, potassium, protein, sodium, sugars, vitamins){
        this.calories = calories;
        this.carbs = carbs;
        this.fat = fat;
        this.fiber = fiber;
        this.minerals = minerals;
        this.potassium = potassium;
        this.protein = protein;
        this.sodium = sodium;
        this.sugars = sugars;
        this.vitamins = vitamins;
        }

        get nutritionFacts() {
            return {
                calories: this.calories,
                carbs: this.carbs,
                fat: this.fat,
                fiber: this.fiber,
                minerals: this.minerals,
                potassium: this.potassium,
                protein: this.protein,
                sodium: this.sodium,
                sugars: this.sugars,
                vitamins: this.vitamins
            };
        }
}