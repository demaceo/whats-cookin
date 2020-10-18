// -----------------QUERY SELECTORS-----------------:
let heroContainer = document.querySelector('.hero-container');
let whatsCookinNavBar = document.querySelector('.navbar-whats-cookin')
let userAccounts = document.querySelector('.user-accounts');

let homeView = document.querySelector('.home-view');
let recipeView = document.querySelector('.recipe-view');
let userView = document.querySelector(".main-user-body");
let pantryView = document.querySelector(".pantry-view");

let recipeImage = document.querySelector('.recipe-image');

let searchInput = document.querySelector('.search-input');

let userAccountsIcon = document.querySelector('.accounts-icon');
let userProfileIcon = document.querySelector('.dropdown-header-icon');
let headerIcon = document.querySelector('.dropdown-content');
let cookieIcon = document.querySelector('.solid-cookie-icon');
let bookmarkIcon = document.querySelector('.bookmark-icon');

// -----------------EVENT LISTENERS-----------------:
window.addEventListener("load", sortUserAccounts);
userAccounts.addEventListener("click", determineUser);
// window.addEventListener("click", iconClickHandler);
whatsCookinNavBar.addEventListener('click', displayHomePage);
// recipeImage.addEventListener('click', displayRecipePage);
homeView.addEventListener("click", clickHandler);
searchInput.addEventListener('click', extendSearchBar);
searchInput.addEventListener('keypress', searchInputHandler);
userAccountsIcon.addEventListener("click", displayUserProfile);

let currentUser;
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
  whatsCookinNavBar.innerText += ` ${user.name}?!`;
}

function displayUserProfile(user) {
  userAccountsIcon.classList.add("hidden");
  userProfileIcon.classList.remove("hidden");
  updateHomePageTitle(user);
}

function determineUser() {
  currentUser = usersData.find(user => {
    return user.name === event.target.innerText ?
      console.log("why the frick doesn't this work. (this ternary is weird on purpose bc ive tried it all except the right way)") : user
  });
  console.log(currentUser);
  displayUserProfile(currentUser);
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

function logUserOut() {
  userAccountsIcon.classList.remove("hidden");
  userProfileIcon.classList.add("hidden");
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
