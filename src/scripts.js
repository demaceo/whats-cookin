// -----------------QUERY SELECTORS-----------------:
const heroContainer = document.querySelector('.hero-container');
const navbarTitle = document.querySelector('.navbar-whats-cookin')
const navbarUserNameWrapper = document.querySelector('.navbar-user-name-wrapper');
const navbarUserName = document.querySelector('.navbar-user-name');
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

let currentUser;
// -----------------EVENT LISTENERS-----------------:
window.addEventListener("load", sortUserAccounts);
navbarTitle.addEventListener('click', displayHomePage);
userAccounts.addEventListener("click", determineUser);
navbar.addEventListener("click", logUserOut);
// window.addEventListener("click", iconClickHandler);
profileList.addEventListener("click", displayUserSectionHandler);
// whatsCookinNavBar.addEventListener('click', displayHomePage);
recipeImage.addEventListener('click', displayRecipePage);
main.addEventListener("click", clickHandler);
searchInput.addEventListener('click', extendSearchBar);
searchInput.addEventListener('keypress', searchInputHandler);
// -----------------FUNCTIONS-----------------:
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

// *---*---*USER SECTION functions*---*----*:
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
  currentUser = new User(userObject)
};
// *********      CHANGE USER NAME NAVBAR    **********
function updateHomePageTitle(user) {
  if (user) {
    navbarUserNameWrapper.classList.add('navbar-user-name-wrapper--active')
    navbarUserName.innerText = `${user.name.split(' ')[0]}`;
  } else {
    navbarUserNameWrapper.classList.remove('navbar-user-name-wrapper--active')
  }
}
// *********     SWITCH CHOOSE USER TO USER ICON    **********
function displayUserIcon(user) {
  userAccountsIcon.classList.add("hidden");
  userProfileIcon.classList.remove("hidden");
  hideHero();
  updateHomePageTitle(user);
}


function logUserOut(event) {
  if (event.target === profileLogOut) {
    userAccountsIcon.classList.remove("hidden");
    userProfileIcon.classList.add("hidden");
    updateHomePageTitle();
  }
}


// *---*---*SEARCH BAR functions*---*----*:
function extendSearchBar() {
  searchInput.classList.add('search-input--clicked');
};

function displaySearchResult() {
  recipes.forEach(recipe => {
    recipe.filter(recipeName => {
      return recipeName.includes(searchInput.innerText)
    })
  })
  searchInput.innerText
};

function searchInputHandler(e) {
  console.log(searchInput.innerText);
  if (e.key === 'Enter' && searchInput.innerText.length !== 0) {
    // displayRecipePage();
    displaySearchResult()
  }
};

// *---*---*DISPLAY PAGE functions*---*----*:

function hideHero() {
  heroContainer.classList.add('hidden');
}

function displayHomePage() {
  heroContainer.classList.remove('hidden');
  homeView.classList.remove('hidden');
  recipeView.classList.add('hidden');
};

function displayRecipePage() {
  heroContainer.classList.add('hidden');
  homeView.classList.add('hidden');
  recipeView.classList.remove('hidden');
};

function displayUserPage() {
  heroContainer.classList.add('hidden');
  homeView.classList.add('hidden');
  userView.classList.remove('hidden');
}

function displayRecipesToCook() {

};

function displayFavoriteRecipes() {

};

function displayUserPantry() {
  currentUser.pantry.forEach(item => {
    pantryView.insertAdjacentHTML('afterbegin', `
    <section class='pantry-item-block'>
    <div class="pantry-item">${item.ingredient}
      <div class="item-quantity">
        <img class="minus">
        <input type="text" placeholder="${item.amount}">
        <img class="plus">
      </div>
    `)
  })
};

// *---*---*EVENT HANDLER functions*---*----*:

function clickHandler(event) {
  if (event.target.className.includes('recipe-image')) {
    displayRecipePage()
  }
}
function displayUserSectionHandler() {
  console.log(event.target.innerText);
  if (event.target.innerText === "Recipes To Cook") {
    // displayUserPage();
    displayUserPage();
    displayRecipesToCook();
  } else if (event.target.innerText === "Favorited Recipes") {
    // displayUserPage();
    displayUserPage();
    displayFavoriteRecipes();
  } else if (event.target.innerText === "My Pantry") {
    // displayUserPage();
    displayUserPage();
    displayUserPantry();
  } else if (event.target.innerText === "Log Out") {
    logUserOut()
  }
};
