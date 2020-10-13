const ingredients = require('../data/ingredients');
const ingredientsData = ingredients.ingredientsData;

class Recipe {
  constructor(recipe) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
  };

  calculateCost() {
    let ingredientCost = 0;
    let total = 0;
    this.ingredients.forEach((recipeIngredient, i) => {
      ingredientsData.find(ingredient => {
        if (ingredient.id === recipeIngredient.id) {
          total += ingredient.estimatedCostInCents
        }
      });
    })
    return `$${total/100}`;
  };
};


module.exports = Recipe;
