// -----------------QUERY SELECTORS-----------------:
const heroContainer = document.querySelector('.hero-container');
const navbarTitle = document.querySelector('.navbar-whats-cookin');
const navbarUserNameWrapper = document.querySelector('.navbar-user-name-wrapper');
const navbarUserName = document.querySelector('.navbar-user-name');
const navbarUserSectionWrapper = document.querySelector('.navbar-user-section-wrapper');
const navbarUserSection = document.querySelector('.navbar-user-section');
const userAccounts = document.querySelector('.user-accounts');
const main = document.querySelector('main');
const homeView = document.querySelector('.home-view');
const recipeView = document.querySelector('.recipe-view');
const userView = document.querySelector('.main-user-body');
const toCookView = document.querySelector('.to-cook-view');
const favoritesView = document.querySelector('.favorites-view');
const pantryView = document.querySelector('.pantry-view');
const categoryView = document.querySelector('.category-view');
const userSearchView = document.querySelector('.user-search-view');
const searchInput = document.querySelector('.search-input');
const userAccountsIcon = document.querySelector('.accounts-icon');
const userProfileIcon = document.querySelector('.dropdown-header-icon');
const profileList = document.querySelector(".profile-list");
const filterContentList = document.querySelector('.user-filter-content');
const searchView = document.querySelector('.search-view');
const userSearchBar = document.querySelector('.saved-recipes-search');
const browseCategories = document.querySelector('.browse-categories');
const filterOption = document.querySelector('.user-filter-items');
const filterRecipeView = document.querySelector('.filter-recipe-view');

let currentUser;
let clickedRecipe;

// -----------------EVENT LISTENERS-----------------:
window.addEventListener("load", loadRandomStaffPicks);
window.addEventListener("load", loadRandomOthersCookin);
window.addEventListener("load", sortUserAccounts);
navbarTitle.addEventListener('click', displayHomePage);
userAccounts.addEventListener("click", determineUser);
profileList.addEventListener("click", displayUserSectionHandler);
main.addEventListener("click", clickHandler);
searchInput.addEventListener('click', extendSearchBar);
searchInput.addEventListener('keypress', searchInputHandler);
userSearchBar.addEventListener('keydown', searchUserRecipesHandler);
browseCategories.addEventListener('click', displayCategoryPage);
filterOption.addEventListener('change', filterToCookRecipes);

// -----------------FUNCTIONS-----------------:

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function translateIngredientNumberToName(ingredientNumber) {
  const ingredientName = ingredientsData.find(ingredient => ingredient.id === ingredientNumber);
  if (ingredientName === undefined) {
    return ingredientNumber;
  } else {
    return ingredientName.name;
  }
}

// *---*---**---*---* FILTER RECIPES FUNCTIONS *---*---**---*----*:
function removeUserDuplicates(array) {
  if (!array || array.length === 0) return;
  let uniqueArray = [];
  let duplicatesArray = [];
  uniqueArray.unshift(array[0]);
  array.forEach(object => {
    if (uniqueArray[0].id !== object.id) {
      uniqueArray.unshift(object);
    } else {
      duplicatesArray.unshift(object);
    }
  });
  console.log(uniqueArray);
  populateFilterRecipes(uniqueArray);
}

function matchRecipeToCookTags(mealTag) {
  let categoryResults = [];
  currentUser.recipesToCook.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (mealTag.includes(tag)) {
        categoryResults.push(recipe);
      }
    });
  });
  removeUserDuplicates(categoryResults);
}

function filterToCookRecipes(event) {
  const value = event.target.value.trim();
  if (value === "Breakfast") {
    const breakfastTags = ["morning meal", "brunch", "breakfast"];
    matchRecipeToCookTags(breakfastTags);
  } else if (value === "Lunch") {
    const lunchTags = ["lunch", "brunch"];
    matchRecipeToCookTags(lunchTags);
  } else if (value === "Dinner") {
    const dinnerTags = ["dinner"];
    matchRecipeToCookTags(dinnerTags);
  } else if (value === "Appetizer") {
    const appetizerTags = ['appetizer', 'side dish', 'antipasti', 'starter', 'snack', 'antipasto', 'hor d\'oeuvre', 'condiment', 'dip', 'spread', 'sauce'];
    matchRecipeToCookTags(appetizerTags);
  } else if (value === "Salad") {
    const saladTags = ["salad"];
    matchRecipeToCookTags(saladTags);
  } else if (value === "Entrees") {
    const entreeTags = ["main course", "main dish"];
    matchRecipeToCookTags(entreeTags);
  }
}

