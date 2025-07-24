const chai = require('chai');
const expect = chai.expect;
const recipeTestData = require('../data/recipes');
const users = require('../data/users');
const userData = users.usersData;

const Pantry = require("../src/pantry");
const User = require('../src/user');

describe('User', function() {

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', function() {
    const user = new User(userData[0]);
    expect(user).to.be.an.instanceof(User);
  });

  it('should have an instance of Pantry', function() {
    const user = new User(userData[0]);
    expect(user.pantry).to.be.an.instanceof(Pantry);
  });

  it('should have a name', function() {
    const user = new User(userData[0]);

    expect(user.name).to.equal(userData[0].name);
  });

  it('should have an integer id', function() {
    const user = new User(userData[0]);

    expect(user.id).to.equal(userData[0].id);
  });

  it('should be able to add a recipe to a users favorite recipes', function() {
    const user = new User(userData[0]);
    user.addFavoriteRecipe(recipeTestData[0]);

    expect(user.favoriteRecipes[0]).to.equal(recipeTestData[0]);
  });

  it('should be able to add an item to a users pantry', function() {
    const user = new User(userData[0]);
    user.addItemToPantry("poop", 2);

    expect(user.pantry.contents[0].name).to.equal("poop");
  });

  it('should be able to search for a user/s favorite recipe', function() {
    const user = new User(userData[0]);

    user.addFavoriteRecipe(recipeTestData[0]);
    user.addFavoriteRecipe(recipeTestData[1]);

    const searchResult = user.searchFavorites("cookie");

    expect(searchResult.length).to.equal(1);
  });

  it('should be able to search for a user/s list of recipes to cook', function() {
    const user = new User(userData[0]);

    user.addToRecipesToCook(recipeTestData[0]);
    user.addToRecipesToCook(recipeTestData[1]);
    user.addToRecipesToCook(recipeTestData[2]);

    const result = user.searchRecipesToCook("cookie");

    expect(result.length).to.equal(1);
  });

  it('should be able to search for a user/s favorite recipes by ingredient', function() {
    const user = new User(userData[0]);

    user.addFavoriteRecipe(recipeTestData[0]);
    user.addFavoriteRecipe(recipeTestData[1]);

    const searchResult = user.searchFavoritesByIngredient("wheat flour");
    expect(searchResult.length).to.equal(2);
    expect(searchResult[0].ingredients[0].id).to.equal(20081);

  });
});
