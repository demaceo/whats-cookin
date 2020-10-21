// -----------------QUERY SELECTORS-----------------:
const heroContainer = document.querySelector('.hero-container');
const navbarTitle = document.querySelector('.navbar-whats-cookin')
const navbarUserNameWrapper = document.querySelector('.navbar-user-name-wrapper');
const navbarUserName = document.querySelector('.navbar-user-name');
const navbarUserSectionWrapper = document.querySelector('.navbar-user-section-wrapper');
const navbarUserSection = document.querySelector('.navbar-user-section');
const navbar = document.querySelector('.navbar');

const userAccounts = document.querySelector('.user-accounts');

const main = document.querySelector('main');
const homeView = document.querySelector('.home-view');
const recipeView = document.querySelector('.recipe-view');
const userView = document.querySelector('.main-user-body');
const toCookView = document.querySelector('.to-cook-view');
const favoritesView = document.querySelector('.favorites-view');
const pantryView = document.querySelector('.pantry-view');

const recipeImage = document.querySelector('.recipe-image');
const searchInput = document.querySelector('.search-input');

const userAccountsIcon = document.querySelector('.accounts-icon');
const userProfileIcon = document.querySelector('.dropdown-header-icon');
const profileList = document.querySelector(".profile-list");

const profileRecipesToCook = document.querySelector('#profile-dropdown-recipes-to-cook')
const profileFavoriteRecipes = document.querySelector('#profile-dropdown-favorite-recipes')
const profilePantry = document.querySelector('#profile-dropdown-pantry')
const profileLogOut = document.querySelector('#profile-dropdown-log-out')

const headerIcon = document.querySelector('.dropdown-content');
const cookieIcon = document.querySelector('.solid-cookie-icon');
const bookmarkIcon = document.querySelector('.bookmark-icon');

const plusIcon = document.querySelector('.plus');
const minusIcon = document.querySelector('.minus');
const pantryIcon = document.querySelector('.pantry-icon');

const addNewItemContainer = document.querySelector('.add-item-container');
const newItemName = document.querySelector('.add-item-name');
const newItemAmount = document.querySelector('.add-item-amount');
const newItemCategory = document.querySelector('.selected-category');
const addItemButton = document.querySelector('.add-item-button');

const filterContentList = document.querySelector('.user-filter-content');
const starIcon = document.querySelector('.star-icon');

const searchView = document.querySelector('.search-view');

const recipeIngredients = document.querySelector('.ingredients-h2');
const recipeAmount = document.querySelector('.amount-h2');
const recipeCost = document.querySelector('.cost-h2');
const recipeInstructions = document.querySelector('.recipe-instructions-title');

const browseCategories = document.querySelector('.browse-categories');
const categoryOption = document.querySelector('.category-option');

let currentUser;
let clickedRecipe;
// -----------------EVENT LISTENERS-----------------:
window.addEventListener("load", sortUserAccounts);
navbarTitle.addEventListener('click', displayHomePage);
userAccounts.addEventListener("click", determineUser);
// window.addEventListener("click", iconClickHandler);
profileList.addEventListener("click", displayUserSectionHandler);
// whatsCookinNavBar.addEventListener('click', displayHomePage);
// recipeImage.addEventListener('click', displayRecipePage);
// recipeImage.addEventListener('click', targetClickedRecipe);
main.addEventListener("click", clickHandler);
searchInput.addEventListener('click', extendSearchBar);
searchInput.addEventListener('keypress', searchInputHandler);
browseCategories.addEventListener('click', sideNavHandler);
// starIcon.addEventListener('click', toggleFavoriteRecipe);

// pantryIcon.addEventListener('click', updateIngredientAmount);
// addItemButton.addEventListener('click', addItemToPantry);
filterContentList.addEventListener('click', filterContent);
// -----------------FUNCTIONS-----------------:

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function translateIngredientNumberToName(ingredientNumber) {
  const ingredientName = ingredientsData.find(ingredient => ingredient.id === ingredientNumber);
  if (ingredientName === undefined) {
    console.log("ingredientName".ingredientName);
    console.log("ingredient", ingredientNumber);
    return ingredientNumber;
  } else {
    return ingredientName.name;
  }
}


// *---*---**---*---* SIDE NAV MENU FUNCTIONS *---*---**---*----*:
function openNav() {
  document.getElementById("sideNav").style.width = "300px";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}