function populateFilterRecipes(filterTagResults) {
  toCookView.classList.add('hidden');
  filterRecipeView.classList.remove('hidden');
  filterRecipeView.innerHTML = " ";
  console.log(filterTagResults);
  filterTagResults.forEach(result => {
    console.log(result);
    filterRecipeView.insertAdjacentHTML('afterbegin', `
    <div class="staff-pick-block staff-pick">
      <div class='staff-pick-image-wrapper'>
        <img class="staff-pick-img recipe-image" src="${result.image}" id="${result.id}">
      </div>
      <div class='staff-pick-title-wrapper'>
        <svg class='star-icon--inactive icon' id="${result.id}" src="${result.src}"></svg>
        <h3 class="staff-pick-title">${result.name}</h3>
      </div>
    </div>
    `);
  });
}

// *---*---**---*---* SEARCH USER SAVED RECIPES FUNCTIONS *---*---**---*----*:
function searchUserRecipesHandler(e) {
  if (userSearchBar.value !== undefined && e.key === 'Enter') {
    if (navbarUserSection.innerText === ".toCook") {
      toCookView.classList.add('hidden');
      populateUserSearchResults(currentUser.searchRecipesToCook(e.target.value));
      removeUserSearchDuplicates(currentUser.searchToCookByIngredient(e.target.value));
    } else if (navbarUserSection.innerText === ".favorites") {
      favoritesView.classList.add('hidden');
      populateUserSearchResults(currentUser.searchFavorites(e.target.value));
      removeUserSearchDuplicates(currentUser.searchFavoritesByIngredient(e.target.value));
    }
  }
}

function removeUserSearchDuplicates(array) {
  if (!array || array.length === 0) return;
  let uniqueArray = [];
  let duplicatesArray = [];
  uniqueArray.unshift(array[0]);
  array.forEach(object => {
    if (uniqueArray[0].id !== object.id) {
      uniqueArray.unshift(object);
    } else {
      duplicatesArray.unshift(object);
    }
  });
  populateUserSearchResults(uniqueArray);
}

function populateUserSearchResults(searchResults) {
  userSearchView.classList.remove('hidden');
  userSearchView.innerHTML = '';
  searchResults.forEach(result => {
    userSearchView.insertAdjacentHTML('afterbegin', `
    <div class="staff-pick-block staff-pick">
      <div class='staff-pick-image-wrapper'>
        <img class="staff-pick-img recipe-image" src='${result.image}' id='${result.id}'>
      </div>
      <div class='staff-pick-title-wrapper'>
        <svg class='star-icon--inactive icon' id=${result.id} src=${result.src}></svg>
        <h3 class="staff-pick-title">${result.name}</h3>
      </div>
    </div>
    `);
  });
}

// *---*---**---*---* SIDE NAV MENU FUNCTIONS *---*---**---*----*:
function openNav() {
  document.getElementById("sideNav").style.width = "300px";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}

function removeDuplicates(array) {
  if (!array || array.length === 0) return;
  let uniqueArray = [];
  let duplicatesArray = [];
  uniqueArray.unshift(array[0]);
  array.forEach(object => {
    if (uniqueArray[0].id !== object.id) {
      uniqueArray.unshift(object);
    } else {
      duplicatesArray.unshift(object);
    }
  });
  populateCategoryPage(uniqueArray);
}

function matchCategoryTags(category, mealTag) {
  let categoryResults = [];
  recipeData.forEach(recipe => {
    recipe.tags.forEach(tag => {
      if (mealTag.includes(tag)) {
        categoryResults.push(recipe);
      }
    });
  });
  removeDuplicates(categoryResults);
}

// REST OF THE FUNCTIONS... (I'll continue this in the next part)
