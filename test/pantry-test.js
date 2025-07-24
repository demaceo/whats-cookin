const chai = require('chai');
const expect = chai.expect;
const recipeTestData = require('../data/recipes');
const users = require('../data/users');
const userData = users.usersData;
const easyRecipe = require('../data/easy-recipe');

const Recipe = require('../src/recipe');
const Pantry = require('../src/pantry');

describe('Pantry', function() {

  it('should be a function', function() {
    expect(Pantry).to.be.a('function');
  });

  it('should be an instance of Pantry', function() {
    const pantry = new Pantry(userData[0]);
    expect(pantry).to.be.an.instanceof(Pantry);
  });

  it('should have a user', function() {
    const pantry = new Pantry(userData[0]);

    expect(pantry.user).to.equal(userData[0].name);
  });

  it('should have an integer id', function() {
    const pantry = new Pantry(userData[0]);

    expect(pantry.id).to.equal(userData[0].id);
  });

  it('should have contents', function() {
    const pantry = new Pantry(userData[0]);

    expect(pantry.contents).to.equal(userData[0].pantry);
  });

  it('should tell if enough ingredients to make a recipe', function() {
    const pantry = new Pantry(userData[0]);
    const cookies = recipeTestData[0];
    const easy = easyRecipe[0];

    expect(pantry.enoughIngredients(cookies)).to.equal(false);
    expect(pantry.enoughIngredients(easy)).to.equal(true);
  });

  it('should tell what and how much ingredient is missing', function() {
    const pantry = new Pantry(userData[0]);
    const cookies = recipeTestData[0];

    pantry.enoughIngredients(cookies)

    expect(pantry.missingIngredients.length).to.equal(3);
    expect(pantry.missingIngredients[0].quantity.amountMissing).to.equal(0.5);
  });
});
