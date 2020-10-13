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
    user.favoriteRecipe(recipeTestData[0]);

    expect(user.favoriteRecipes[0]).to.equal(595736);
  });

  it('should be able to add an item to a users pantry', function() {
    const user = new User(userData[0]);
    user.addItemToPantry("poop", 2);

    expect(user.pantry.contents[0].name).to.equal("poop");
  });

});
