// -----------------QUERY SELECTORS-----------------:
const heroContainer = document.querySelector('.hero-container');
const navbarTitle = document.querySelector('.navbar-whats-cookin')
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
window.onload = loadRandomStaffPicks();
window.onload = loadRandomOthersCookin();
window.addEventListener("load", sortUserAccounts);
navbarTitle.addEventListener('click', displayHomePage);
userAccounts.addEventListener("click", determineUser);
profileList.addEventListener("click", displayUserSectionHandler);
main.addEventListener("click", clickHandler);
searchInput.addEventListener('click', extendSearchBar);
searchInput.addEventListener('keypress', searchInputHandler);
userSearchBar.addEventListener('keydown', searchUserRecipesHandler);
browseCategories.addEventListener('click', displayCategoryPage);
filterOption.addEventListener('click', filterToCookRecipes);
// -----------------FUNCTIONS-----------------:

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
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
  let uniqueArray = [];
  let duplicatesArray = [];
  uniqueArray.unshift(array[0])
  array.forEach(object => {
    uniqueArray[0].id !== object.id ? uniqueArray.unshift(object) : duplicatesArray.unshift(object);
  })
  console.log(uniqueArray);
  populateFilterRecipes(uniqueArray);
}


function matchRecipeToCookTags(mealTag) {
  let categoryResults = [];
  currentUser.recipesToCook.forEach(recipe => {
    recipe.tags.filter(tag => {
      if (mealTag.includes(tag)) {
        categoryResults.push(recipe)
      }
    })
  });
  removeUserDuplicates(categoryResults);
}


function filterToCookRecipes() {
  if (event.target.value.trim() === "Breakfast") {
    const breakfastTags = ["morning meal", "brunch", "breakfast"];
    matchRecipeToCookTags(breakfastTags);
  } else if (event.target.value.trim() === "Lunch") {
    const lunchTags = ["lunch", "brunch"];
    matchRecipeToCookTags(lunchTags);
  } else if (event.target.value.trim() === "Dinner") {
    const dinnerTags = ["dinner"];
    matchRecipeToCookTags(dinnerTags);
  } else if (event.target.value.trim() === "Appetizer") {
    const appetizerTags = ['appetizer', 'side dish', 'antipasti', 'starter', 'snack', 'antipasto', 'hor d\'oeuvre', 'condiment', 'dip', 'spread', 'sauce'];
    matchRecipeToCookTags(appetizerTags);
  } else if (event.target.value.trim() === "Salad") {
    const saladTags = ["salad"];
    matchRecipeToCookTags(saladTags);
  } else if (event.target.value.trim() === "Entrees") {
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
        <img class="staff-pick-img recipe-image" src=${result.image} id=${result.id}>
      </div>
      <div class='staff-pick-title-wrapper'>
        <svg class='star-icon--inactive icon' id=${result.id} src=${result.src}></svg>
        <h3 class="staff-pick-title">${result.name}</h3>
      </div>
    </div>
    `)
  })
}

// *---*---**---*---* SEARCH USER SAVED RECIPES FUNCTIONS *---*---**---*----*:
function searchUserRecipesHandler(e) {
  if (userSearchBar.value !== undefined && e.key === 'Enter') {
    if (navbarUserSection.innerText === ".toCook") {
      toCookView.classList.add('hidden');
      populateUserSearchResults(currentUser.searchRecipesToCook(event.target.value));
      removeUserSearchDuplicates(currentUser.searchToCookByIngredient(event.target.value));
    } else if (navbarUserSection.innerText === ".favorites") {
      favoritesView.classList.add('hidden');
      populateUserSearchResults(currentUser.searchFavorites(event.target.value));
      removeUserSearchDuplicates(currentUser.searchFavoritesByIngredient(event.target.value));
    }
  }
}

function removeUserSearchDuplicates(array) {
  let uniqueArray = [];
  let duplicatesArray = [];
  uniqueArray.unshift(array[0])
  array.forEach(object => {
    uniqueArray[0].id !== object.id ? uniqueArray.unshift(object) : duplicatesArray.unshift(object);
  })
  populateUserSearchResults(uniqueArray);
}

function populateUserSearchResults(searchResults) {
  userSearchView.classList.remove('hidden');
  userSearchView.innerHTML = "";
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
    `)
  })
}

