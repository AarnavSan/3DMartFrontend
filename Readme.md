# 3D Grocery Store 

## Project Description

### Why a 3D Grocery Store?

#### Cultural Significance
Grocery stores are an integral part of cultures worldwide. Creating a 3D grocery store, even if currently only interactable through the web, opens the possibility for further development into VR. In VR, users could "walk" through the store and shop as they would in a traditional grocery store.

#### Coding for It
I am passionate about transforming real-life walk-through experiences, such as museums and shopping centers, into 3D environments, especially on the web. Having previously created a virtual museum, I wanted to challenge myself by creating a grocery store this time.

## How to Run

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/your-repository-name.git
    ```

2. Change directory into the project folder:
    ```sh
    cd GroceryStore
    ```

3. Install the node modules:
    ```sh
    npm install
    ```

4. Build the files:
    ```sh
    npm run build
    ```

5. Run the Express.js server:
    ```sh
    node express.js
    ```

6. Open the localhost it is hosted at (default on port 3000).

## How to Add or Change a Product

1. Open the following file in a text editor:
    ```sh
    src/components/data/database.json
    ```

2. To add a new product category, you need two keys: `type` and `data`. `type` is the name of the product category, and `data` is an array of products. Each product should have the following attributes: `name`, `type` (brand), `nutrition`, `price`, `quantity`, `image`, `model_type` (box or cylinder types supported for now), `scale` (a 3D scale), and `rowsOfProduct` (to show that certain products are getting sold more than others).

Here's an example of a product category:
    ```
    json
    {
        "type": "breakfast_cereals",
        "data": [
            {
                "name": "Lucky Charms",
                "type": "General Mills",
                "nutrition": {
                    "calories": 110,
                    "protein": 2,
                    "fat": 1,
                    "sodium": 180,
                    "fiber": 0,
                    "carbs": 10,
                    "sugars": 10,
                    "potassium": 45,
                    "vitamins": "A, C, D, E, B6, B12",
                    "minerals": "Iron, Zinc, Calcium"
                }
            }
        ]
    }
    ```
