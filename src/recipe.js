// const ingredients = require('../data/ingredients');
// const ingredientsData = ingredients.ingredientsData;

class Recipe {
  constructor(recipe) {
    this.name = recipe.name;
    this.id = recipe.id;
    this.image = recipe.image;
    this.ingredients = recipe.ingredients;
    this.instructions = recipe.instructions;
    this.tags = recipe.tags;
    this.timesCompleted = Math.round(Math.random() * 100)
  }
  calculateCost() {
    let total = 0;
    this.ingredients.forEach((recipeIngredient) => {
      ingredientsData.find(ingredient => {
        if (ingredient.id === recipeIngredient.id) {
          total += (ingredient.estimatedCostInCents * recipeIngredient.quantity.amount)
        }
      });
    })
    return `$${total/100}`;
  }

  getInstructions() {
    let instructionList = [];
    this.instructions.forEach(instruction => {
      instructionList.unshift(`Step ${instruction.number}: ${instruction.instruction}`)
    });
    return instructionList;
  }
}


// module.exports = Recipe;