function displayCategoryPage(category) {
  console.log(category);
  // const saladTags = ["salad"];
  // const breakfastTags = ["morning meal", "brunch", "breakfast"];
  // const lunchTags = ["lunch", "brunch"];
  // const dinnerTags = ["dinner"];
  // const entreeTags = ["main course", "main dish"];
  // const appetizerTags = ["appetizer", "side dish", "antipasti”, "starter", "snack", "antipasto”, `${hor d'oeuvre}`, “condiment", "dip", "spread", "sauce"];
  // if(category === "appetizer"){
  // }
}

function sideNavHandler() {
  if (event.target.innerText.trim() === "Breakfast") {
    displayCategoryPage('breakfast');
  } else if (event.target.innerText.trim() === "Lunch") {
    displayCategoryPage('lunch');
  } else if (event.target.innerText.trim() === "Dinner") {
    displayCategoryPage('dinner');
  } else if (event.target.innerText.trim() === "Appetizers") {
    displayCategoryPage('appetizer');
  } else if (event.target.innerText.trim() === "Salads") {
    displayCategoryPage('salad');
  } else if (event.target.innerText.trim() === "Entrees") {
    displayCategoryPage('entrees');
  } else if (event.target.innerText.trim() === "Desserts") {
    displayCategoryPage('desserts');
  }
}

// *---*---**---*---* ICON BEHAVIOR *---*---**---*----*:
function addRemoveFavorite(event, addRecipe) {
  console.log(event.target)
  console.log(event.target.id);

  let recipeObject = recipeData.find(recipe => recipe.id.toString() === event.target.id.toString())
  addRecipe === true ? currentUser.addFavoriteRecipe(recipeObject) : currentUser.removeFromFavorites(recipeObject);
  // currentUser.saveToStorage();
}

function addRemoveToCook(event, addRecipe) {
  let recipeObject = recipeData.find(recipe => recipe.id.toString() === event.target.nextElementSibling.innerText)
  console.log(event.target.nextElementSibling);
  addRecipe === true ? currentUser.addToRecipesToCook(recipeObject) : currentUser.removeFromToCook(recipeObject);
  // currentUser.saveToStorage();
}

function iconHandler(event) {
  if (event.target.classList.contains('recipe-bookmark-icon--inactive')) {
    event.target.classList.replace('recipe-bookmark-icon--inactive', 'recipe-bookmark-icon--active')
    addRemoveToCook(event, true);
  } else if (event.target.classList.contains('recipe-bookmark-icon--active')) {
    event.target.classList.replace('recipe-bookmark-icon--active', 'recipe-bookmark-icon--inactive')
    addRemoveToCook(event, false);
  } else if (event.target.classList.contains('star-icon')) {
    event.target.classList.replace('star-icon', 'star-icon--active')
    addRemoveFavorite(event, true);
  } else if (event.target.classList.contains('star-icon--active')) {
    event.target.classList.replace('star-icon--active', 'star-icon')
    addRemoveFavorite(event, false);
  }
}
//      if we want cookies clickable for COOKED, use these animations

//   else if (event.target.className.includes('recipe-solid-cookie-icon--inactive')) {
//   event.target.classList.add('recipe-solid-cookie-icon--active');
//   event.target.classList.remove('recipe-solid-cookie-icon--inactive');
// } else if (event.target.className.includes('recipe-solid-cookie-icon--active')) {
//   console.log(event);
//   event.target.classList.remove('recipe-solid-cookie-icon--active');
//   event.target.classList.add('recipe-solid-cookie-icon--inactive');
// }


// *---*---**---*---* HOME SECTION functions *---*---**---*----*:

window.onload = loadRandomStaffPicks();
window.onload = loadRandomOthersCookin();

