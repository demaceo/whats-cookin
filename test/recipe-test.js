const chai = require('chai');
const expect = chai.expect;
const recipeTestData = require('../data/recipes');
const ingredients = require('../data/ingredients');
const ingredientsData = ingredients.ingredientsData;

const Recipe = require('../src/recipe');

describe('Recipe', function() {

  it('should be a function', function() {
    expect(Recipe).to.be.a('function');
  });

  it('should be an instance of Recipe', function() {
    const recipe = new Recipe(recipeTestData[0]);
    expect(recipe).to.be.an.instanceof(Recipe);
  });

  it('should have a name', function() {
    const recipe = new Recipe(recipeTestData[0]);

    expect(recipe.name).to.equal(recipeTestData[0].name);
  });

  it('should have an integer id', function() {
    const recipe = new Recipe(recipeTestData[0]);

    expect(recipe.id).to.equal(recipeTestData[0].id);
  });

  it('should have an image', function() {
    const recipe = new Recipe(recipeTestData[0]);

    expect(recipe.image).to.equal(recipeTestData[0].image);
  });

  it('should have ingredients', function() {
    const recipe = new Recipe(recipeTestData[0]);

    expect(recipe.ingredients.length).to.equal(11);
    expect(recipe.ingredients[0].quantity.amount).to.equal(1.5);
  });

  it('should have instructions with step numbers', function() {
    const recipe = new Recipe(recipeTestData[1]);

    expect(recipe.instructions.length).to.equal(6);
    expect(recipe.instructions[5].number).to.equal(6);
  });

  it('should have a category tags', function() {
    const recipe = new Recipe(recipeTestData[0]);

    expect(recipe.tags.length).to.equal(6);
    expect(recipe.tags[3]).to.equal('appetizer');
  });

  it('should be able to calculate the cost of the recipe', function() {
    const recipe = new Recipe(recipeTestData[0]);
    recipe.calculateCost();
    expect(recipe.calculateCost()).to.equal('$177.76');
  });

  it('should be able to get the instructions for the recipe', function() {
    const recipe = new Recipe(recipeTestData[1]);

    expect(recipe.getInstructions()[5]).to.equal('Step 6: Remove the pan from the oven and let sit for 10 minutes before removing onto a cooling rack.Top with ice cream and a drizzle of chocolate sauce.');
  });

});
