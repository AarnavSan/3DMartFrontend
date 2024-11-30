export class Product{

    constructor(name, type, price, quantity, nutrition, shelf_number = null){
        this.name = name;
        this.type = type;
        this.price = price;
        this.quantity = quantity;
        this.shelf_number = shelf_number;
        this.nutritionFacts = new NutritionFacts(nutrition.calories, nutrition.carbs, nutrition.fat, nutrition.fiber, nutrition.minerals, nutrition.potassium, nutrition.protein, nutrition.sodium, nutrition.sugars, nutrition.vitamins);
    }
    
    setupStoreData(){
        this.productCategories = this.store_data.map(item => Object.values(item)[0]);
        console.log(this.productCategories);
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