// *---*---**---*---* SIDE NAV MENU FUNCTIONS *---*---**---*----*:
function openNav() {
  document.getElementById("sideNav").style.width = "300px";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}

function removeDuplicates(array) {
  let uniqueArray = [];
  let duplicatesArray = [];
  uniqueArray.unshift(array[0])
  array.forEach(object => {
    uniqueArray[0].id !== object.id ? uniqueArray.unshift(object) : duplicatesArray.unshift(object);
  })
  populateCategoryPage(uniqueArray);
}


function matchCategoryTags(category, mealTag) {
  let categoryResults = [];
  recipeData.forEach(recipe => {
    recipe.tags.filter(tag => {
      if (mealTag.includes(tag)) {
        categoryResults.push(recipe)
      }
    })
  })
  removeDuplicates(categoryResults);
}

function populateCategoryPage(recipeResults) {
  categoryView.innerHTML = '';
  recipeResults.forEach(result => {
    categoryView.insertAdjacentHTML('afterbegin', `
    <div class="staff-pick-block staff-pick" id=${result.id}>
      <div class='staff-pick-image-wrapper'>
        <img class="staff-pick-img recipe-image" src=${result.image} id=${result.id}>
      </div>
      <div class='staff-pick-title-wrapper'>
        <svg class="search-result-icon recipe-bookmark-icon--inactive sidebar-icon icon" id=${result.id}></svg>
        <span class='hidden'>${result.id}</span>
      </div>
      <h3 class="staff-pick-title">${result.name}</h3>
    </div>
    `)
  })
}

// *---*---**---*---* ICON BEHAVIOR *---*---**---*----*:
function addRemoveFavorite(event, addRecipe) {
  let recipeObject = recipeData.find(recipe => recipe.id.toString() === event.target.id.toString())
  addRecipe === true ? currentUser.addFavoriteRecipe(recipeObject) : currentUser.removeFromFavorites(recipeObject);
}

function addRemoveToCook(event, addRecipe) {
  let recipeObject = recipeData.find(recipe => recipe.id.toString() === event.target.nextElementSibling.innerText)
  console.log(event.target.nextElementSibling);
  addRecipe === true ? currentUser.addToRecipesToCook(recipeObject) : currentUser.removeFromToCook(recipeObject);
}

function iconHandler(event) {
  if (event.target.classList.contains('recipe-bookmark-icon--inactive')) {
    event.target.classList.replace('recipe-bookmark-icon--inactive', 'recipe-bookmark-icon--active')
    event.target.id === 'recipe-bookmark' ? event.target.classList.remove('recipe-view-bookmark-icon') : null;
    addRemoveToCook(event, true);
  } else if (event.target.classList.contains('recipe-bookmark-icon--active')) {
    event.target.classList.replace('recipe-bookmark-icon--active', 'recipe-bookmark-icon--inactive')
    event.target.id === 'recipe-bookmark' ? event.target.classList.add('recipe-view-bookmark-icon') : null;
    addRemoveToCook(event, false);
  } else if (event.target.classList.contains('star-icon')) {
    event.target.classList.replace('star-icon', 'star-icon--active')
    addRemoveFavorite(event, true);
  } else if (event.target.classList.contains('star-icon--active')) {
    event.target.classList.replace('star-icon--active', 'star-icon')
    addRemoveFavorite(event, false);
  }
}


// *---*---**---*---* HOME SECTION functions *---*---**---*----*:

