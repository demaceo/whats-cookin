// const user = require('../data/users');
// const userData = user.ingredientsData;

class Pantry {
  constructor(user) {
    this.user = user.name;
    this.id = user.id;
    this.contents = user.pantry;
  }
  enoughIngredients(recipe) {
    let missingIngredients = [];
    let hasIngredients = [];
    recipe.ingredients.forEach(recipeIngredient => {
      this.contents.forEach(pantryIngredient => {
        if (recipeIngredient.id === pantryIngredient['ingredient']) {
          hasIngredients.push(recipeIngredient);
        } else {
          missingIngredients.push(recipeIngredient);
        }
      });
    });

    //&& this.contents.amount >= recipeIngredient.quantity.amount
    // add ^ back in and make sure missingIngredients array is legit cause it's not

    if (hasIngredients.length !== recipe.ingredients.length) {
      console.log('false')
      return false;
    } else {
      console.log('true')
      return true;
    }
  };
};

module.exports = Pantry;

// total recipe ingredient
// recipeIngredient.ingredients.quantity.amount
// total pantry ingredient
// this.contents.amount
// recipe ingredient name = recipe.ingredients.id
// recipeIngredient.ingredients.id
// pantry ingredient name = this.contents.ingredient
// this.contents.ingredient
// pantry should have the recipe ingredient
// pantry should have >= recipe total ingredient



//&& this.contents.amount >= recipeIngredient.quantity.amount
  // enoughIngredients(recipe) {
  //   let missingIngredients = [];
  //   let hasIngredients = [];
  //   recipe.ingredients.forEach(recipeIngredient => {
  //
  //     // console.log(recipeIngredient.id)
  //
  //     this.contents.forEach(pantryIngredient => {
  //       // console.log(pantryIngredient['ingredient'])
  //       if (recipeIngredient.id === pantryIngredient['ingredient']) {
  //         // console.log('has ingredient')
  //         hasIngredients.push(recipeIngredient);
  //       } else {
  //         // console.log('missing ingredient')
  //         missingIngredients.push(recipeIngredient);
  //       }
  //     });
  //   });
  //   if (missingIngredients.length !== 0) {
  //     console.log('false')
  //     return false;
  //   } else {
  //     console.log('true')
  //     return true;
  //   }
  // };
