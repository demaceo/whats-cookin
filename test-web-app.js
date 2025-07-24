// Test script to verify web app functionality
console.log('🧪 Testing What\'s Cookin\' Web App...');

// Check if data is loaded
if (typeof recipeData !== 'undefined' && recipeData.length > 0) {
  console.log('✅ Recipe data loaded:', recipeData.length, 'recipes');
} else {
  console.log('❌ Recipe data not loaded');
}

if (typeof usersData !== 'undefined' && usersData.length > 0) {
  console.log('✅ Users data loaded:', usersData.length, 'users');
} else {
  console.log('❌ Users data not loaded');
}

if (typeof ingredientsData !== 'undefined' && ingredientsData.length > 0) {
  console.log('✅ Ingredients data loaded:', ingredientsData.length, 'ingredients');
} else {
  console.log('❌ Ingredients data not loaded');
}

// Check if classes are available
if (typeof User !== 'undefined') {
  console.log('✅ User class loaded');
  
  // Test creating a user
  try {
    const testUser = new User(usersData[0]);
    console.log('✅ User creation works:', testUser.name);
    
    // Test adding a favorite recipe
    if (typeof Recipe !== 'undefined') {
      const testRecipe = new Recipe(recipeData[0]);
      testUser.addFavoriteRecipe(testRecipe);
      console.log('✅ Recipe favoriting works:', testUser.favoriteRecipes.length, 'favorites');
    }
  } catch (error) {
    console.log('❌ User functionality error:', error.message);
  }
} else {
  console.log('❌ User class not loaded');
}

if (typeof Recipe !== 'undefined') {
  console.log('✅ Recipe class loaded');
  
  try {
    const testRecipe = new Recipe(recipeData[0]);
    console.log('✅ Recipe creation works:', testRecipe.name);
    console.log('✅ Recipe cost calculation:', testRecipe.calculateCost());
  } catch (error) {
    console.log('❌ Recipe functionality error:', error.message);
  }
} else {
  console.log('❌ Recipe class not loaded');
}

if (typeof Pantry !== 'undefined') {
  console.log('✅ Pantry class loaded');
} else {
  console.log('❌ Pantry class not loaded');
}

// Check if DOM elements exist
const elementsToCheck = [
  '.navbar-whats-cookin',
  '.user-accounts',
  '.search-input',
  '.browse-categories'
];

elementsToCheck.forEach(selector => {
  const element = document.querySelector(selector);
  if (element) {
    console.log(`✅ DOM element found: ${selector}`);
  } else {
    console.log(`❌ DOM element missing: ${selector}`);
  }
});

console.log('🏁 Test complete!');