function loadRandomStaffPicks() {
  document.querySelector('.staff-picks').innerHTML = "";
  recipeData.forEach((recipe, i) => {
    let randomRecipe = recipeData[getRandomIndex(recipeData)];
    if (i < 6) {
      document.querySelector('.staff-picks').insertAdjacentHTML('afterbegin', `
      <div class="staff-pick-block staff-pick-${i+1}">
        <div class='staff-pick-image-wrapper'>
          <img class="staff-pick-img ${i+1}-img recipe-image" src='${randomRecipe.image}' id='${randomRecipe.id}'>
        </div>
        <div class='staff-pick-title-wrapper'>
          <h3 class="staff-pick-title ${i+1}-title">${randomRecipe.name}</h3>
        </div>
      </div>
      `)
    }
  })
}

function loadRandomOthersCookin() {
  document.querySelector('.others-sidebar-card-container').innerHTML = "";
  usersData.forEach((user, i) => {
    let randomRecipe;
    let randomIndex = getRandomIndex(usersData);
    let randomUser = usersData[randomIndex];
    recipeData.forEach((recipe, i) => {
      let randomIndex = getRandomIndex(recipeData)
      randomRecipe = recipeData[randomIndex]
    })
    if (i < 8) {
      document.querySelector('.others-sidebar-card-container').insertAdjacentHTML('afterbegin', `
      <article class='others-sidebar-card'>
        <div class="others-sidebar-card-info-block">
          <img class="users-icon sidebar-icon" src='./assets/user-solid.svg'>
          <p>${randomUser.name.split(' ')[0]} ${randomUser.name.split(' ')[1].charAt(0)}.</p>
          <div class="others-sidebar-card-info-icons">
            <svg class="recipe-bookmark-icon--inactive sidebar-icon icon"></svg>
            <span class='hidden'>${randomRecipe.id}</span>
            <svg class="${indicateEnoughIngredients(randomRecipe)} sidebar-icon icon"></svg>
            <svg class="recipe-solid-cookie-icon--active sidebar-icon icon"><p id="others-score">${Math.round(Math.random()*500)}</p></svg>
          </div>
        </div>
        <div class="others-sidebar-image-block">
          <div class="others-sidebar-card-image-wrapper">
            <img class='others-sidebar-card-image recipe-image' src="${randomRecipe.image}" id='${randomRecipe.id}' alt="">
          </div>
          <p class='others-title'>${randomRecipe.name}</p>
        </div>
      </article>
      `)
    }
  })
}

function indicateEnoughIngredients(recipe) {
  if (currentUser) {
    return currentUser.pantry.enoughIngredients(recipe) ? 'recipe-basket-icon--active' : 'recipe-basket-icon--inactive';
  } else if (!currentUser) {
    return 'recipe-basket-icon--inactive'
  }
  return
}

function indicateEnoughIngredientsRecipeView(recipe) {
  document.querySelector('#recipe-basket').classList.remove('recipe-basket-icon--active');
  document.querySelector('#recipe-basket').classList.add('recipe-basket-icon--inactive');
  if (currentUser) {
    if (currentUser.pantry.enoughIngredients(recipe)) {
      document.querySelector('#recipe-basket').classList.add('recipe-basket-icon--active');
    } else {
      document.querySelector('#recipe-basket').classList.remove('recipe-basket-icon--active');
      document.querySelector('#recipe-basket').classList.add('recipe-basket-icon--inactive');
    }
  }
  return
}

// *---*---**---*---* USER SECTION functions *---*---**---*----*:

// *********      Sorting user drop down    **********
function sortUserAccounts() {
  let sortedUsersData = usersData.sort((a, b) => {
    return a.name > b.name ? -1 : 1
  });
  sortedUsersData.forEach(user => {
    userAccounts.insertAdjacentHTML('afterbegin', `
    <a href="#"><img class="dropdown-icons" src="./assets/user-solid.svg" alt="">
      ${user.name}</a>
    `)
  })
}

