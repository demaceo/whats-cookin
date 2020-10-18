// -----------------QUERY SELECTORS-----------------:
let heroContainer = document.querySelector('.hero-container');
let whatsCookinNavBar = document.querySelector('.navbar-whats-cookin')
let userAccounts = document.querySelector('.user-accounts');

let homeView = document.querySelector('.home-view');
let recipeView = document.querySelector('.recipe-view');
let userView = document.querySelector(".main-user-body");

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
homeView.addEventListener("click", imageClickHandler)
searchInput.addEventListener('click', extendSearchBar);
searchInput.addEventListener('keypress', searchInputHandler);
userAccountsIcon.addEventListener("click", displayUserProfile);


// -----------------FUNCTIONS-----------------:

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

function determineUser() {
  userAccountsIcon.classList.add("hidden");
  userProfileIcon.classList.remove("hidden");
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
