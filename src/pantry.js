class Pantry {
  constructor(user) {
    this.user = user.name;
    this.id = user.id;
    this.contents = user.pantry;
    this.missingIngredients;
    this.hasIngredients;
  }
  enoughIngredients(recipe) {
    this.missingIngredients = [];
    this.hasIngredients = [];

    recipe.ingredients.forEach(recipeIngredient => {
      let ingredientMatch = this.contents.find(pantryIngredient => pantryIngredient['ingredient'] === recipeIngredient.id);
      if (!ingredientMatch) {
        recipeIngredient.quantity.amountMissing = recipeIngredient.quantity.amount
        return this.missingIngredients.push(recipeIngredient);
      } else if (ingredientMatch.amount < recipeIngredient.quantity.amount) {
        recipeIngredient.quantity.amountMissing = recipeIngredient.quantity.amount - ingredientMatch.amount
        return this.missingIngredients.push(recipeIngredient);
      } else if (ingredientMatch.amount >= recipeIngredient.quantity.amount) {
        return this.hasIngredients.push(recipeIngredient);
      }
    });
    return this.hasIngredients.length === recipe.ingredients.length ? true : false;
  };
};

// module.exports = Pantry;