// *********      WHICH USER IS BEING CHOSEN    **********
function determineUser() {
  let userObject = usersData.find(user => user.name === event.target.innerText.trim() ? user : null);
  userObject !== null ? displayUserIcon(userObject) : null;
  currentUser = new User(userObject);
}

// *********      CHANGE USER NAME NAVBAR    **********
function displayUserName(user) {
  if (user) {
    navbarUserNameWrapper.classList.add('navbar-user-name-wrapper--active')
    navbarUserName.innerText = `${user.name.split(' ')[0]}`;
    homeView.classList.remove('hidden');
    recipeView.classList.add('hidden');
  } else {
    navbarUserNameWrapper.classList.remove('navbar-user-name-wrapper--active')
  }
}

function logOutUser() {
  userAccountsIcon.classList.remove("hidden");
  userProfileIcon.classList.add("hidden");
  userView.classList.add("hidden");
  homeView.classList.remove('hidden');
  displayUserName();
  navbarDisplayUserSection();
  loadRandomOthersCookin();
}

// *********     SWITCH CHOOSE USER TO USER ICON    **********
function displayUserIcon(user) {
  userAccountsIcon.classList.add("hidden");
  userProfileIcon.classList.remove("hidden");
  hideHero();
  loadRandomStaffPicks();
  loadRandomOthersCookin()
  displayUserName(user);
}

function navbarDisplayUserSection(section) {
  if (section === 'pantry') {
    navbarUserSectionWrapper.classList.add('navbar-user-section-wrapper--active')
    navbarUserSection.innerText = '.pantry';
  } else if (section === 'favorites') {
    navbarUserSectionWrapper.classList.add('navbar-user-section-wrapper--active')
    navbarUserSection.innerText = '.favorites';
  } else if (section === 'to cook') {
    navbarUserSectionWrapper.classList.add('navbar-user-section-wrapper--active')
    navbarUserSection.innerText = '.toCook';
  } else {
    navbarUserSectionWrapper.classList.remove('navbar-user-section-wrapper--active')
  }
}

// *============*============*SEARCH BAR FUNCTIONS*============*============*:
function extendSearchBar() {
  searchInput.classList.add('search-input--clicked');
}

function searchInputHandler(e) {
  if (searchInput.value !== undefined && e.key === 'Enter') {
    let searchEntry = searchInput.value;
    if (searchEntry.length !== 0) {
      displaySearchResults();
      searchView.innerHTML = "";
      gatherSearchResults(searchEntry);
      gatherMoreSearchResults(searchEntry);
    }
  }
}

function gatherSearchResults(searchInput) {
  let searchResults = [];
  let capitalizeInput = searchInput[0].toUpperCase() + searchInput.substring(1);
  recipeData.filter(recipe => {
    if (recipe.name.includes(capitalizeInput)) {
      return searchResults.push(recipe)
    }
  });
  populateSearchResults(searchResults);
}

function gatherMoreSearchResults(searchInput) {
  let searchResults = [];
  let lowerCaseInput = searchInput.toLowerCase();
  // let matchedIngredient;
  recipeData.forEach(recipe => {
    recipe.ingredients.filter(ingredient => {
      let ingredientName = translateIngredientNumberToName(ingredient.id)
      if (ingredientName.includes(lowerCaseInput)) {
        return searchResults.push(recipe)
      }
    });
  })
  populateSearchResults(searchResults);
}



function populateSearchResults(searchResults) {
  searchResults.forEach(searchResult => {
    searchView.insertAdjacentHTML('afterbegin', `
    <section class='search-result-container' id=${searchResult.id}>
    <img class="searched-recipe-image recipe-image" src=${searchResult.image} id='${searchResult.id}'>
      <div class='search-result'>
      <svg class="search-result-icon recipe-bookmark-icon--inactive sidebar-icon icon"></svg>
      <span class='hidden'>${searchResult.id}</span>
      <h2>${searchResult.name}</h2>
      </div>
    </section>
    `);
  })
}

