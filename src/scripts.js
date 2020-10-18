// -----------------QUERY SELECTORS-----------------:
const heroContainer = document.querySelector('.hero-container');
const navbarTitle = document.querySelector('.navbar-whats-cookin')
const navbarUserNameWrapper = document.querySelector('.navbar-user-name-wrapper');
const navbarUserName = document.querySelector('.navbar-user-name');
const navbar = document.querySelector('.navbar');

const userAccounts = document.querySelector('.user-accounts');

const homeView = document.querySelector('.home-view');
const recipeView = document.querySelector('.recipe-view');
const userView = document.querySelector(".main-user-body");
const pantryView = document.querySelector(".pantry-view");

const recipeImage = document.querySelector('.recipe-image');
const searchInput = document.querySelector('.search-input');

const userAccountsIcon = document.querySelector('.accounts-icon');
const userProfileIcon = document.querySelector('.dropdown-header-icon');

const profileRecipesToCook = document.querySelector('#profile-dropdown-recipes-to-cook')
const profileFavoriteRecipes = document.querySelector('#profile-dropdown-favorite-recipes')
const profilePantry = document.querySelector('#profile-dropdown-pantry')
const profileLogOut = document.querySelector('#profile-dropdown-log-out')

const headerIcon = document.querySelector('.dropdown-content');
const cookieIcon = document.querySelector('.solid-cookie-icon');
const bookmarkIcon = document.querySelector('.bookmark-icon');

// -----------------EVENT LISTENERS-----------------:
window.addEventListener("load", sortUserAccounts);
navbarTitle.addEventListener('click', displayHomePage);
userAccounts.addEventListener("click", determineUser);
navbar.addEventListener("click", logUserOut);
// window.addEventListener("click", iconClickHandler);
whatsCookinNavBar.addEventListener('click', displayHomePage);
// recipeImage.addEventListener('click', displayRecipePage);
homeView.addEventListener("click", clickHandler);
searchInput.addEventListener('click', extendSearchBar);
searchInput.addEventListener('keypress', searchInputHandler);
userAccountsIcon.addEventListener("click", displayUserProfile);

// let currentUser;
// -----------------FUNCTIONS-----------------:
function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}


// *---*---*USER ACCOUNT functions*---*----*:
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

function updateHomePageTitle(user) {
  if (user) {
    navbarUserNameWrapper.classList.add('navbar-user-name-wrapper--active')
    navbarUserName.innerText = `${user.name.split(' ')[0]}`;
  } else {
    navbarUserNameWrapper.classList.remove('navbar-user-name-wrapper--active')
  }
}

function displayUserProfile(user) {
  userAccountsIcon.classList.add("hidden");
  userProfileIcon.classList.remove("hidden");
  updateHomePageTitle(user);
}

function determineUser() {
  let currentUser = usersData.find(user => user.name === event.target.innerText.trim() ? user : null);
  currentUser !== null ? displayUserProfile(currentUser) : null;
};

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

function clickHandler(event) {
  if (event.target.className.includes('recipe-image')) {
    displayRecipePage()
  }
}

function displayUserSectionHandler() {
  console.log(event.target.innerText);
  displayUserPage();
  if (event.target.innerText === "Recipes To Cook") {
    // displayUserPage();
    displayRecipesToCook();
  } else if (event.target.innerText === "Favorited Recipes") {
    // displayUserPage();
    displayFavoriteRecipes();
  } else if (event.target.innerText === "My Pantry") {
    // displayUserPage();
    displayUserPantry();
  } else if (event.target.innerText === "Log Out") {
    logUserOut()
  }
};