function loadRandomStaffPicks() {
  document.querySelector('.staff-picks').innerHTML = "";
  recipeData.forEach((recipe, i) => {
    let randomRecipe = recipeData[getRandomIndex(recipeData)];
    if (i < 6) {
      document.querySelector('.staff-picks').insertAdjacentHTML('afterbegin',
        `
      <div class="staff-pick-block staff-pick-${i+1}">
        <div class='staff-pick-image-wrapper'>
          <img class="staff-pick-img ${i+1}-img recipe-image" src='${randomRecipe.image}' id='${randomRecipe.id}'>
        </div>
        <div class='staff-pick-title-wrapper'>
          <h3 class="staff-pick-title ${i+1}-title">${randomRecipe.name}</h3>
        </div>
      </div>
      `
      )
    }
  })
}
//    **** to use after creating .popularity property in recipe class ****
// <img class="solid-cookie-icon icon"> ${recipe.popularity}

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
          <img class="users-icon sidebar-icon" src='../assets/user-solid.svg'>
          <p>${randomUser.name.split(' ')[0]} ${randomUser.name.split(' ')[1].charAt(0)}.</p>
          <div class="others-sidebar-card-info-icons">
            <svg class="recipe-bookmark-icon--inactive sidebar-icon icon"></svg>
            <span class='hidden'>${randomRecipe.id}</span>
            <svg class="recipe-basket-icon--inactive sidebar-icon icon"></svg>
            <svg class="recipe-solid-cookie-icon--inactive sidebar-icon icon"><p id="others-score">${Math.round(Math.random()*500)}</p></svg>
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
    };
  });
};


// *---*---**---*---* USER SECTION functions *---*---**---*----*:

// *********      Sorting user drop down    **********
function sortUserAccounts() {
  let sortedUsersData = usersData.sort((a, b) => {
    return a.name > b.name ? -1 : 1
  });
  sortedUsersData.forEach(user => {
    userAccounts.insertAdjacentHTML('afterbegin', `
    <a href="#"><img class="dropdown-icons" src="../assets/user-solid.svg" alt="">
      ${user.name}</a>
    `)
  })
};

// *********      WHICH USER IS BEING CHOSEN    **********
function determineUser() {
  let userObject = usersData.find(user => user.name === event.target.innerText.trim() ? user : null);
  userObject !== null ? displayUserIcon(userObject) : null;
  currentUser = new User(userObject);
  //
  // let retrievedUserData = JSON.parse(localStorage.getItem(`${currentUser.id}`));
  // if (retrievedUserData) {
  //   currentUser = new User(retrievedUserData)
};
// };

// *********      CHANGE USER NAME NAVBAR    **********
function displayUserName(user) {
  if (user) {
    navbarUserNameWrapper.classList.add('navbar-user-name-wrapper--active')
    navbarUserName.innerText = `${user.name.split(' ')[0]}`;
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
};

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
};

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
  let matchedIngredient;
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
  // if (searchResults.length === 0) {
  //   searchView.innerHTML = " ";
  //   searchView.innerHTML = "No Search Results"
  // }
  // searchView.innerHTML = "";
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
};


function populateIngredientInformation() {
  clickedRecipe.ingredients.forEach(recipeIngredient => {
    let matchedIngredient = ingredientsData.find(ingredient => ingredient.id === recipeIngredient.id);
    let ingredientTotalCost = (recipeIngredient.quantity.amount * matchedIngredient.estimatedCostInCents) / 100;
    document.querySelector('.ingredients-h2').insertAdjacentHTML('beforeend', `
    <p>${matchedIngredient.name}</p>
    `)
    document.querySelector('.amount-h2').insertAdjacentHTML('beforeend', `
    <p>${recipeIngredient.quantity.amount.toFixed(2)} ${recipeIngredient.quantity.unit}</p>
    `)
    document.querySelector('.cost-h2').insertAdjacentHTML('beforeend', `
    <p>$ ${ingredientTotalCost.toFixed(2)}</p>
    `)
  });
};

function populateRecipeInstructions() {
  let instructions = clickedRecipe.getInstructions()
  instructions.forEach(instruction => {
    document.querySelector('.recipe-instructions-list').insertAdjacentHTML('afterbegin', `
    <p class="recipe-instructions recipe-instructions-step">${instruction}<br>
    `)
  });
};

// *---*---*DISPLAY RECIPE functions*---*----*:
function populateRecipeView() {
  clearRecipeViewData();
  document.querySelector('.recipe-img').src = `${clickedRecipe.image}`;
  document.querySelector('#recipe-count').innerText = `${Math.round(Math.random()*500)}`
  document.querySelector('#recipe-id').innerText = `${clickedRecipe.id}`
  populateIngredientInformation();
  document.querySelector('.recipe-title').innerText = `${clickedRecipe.name}`
  document.querySelector('.recipe-details').innerText = `One of our most popular recipes, ${clickedRecipe.name} is a surprisingly versatile dish that ${document.querySelector('#recipe-count').innerText} of our users have been cookin'`
  populateRecipeInstructions();
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
}

