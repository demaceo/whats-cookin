// Browser/Node.js compatibility
let ingredientsData;
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment (tests)
  const ingredients = require('../data/ingredients');
  ingredientsData = ingredients.ingredientsData;
} else {
  // Browser environment - ingredientsData will be available as global variable
  // It will be set by the ingredients.js script loaded before this one
}

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
      instructionList.push(`Step ${instruction.number}: ${instruction.instruction}`)
    });
    return instructionList;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Recipe;
}
