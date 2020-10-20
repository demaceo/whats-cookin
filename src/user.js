// const Pantry = require("./pantry");
// const ingredients = require('../data/ingredients');
// const ingredientsData = ingredients.ingredientsData;

class User {
  constructor(user) {
    this.name = user.name;
    this.id = user.id;
    this.favoriteRecipes = [];
    this.recipesToCook = [];
    this.completedRecipes = [];
    this.pantry = new Pantry(user);
  };

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

  favoriteRecipe(recipe) {
    if (!this.favoriteRecipes.includes(recipe)) {
      this.favoriteRecipes.unshift(recipe)
    }
  };

  addToRecipesToCook(recipe) {
    if (!this.recipesToCook.includes(recipe)) {
      this.recipesToCook.unshift(recipe)
    }
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

  searchFavoritesByIngredient(searchEntry) {

    let searchResults = [];
    const ingredientObject = ingredientsData.find(ingredient => ingredient.name === searchEntry)
    this.favoriteRecipes.forEach(recipe => {
      recipe.ingredients.forEach(ingredient => {
        if (ingredient.id === ingredientObject.id) {
          return searchResults.push(recipe)
        }
      })
    })
    return searchResults
  };

  searchFavorites(searchEntry) {
    let searchResult = [];
    let capitalizeRecipe = searchEntry[0].toUpperCase() + searchEntry.substring(1);
    this.favoriteRecipes.filter(favoriteRecipe => {
      if (favoriteRecipe.name.includes(capitalizeRecipe)) {
        return searchResult.push(favoriteRecipe)
      }
    });
    return searchResult;
  };
  // need to include `|| favorite.recipe.ingredient === recipe`
  // but be able to take that id of ingredient and place it to a name.
  //should we use .includes or a === for the IF statement
  //change parameter name to "searchEntry"

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
};


// module.exports = User;