// *============*============*FAVORITES SECTION FUNCTIONS*============*============*:
// function toggleFavoriteRecipe(event){
//   currentUser.addFavoriteRecipe(event.target);
//   currentUser.saveToStorage()
//   }

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
};

function filterContent() {

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
        <svg class='star-icon icon' id=${recipeToCook.id}></svg>
        <svg class="search-result-icon recipe-bookmark-icon--active sidebar-icon icon"></svg>
        <span class='hidden'>${recipeToCook.id}</span>
      </div>
      <h3 class="staff-pick-title">${recipeToCook.name}</h3>
    </div>
    `)
  })
}

// ===================== PANTRY Section functions =====================:

// function updateIngredientAmount() {
//   let pantryItem = event.target();
//   if (event.target.className === 'plus') {
//     currentUser.pantry.contents.amount -= 1
//   } else if (event.target.className === 'minus') {
//     currentUser.pantry.contents.amount += 1
//   } else if (event.target.className === 'delete') {
//     currentUser.pantry.contents
//   }
//   populatePantry();
// }

function clearInputFields() {
  // newItemName.value = "";
  // newItemAmount.value = "0";
  // newItemCategory.selected = "other"
};

function addItemToPantry() {
  // event.preventDefault();
  // const newItem = {
  //   name: `${newItemName.value}`,
  //   // ingredient: `${Date.now()}`,
  //   ingredient: `${Math.round(Math.random() * 1000)}`,
  //   amount: `${newItemAmount.value}`
  // };
  // // console.log("newitem", newItem);
  // currentUser.addItemToPantry(newItem.name, newItem.amount)
  // populatePantry();
  // clearInputFields();
};

function populatePantry() {
  pantryView.innerHTML = "";
  console.log(currentUser.pantry.contents);
  currentUser.pantry.contents.forEach(item => {
    let ingredientName = translateIngredientNumberToName(item.ingredient);
    if (typeof ingredientName === 'number') {
      console.log(newItem.name)
      ingredientName = item.name;
    }
    pantryView.insertAdjacentHTML('afterbegin', `
  <section class='pantry-item-block' id="${item.ingredient}">
    <div class="delete-item-container">
      <img class="delete pantry-icon" src="../assets/times-solid.svg">
    </div>
    <div class="pantry-item">
      <p>${ingredientName}</p>
      </div>
      <div class="item-quantity">
        <img class="minus pantry-icon" src="../assets/minus.svg">
        <input class="item-amount-input" type="text" placeholder="${item.amount}">
        <img class="plus pantry-icon" src="../assets/plus.svg">
      </div>
  </section>
    `)
  })
};



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
};

function displaySearchResults() {
  hideHomePage();
  favoritesView.classList.add("hidden");
  userView.classList.add("hidden");
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
};

function displayRecipesToCook() {
  hideHomePage();
  userView.classList.remove('hidden');
  toCookView.classList.remove("hidden");
  filterContentList.classList.remove('hidden');
  pantryView.classList.add("hidden");
  favoritesView.classList.add("hidden");
  recipeView.classList.add('hidden');
  addNewItemContainer.classList.add('hidden');
  searchView.classList.add('hidden');
  populateRecipesToCook();
};

function displayFavoriteRecipes() {
  // hideHomePage();
  pantryView.classList.add("hidden");
  toCookView.classList.add("hidden");
  recipeView.classList.add('hidden');
  searchView.classList.add('hidden');
  addNewItemContainer.classList.add('hidden');
  filterContentList.classList.remove('hidden');
  favoritesView.classList.remove('hidden');
  populateFavorites();
};

function displayPantry() {
  favoritesView.classList.add("hidden");
  toCookView.classList.add("hidden");
  recipeView.classList.add('hidden');
  filterContentList.classList.add('hidden');
  searchView.classList.add('hidden');
  addNewItemContainer.classList.remove('hidden');
  pantryView.classList.remove("hidden");
};

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
// *---*---*EVENT HANDLER functions*---*----*:
function clickHandler(event) {
  if (event.target.classList.contains('recipe-image')) {
    displayRecipePage();
  } else if (event.target.classList.contains('icon')) {
    currentUser ? iconHandler(event) : alert('Please sign in to save this recipe for later');
  };
  event.target !== searchInput ? searchInput.classList.remove('search-input--clicked') : null;
};

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
};
