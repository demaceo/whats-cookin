// Browser/Node.js compatibility
let Pantry, ingredientsData;
if (typeof module !== 'undefined' && module.exports) {
  // Node.js environment (tests)
  Pantry = require("./pantry");
  const ingredients = require('../data/ingredients');
  ingredientsData = ingredients.ingredientsData;
} else {
  // Browser environment - Pantry class and ingredientsData will be available as global variables
  // They will be set by the scripts loaded before this one
}

class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.completedRecipes = [];
    this.pantry = new Pantry(user);
  }

  removeFromFavorites(recipe) {
    if (this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.splice(this.favoriteRecipes.indexOf(recipe), 1)
    }
  }

  removeFromToCook(recipe) {
    if (this.recipesToCook.includes(recipe)) {
      this.recipesToCook.splice(this.recipesToCook.indexOf(recipe), 1)
    }
  }

  addFavoriteRecipe(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.unshift(recipe)
      let toCookFavoriteMatch = this.recipesToCook.find(recipeToCook => recipeToCook.name === recipe.name);
      this.recipesToCook.splice(this.recipesToCook.indexOf(toCookFavoriteMatch), 1);
    }
  }

  addToRecipesToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.unshift(recipe)
    }
  }

  addItemToPantry(ingredient, quantity) {
    let item = {
      "name": ingredient,
      "amount": quantity
    };
    this.pantry.contents.unshift(item);
  }

  searchFavoritesByIngredient(searchEntry) {
    let searchResults = [];
    let lowerCaseIngredient = searchEntry.toLowerCase();
    this.favoriteRecipes.forEach(recipe => {
      recipe.ingredients.filter(ingredient => {
        let ingredientName = this.translateIngredientNumberToName(ingredient.id)
        if(ingredientName.includes(lowerCaseIngredient)){
          return searchResults.push(recipe)
        }
      })
    });
    return searchResults
  }

  searchFavorites(searchEntry) {
    let searchResult = [];
    let capitalizeRecipe = searchEntry[0].toUpperCase() + searchEntry.substring(1);
    this.favoriteRecipes.filter(favoriteRecipe => {
      if (favoriteRecipe.name.includes(capitalizeRecipe)) {
        return searchResult.push(favoriteRecipe)
      }
    });
    return searchResult;
  }

  searchRecipesToCook(searchEntry) {
    let searchResult = [];
    let capitalizeRecipe = searchEntry[0].toUpperCase() + searchEntry.substring(1);
    this.recipesToCook.filter(recipeToCook => {
      if (recipeToCook.name.includes(capitalizeRecipe)) {
        return searchResult.push(recipeToCook)
      }
    });
    return searchResult;
  }

  searchToCookByIngredient(searchEntry) {
    let searchResults = [];
    let lowerCaseIngredient = searchEntry.toLowerCase();
    this.recipesToCook.forEach(recipe => {
      recipe.ingredients.filter(ingredient => {
        let ingredientName = this.translateIngredientNumberToName(ingredient.id)
        if(ingredientName.includes(lowerCaseIngredient)){
          return searchResults.push(recipe)
        }
      })
    });
    return searchResults
  }

  translateIngredientNumberToName(ingredientNumber) {
    const ingredientName = ingredientsData.find(ingredient => ingredient.id === ingredientNumber);
    if (ingredientName === undefined) {
      return ingredientNumber;
    } else {
      return ingredientName.name;
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = User;
}