function getMissingIngredient(recipeIngredient) {
  let missingIngredient;
  if (currentUser) {
    currentUser.pantry.enoughIngredients(clickedRecipe);
    missingIngredient = currentUser.pantry.missingIngredients.find(ingredient => ingredient.id === recipeIngredient.id)
  }
  return missingIngredient
}

function populateIngredientInformation() {
  clickedRecipe.ingredients.forEach(recipeIngredient => {
    let matchedIngredient = ingredientsData.find(ingredient => ingredient.id === recipeIngredient.id);
    let ingredientTotalCost = (recipeIngredient.quantity.amount * matchedIngredient.estimatedCostInCents) / 100;
    let missingIngredient = getMissingIngredient(recipeIngredient);
    document.querySelector('.ingredients-h2').insertAdjacentHTML('beforeend',
      `<p>${matchedIngredient.name}</p>
    `)
    document.querySelector('.amount-h2').insertAdjacentHTML('beforeend',
      `<p>${recipeIngredient.quantity.amount.toFixed(2)} ${recipeIngredient.quantity.unit}</p>
    `)
    document.querySelector('.cost-h2').insertAdjacentHTML('beforeend',
      `<p>$ ${ingredientTotalCost.toFixed(2)}</p>
    `)
    if (!missingIngredient) {
      return document.querySelector('.needed-h2').insertAdjacentHTML('beforeend',
        `<p style="color:green">&#10003;</p>
      `)
    } else if (missingIngredient) {
      return document.querySelector('.needed-h2').insertAdjacentHTML('beforeend',
        `<p style="color:red">${missingIngredient.quantity.amountMissing.toFixed(2)} ${missingIngredient.quantity.unit}</p>
      `)
    }
  })
}

function populateRecipeInstructions() {
  let instructions = clickedRecipe.getInstructions()
  instructions.forEach(instruction => {
    document.querySelector('.recipe-instructions-list').insertAdjacentHTML('afterbegin', `
    <p class="recipe-instructions recipe-instructions-step">${instruction}<br>
    `)
  })
}

// *---*---*DISPLAY RECIPE functions*---*----*:
function populateRecipeView() {
  clearRecipeViewData();
  document.querySelector('.recipe-img').src = `${clickedRecipe.image}`;
  document.querySelector('#recipe-count').innerText = `${Math.round(Math.random()*500)}`
  // document.querySelector('#recipe-bookmark').classList.add(isItBookmarked(clickedRecipe))
  isItBookmarked(clickedRecipe)
  document.querySelector('#recipe-id').innerText = `${clickedRecipe.id}`
  populateIngredientInformation();
  indicateEnoughIngredientsRecipeView(clickedRecipe);
  document.querySelector('.recipe-title').innerText = `${clickedRecipe.name}`
  document.querySelector('.recipe-details').innerText = `One of our most popular recipes, ${clickedRecipe.name} is a surprisingly versatile dish that ${document.querySelector('#recipe-count').innerText} of our users have been cookin'`
  populateRecipeInstructions();
}

function isItBookmarked(recipeToCheck) {
  let matchedRecipe;
  if (currentUser) {
    matchedRecipe = currentUser.recipesToCook.find(recipe => recipe.id === recipeToCheck.id);
  }
  if (matchedRecipe) {
    document.querySelector('#recipe-bookmark').classList.replace('recipe-view-bookmark-icon', 'recipe-bookmark-icon--active')
  } else {
    document.querySelector('#recipe-bookmark').classList.replace('recipe-bookmark-icon--active', 'recipe-view-bookmark-icon')
  }
}

function targetClickedRecipe() {
  let clickedRecipeImg = event.target.closest('.recipe-image');
  recipeData.forEach(recipe => {
    if (recipe.id === Number(clickedRecipeImg.id)) {
      clickedRecipe = new Recipe(recipe);
      populateRecipeView();
    }
  })
}

