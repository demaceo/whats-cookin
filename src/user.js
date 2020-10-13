const Pantry = require("./pantry");
const ingredients = require('../data/ingredients');
const ingredientsData = ingredients.ingredientsData;

class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.pantry = new Pantry(user);
  };

  favoriteRecipe(recipe) {
    this.favoriteRecipes.unshift(recipe.id)
  };

  addItemToPantry(ingredient, quantity) {
    // ingredientsData.find(ingredient => {
    //     let item = {
    //       "id": ingredientsData.id || null,
    //       "name": ingredientsData.name || ingredient,
    //       "amount": ingredientsData.amount += quantity || quantity
    //     }
    //   }
    let item = {
      "name": ingredient,
      "amount": quantity
    };
    this.pantry.contents.unshift(item);
  };

  searchFavorites(recipe) {
    return this.favoriteRecipes.forEach(favorite => {
      favorite.find(recipe)
    })
  }

  searchRecipesToCook(recipe) {
    return this.recipesToCook
  }
};


module.exports = User;