function clearRecipeViewData() {
  document.querySelector('.recipe-instructions-list').innerHTML = '';
  document.querySelector('.ingredients-h2').innerHTML = '';
  document.querySelector('.amount-h2').innerHTML = '';
  document.querySelector('.cost-h2').innerHTML = '';
  document.querySelector('.needed-h2').innerHTML = '';
}

// *============*============*FAVORITES SECTION FUNCTIONS*============*============*:

function populateFavorites() {
  favoritesView.innerHTML = "";
  currentUser.favoriteRecipes.forEach(favorite => {
    favoritesView.insertAdjacentHTML('afterbegin', `
    <div class="staff-pick-block staff-pick">
      <div class='staff-pick-image-wrapper'>
        <img class="staff-pick-img recipe-image" src='${favorite.image}' id='${favorite.id}'>
      </div>
      <div class='staff-pick-title-wrapper'>
        <svg class='star-icon--active icon' id=${favorite.id} src=${favorite.src}></svg>
        <h3 class="staff-pick-title">${favorite.name}</h3>
      </div>
    </div>
    `)
  })
}
// *============*============*RECIPES TO COOK SECTION FUNCTIONS*============*============*:
function populateRecipesToCook() {
  toCookView.innerHTML = '';
  currentUser.recipesToCook.forEach(recipeToCook => {
    toCookView.insertAdjacentHTML('afterbegin', `
    <div class="staff-pick-block staff-pick">
      <div class='staff-pick-image-wrapper'>
        <img class="staff-pick-img recipe-image" src='${recipeToCook.image}' id='${recipeToCook.id}'>
      </div>
      <div class='staff-pick-title-wrapper'>
        <svg class='star-icon search-result-icon icon' id=${recipeToCook.id}></svg>
        <svg class="search-result-icon recipe-bookmark-icon--active sidebar-icon icon"></svg>
        <span class='hidden'>${recipeToCook.id}</span>
        <h3 class="staff-pick-title">${recipeToCook.name}</h3>
      </div>
    </div>
    `)
  })
}

// ===================== PANTRY Section functions =====================:
function populatePantry() {
  pantryView.innerHTML = "";
  currentUser.pantry.contents.forEach(item => {
    let ingredientName = translateIngredientNumberToName(item.ingredient);
    if (typeof ingredientName === 'number') {
      ingredientName = item.name;
    }
    pantryView.insertAdjacentHTML('afterbegin', `
  <section class='pantry-item-block' id="${item.ingredient}">
    <div class="delete-item-container">
      <img class="delete pantry-icon" src="./assets/times-solid.svg">
    </div>
    <div class="pantry-item">
      <p>${ingredientName}</p>
      </div>
      <div class="item-quantity">
        <input class="item-amount-input" type="text" placeholder="${item.amount}">
      </div>
  </section>
    `)
  })
}



// *---*---*DISPLAY PAGE functions*---*----*:

function hideHero() {
  heroContainer.classList.add('hidden');
}

function displayHomePage() {
  recipeView.classList.add('hidden');
  heroContainer.classList.remove('hidden');
  homeView.classList.remove('hidden');
  userView.classList.add("hidden");
  searchView.classList.add('hidden');
  navbarDisplayUserSection()
}

function displaySearchResults() {
  hideHomePage();
  favoritesView.classList.add("hidden");
  userView.classList.add("hidden");
  categoryView.classList.add('hidden');
  recipeView.classList.add('hidden');
  searchView.classList.remove('hidden');
  navbarDisplayUserSection();
}

function displayRecipePage() {
  hideHomePage();
  userView.classList.add("hidden");
  searchView.classList.add('hidden');
  recipeView.classList.remove('hidden');
  navbarDisplayUserSection();
  targetClickedRecipe();
}

function displayRecipesToCook() {
  hideHomePage();
  userSearchView.classList.add('hidden');
  userView.classList.remove('hidden');
  toCookView.classList.remove("hidden");
  categoryView.classList.add('hidden');
  filterContentList.classList.remove('hidden');
  pantryView.classList.add("hidden");
  favoritesView.classList.add("hidden");
  recipeView.classList.add('hidden');
  searchView.classList.add('hidden');
  populateRecipesToCook();
}

function displayFavoriteRecipes() {
  userSearchView.classList.add('hidden');
  pantryView.classList.add("hidden");
  toCookView.classList.add("hidden");
  categoryView.classList.add('hidden');
  recipeView.classList.add('hidden');
  searchView.classList.add('hidden');
  filterContentList.classList.remove('hidden');
  favoritesView.classList.remove('hidden');
  populateFavorites();
}

function displayPantry() {
  favoritesView.classList.add("hidden");
  toCookView.classList.add("hidden");
  recipeView.classList.add('hidden');
  filterContentList.classList.add('hidden');
  searchView.classList.add('hidden');
  pantryView.classList.remove("hidden");
}

function hideHomePage() {
  searchInput.value = "";
  heroContainer.classList.add('hidden');
  homeView.classList.add('hidden');
  userView.classList.remove('hidden');
}

function displayUserPage(section) {
  hideHomePage();
  if (section === 'pantry') {
    displayPantry();
    navbarDisplayUserSection('pantry')
  } else if (section === 'favorites') {
    displayFavoriteRecipes();
    navbarDisplayUserSection('favorites')
  } else if (section === 'to cook') {
    displayRecipesToCook();
    navbarDisplayUserSection('to cook')
  } else if (section === 'logout') {
    logOutUser();
    currentUser = null;
  }
}

function displayCategoryPage() {
  hideHomePage();
  userView.classList.remove('hidden');
  categoryView.classList.remove('hidden');
  toCookView.classList.add("hidden");
  filterContentList.classList.add('hidden');
  pantryView.classList.add("hidden");
  favoritesView.classList.add("hidden");
  recipeView.classList.add('hidden');
  searchView.classList.add('hidden');
  sideNavClickHandler();
}
// *---*---*EVENT HANDLER functions*---*----*:
function clickHandler(event) {
  if (event.target.classList.contains('recipe-image')) {
    displayRecipePage();
  } else if (event.target.classList.contains('icon')) {
    currentUser ? iconHandler(event) : alert('Please sign in to save this recipe for later');
  }
  event.target !== searchInput ? searchInput.classList.remove('search-input--clicked') : null;
}

function displayUserSectionHandler(event) {
  if (event.target.innerText.trim() === "Recipes To Cook") {
    displayUserPage('to cook');
  } else if (event.target.innerText.trim() === "Favorited Recipes") {
    displayUserPage('favorites');
  } else if (event.target.innerText.trim() === "My Pantry") {
    displayUserPage('pantry');
    populatePantry();
  } else if (event.target.innerText.trim() === "Log Out") {
    displayUserPage('logout');
  }
}

function sideNavClickHandler() {
  if (event.target.innerText.trim() === "Breakfast") {
    const breakfastTags = ["morning meal", "brunch", "breakfast"];
    matchCategoryTags('breakfast', breakfastTags);
  } else if (event.target.innerText.trim() === "Lunch") {
    const lunchTags = ["lunch", "brunch"];
    matchCategoryTags('lunch', lunchTags);
  } else if (event.target.innerText.trim() === "Dinner") {
    const dinnerTags = ["dinner"];
    matchCategoryTags('dinner', dinnerTags);
  } else if (event.target.innerText.trim() === "Appetizers") {
    const appetizerTags = ['appetizer', 'side dish', 'antipasti', 'starter', 'snack', 'antipasto', 'hor d\'oeuvre', 'condiment', 'dip', 'spread', 'sauce'];
    matchCategoryTags('appetizer', appetizerTags);
  } else if (event.target.innerText.trim() === "Salads") {
    const saladTags = ["salad"];
    matchCategoryTags('salad', saladTags);
  } else if (event.target.innerText.trim() === "Entrees") {
    const entreeTags = ["main course", "main dish"];
    matchCategoryTags('entrees', entreeTags);
  }
}
