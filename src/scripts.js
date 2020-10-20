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
// const plusIcon = document.querySelector('.plus');
// const minusIcon = document.querySelector('.minus');
const pantryIcon = document.querySelector('.pantry-icon');

const addNewItemContainer = document.querySelector('.add-item-container');
const newItemName = document.querySelector('.add-item-name');
const newItemAmount = document.querySelector('.add-item-amount');
const newItemCategory = document.querySelector('.selected-category');
const addItemButton = document.querySelector('.add-item-button');

const filterContentList = document.querySelector('.user-filter-content');
const starIcon = document.querySelector('.star-icon');

const recipeLeftColumn = document.querySelector('.recipe-left-column');
const recipeRightColumn = document.querySelector('.recipe-right-column');
const searchView = document.querySelector('.search-view');

let currentUser;
// let currentRecipe;
// -----------------EVENT LISTENERS-----------------:
window.addEventListener("load", sortUserAccounts);
navbarTitle.addEventListener('click', displayHomePage);
userAccounts.addEventListener("click", determineUser);
// window.addEventListener("click", iconClickHandler);
profileList.addEventListener("click", displayUserSectionHandler);
// whatsCookinNavBar.addEventListener('click', displayHomePage);
recipeImage.addEventListener('click', displayRecipePage);
main.addEventListener("click", clickHandler);
searchInput.addEventListener('click', extendSearchBar);
searchInput.addEventListener('keypress', searchInputHandler);

// pantryIcon.addEventListener('click', updateIngredientAmount);
addItemButton.addEventListener('click', addItemToPantry);
filterContentList.addEventListener('click', filterContent);

// recipeImage.addEventListener("dblclick", targetClickedRecipe);
// -----------------FUNCTIONS-----------------:

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function translateIngredientNumberToName(ingredientNumber) {
  const ingredientName = ingredientsData.find(ingredient => ingredient.id === ingredientNumber);
  return ingredientName.name;
}

function openNav() {
  document.getElementById("sideNav").style.width = "300px";
}

function closeNav() {
  document.getElementById("sideNav").style.width = "0";
}

// *---*---**---*---* ICON BEHAVIOR *---*---**---*----*:

function addRemoveToCook(event, addRecipe) {
  let recipeObject = recipeData.find(recipe => recipe.id.toString() === event.target.nextElementSibling.innerText)
  console.log(event.target.nextElementSibling);
  addRecipe === true ? currentUser.addToRecipesToCook(recipeObject) : currentUser.removeFromToCook(recipeObject);
}

function iconHandler(event) {
  if (event.target.classList.contains('recipe-bookmark-icon--inactive')) {
    event.target.classList.replace('recipe-bookmark-icon--inactive', 'recipe-bookmark-icon--active')
    addRemoveToCook(event, true);
  } else if (event.target.classList.contains('recipe-bookmark-icon--active')) {
    event.target.classList.replace('recipe-bookmark-icon--active', 'recipe-bookmark-icon--inactive')
    addRemoveToCook(event, false);
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
}


// *---*---**---*---* HOME SECTION functions *---*---**---*----*:

window.onload = loadRandomStaffPicks();
window.onload = loadRandomOthersCookin();

function loadRandomStaffPicks() {
  document.querySelector('.staff-picks').innerHTML = "";
  recipeData.forEach((recipe, i) => {
    let randomRecipe = recipeData[getRandomIndex(recipeData)];
    if (i < 6) {
      document.querySelector('.staff-picks').insertAdjacentHTML('afterbegin', `

      <div class="staff-pick-block staff-pick-${i+1}">
        <div class='staff-pick-image-wrapper'>
          <img class="staff-pick-img ${i+1}-img recipe-image" src='${randomRecipe.image}' id='${randomRecipe.id} alt="">
        </div>
        <h3 class="staff-pick-title ${i+1}-title">${randomRecipe.name}</h3>
        <div class="staff-pick-icons ${i+1}-icons">
          <img class="recipe-bookmark-icon--inactive icon">
          <span class='hidden'>${randomRecipe.id}</span>
          <img class="recipe-basket-icon--inactive icon">
          <img class="recipe-dollar-icon icon">
          <div class="popularity">
            <img class="recipe-solid-cookie-icon--inactive icon"> 60
          </div>
        </div>
      </div>
      `)
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
    // console.log(randomUser);
    // randomUser.favoriteRecipe(randomRecipe);  // Wanted add to favorites, but requires instantiation
    // randomUser.completeRecipe(randomRecipe);  // and additional logic for local storage of secondary users

    if (i < 6) {
      document.querySelector('.others-sidebar-card-container').insertAdjacentHTML('afterbegin',
        `
      <article class='others-sidebar-card'>
        <div class="others-sidebar-card-info-block">
          <img class="users-icon sidebar-icon" src='../assets/user-solid.svg'>
          <p>${randomUser.name.split(' ')[0]} ${randomUser.name.split(' ')[1].charAt(0)}.</p>
          <div class="others-sidebar-card-info-icons">
            <svg class="recipe-bookmark-icon--inactive sidebar-icon icon"></svg>
            <span class='hidden'>${randomRecipe.id}</span>
            <svg class="recipe-basket-icon--inactive sidebar-icon icon"></svg>
            <svg class="recipe-solid-cookie-icon--inactive sidebar-icon icon"><p>${Math.round(Math.random()*500)}</p></svg>

          </div>
        </div>
        <div class="others-sidebar-image-block">
          <div class="others-sidebar-card-image-wrapper">
            <img class='others-sidebar-card-image recipe-image' src="${randomRecipe.image}" id='${randomRecipe.id}' alt="">
          </div>
          <p>${randomRecipe.name}</p>
        </div>
      </article>
      `
      )
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
  currentUser = new User(userObject)
  // currentUser.pantry.contents.forEach(item => {
  //   let ingredientName = translateIngredientNumberToName(item.ingredient)
  //   currentUser.pantryByName.push(ingredientName);
};

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
  navbarDisplayUserSection()
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
  console.log(searchInput);
  if (searchInput.value !== undefined && e.key === 'Enter') {
    let searchEntry = searchInput.value;
    if (searchEntry.length !== 0) {
      displaySearchResults();
      gatherSearchResults(searchEntry);
    } else {
      return
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
  populateSearchResults(searchResults)
};

function populateSearchResults(searchResults) {
  // searchView.innerHtml = "";
  searchResults.forEach(searchResult => {
    searchView.insertAdjacentHTML('afterbegin', `
    <section class='search-result-container' id=${searchResult.id}>
    <img class="searched-recipe-image recipe-image" src=${searchResult.image} id=${searchResult.id}>
      <div class='search-result'>
      <img class='star-icon icon' src='../assets/star-regular.svg'>
      <h2>${searchResult.name}</h2>
      </div>
    </section>
    `)
  })
}

// *---*---*DISPLAY RECIPE functions*---*----*:
function targetClickedRecipe(){
  if(event.target.closest('.recipe-image')){
      let closestElement = event.target.closest('.recipe-image');
      recipeData.forEach(recipe => {
        if()
      })
  }
}



//all of this needs heavy refactoring: 👇

// function targetClickedRecipe() {
//   console.log(event.target👉.closest👈('.recipe-image'));
//   if (event.target.closest('.recipe-image')) {
//     const clickedFavoriteRecipe = event.target.closest('.recipe-image');
//     recipeData.forEach(recipe => {
//       console.log(clickedFavoriteRecipe.id);
//       if (recipe.id === clickedFavoriteRecipe.id) {
//         currentRecipe = new Recipe(recipe)
//         }
//         populateRecipeLeftColumn(currentRecipe);
//         populateRecipeLeftColumn(currentRecipe);
//       })
//     }
//     console.log(currentRecipe);
//     displayRecipePage();
//   }

//✨💫EUREKA WE WONT HAVE TO REOGRANIZE THIS STUFF ✨💫
//✨💫 forgot interpolation lines dont count as function lines ✨💫

// need to reorganize our recipeleftColumn HTML😁🔫
// function populateRecipeLeftColumn(recipeData) {
//   recipeLeftColumn.insertAdjacentHTML('afterbegin', `
//   <img class="recipe-img recipe-image" id="recipeImg" src="${recipeData.image}" alt="">
//   `);
//   const currentRecipe = new Recipe(recipeData);
//   document.getElementById("recipeImg").src = recipeData.image;
//   document.querySelector('.recipe-img').src = `${currentRecipe.image}`
//   document.querySelector('.recipe-cost').innerText = `${currentRecipe.calculateCost()}`;
//   recipeLeftColumn.insertAdjacentHTML('afterbegin', `
//   <img class="recipe-img recipe-image" src="${recipeData.image}" alt="">
//   `)
//   document.querySelector('.ingredients-h2').innerHTML = '';
//   recipeData.ingredients.forEach(ingredient => {
//     let ingredientName = translateCodeName(ingredient.id)
//     document.querySelector('.ingredients-h2').insertAdjacentHTML('afterbegin', `
//     <p>${ingredientName}</p>
//   `)
//   })
//   document.querySelector('.amount').innerHTML = '';
//   document.querySelector('.cost').innerHTML = '';
// }

// need to reorganize our recipeRightColumn HTML😁🔫
// function populateRecipeRightColumn(recipeData) {
//   recipeRightColumn.innerHTML = '';
//   recipeRightColumn.insertAdjacentHTML('afterbegin', `
//   <h2 class="recipe-title">${recipeData.name}</h2>
//   `)
//   recipeData.instructions.forEach(instruction => {
//     document.querySelector('.recipe-instructions-title').insertAdjacentHTML('beforeend', `
//   <p class="recipe-instructions recipe-instructions-step"><br>${Number(instruction.number)}. ${instruction.instruction}</p>
//   `)
//   })
// };

// i think this is useless
// function populateRecipePage() {
// }

//💩👖
// function removeRecipe(favorite, toCook) {
//   if (event.target.closest(".favorite-recipe-container")) {
//     const clickedFavoriteRecipe = event.target.closest(".favorite-recipe-container")
//     currentUser.favoriteRecipes.forEach(favoriteRecipe => {
//       if (favoriteRecipe.id === Number(clickedFavoriteRecipe.id)) {
//         currentUser.favoriteRecipes.splice(i, 1)
//         populateFavorites();
//       }
//     })
//   } else if (event.target.closest(".recipes-to-cook-container")) {
//     const clickedRecipeToCook = event.target.closest(".recipe-to-cook-container")
//     currentUser.recipesToCook.forEach(recipe => {
//       if (recipe.id === Number(clickedFavoriteRecipe.id)) {
//         currentUser.recipesToCook.splice(i, 1)
//         populateRecipesToCook();
//       }
//     })
//   }
// };

// function displayRecipe() {
//   var clickedRecipe = event.target.closest('.')
// };
// *============*============*FAVORITES SECTION FUNCTIONS*============*============*:
function populateFavorites() {
  // displayFavoriteRecipes();
  favoritesView.innerHTML = "";
  currentUser.favoriteRecipes.forEach(favorite => {
    favoritesView.insertAdjacentHTML('afterbegin', `
    <section class='favorite-recipe-container' id=${favoriteRecipe.id}>
      <img class='star-icon icon' src='star-solid.svg'>
      <div class='favorite-recipe'>
        <img class="favorite-recipe-image" src=${favorite.image} id='${favorite.id}' >
          <h2>${favoriteRecipe.name}</h2>
        </div>
      </div>
    </section>
    `)
  })
};

function filterContent() {

}

// *============*============*RECIPES TO COOK SECTION FUNCTIONS*============*============*:
function populateRecipesToCook() {
  // displayRecipesToCook();
}




// *---*---*DISPLAY PAGE functions*---*----*:

function hideHero() {
  heroContainer.classList.add('hidden');
}

function displayHomePage() {
  recipeView.classList.add('hidden');
  heroContainer.classList.remove('hidden');
  homeView.classList.remove('hidden');
  navbarDisplayUserSection()
};

function displaySearchResults() {
  hideHomePage();
  heroContainer.classList.add('hidden');
  favoritesView.classList.add("hidden");
  pantryView.classList.add("hidden");
  recipeView.classList.add('hidden');
  toCookView.classList.add("hidden");
  filterContentList.classList.remove('hidden');
  searchView.classList.remove('hidden');
  navbarDisplayUserSection();
}

function displayRecipePage() {
  heroContainer.classList.add('hidden');
  homeView.classList.add('hidden');
  favoritesView.classList.add("hidden");
  pantryView.classList.add("hidden");
  recipeView.classList.remove('hidden');
  navbarDisplayUserSection();
  // targetClickedRecipe();
};

function displayRecipesToCook() {
  pantryView.classList.add("hidden");
  favoritesView.classList.add("hidden");
  recipeView.classList.add('hidden');
  addNewItemContainer.classList.add('hidden');
  toCookView.classList.remove("hidden");
  filterContentList.classList.remove('hidden');

};

function displayFavoriteRecipes() {
  pantryView.classList.add("hidden");
  toCookView.classList.add("hidden");
  recipeView.classList.add('hidden');
  addNewItemContainer.classList.add('hidden');
  filterContentList.classList.remove('hidden');
  favoritesView.classList.remove("hidden");
  populateFavorites();
};

function displayPantry() {
  favoritesView.classList.add("hidden");
  toCookView.classList.add("hidden");
  recipeView.classList.add('hidden');
  filterContentList.classList.add('hidden');
  addNewItemContainer.classList.remove('hidden');
  pantryView.classList.remove("hidden");
};

function hideHomePage() {
  heroContainer.classList.add('hidden');
  homeView.classList.add('hidden');
  userView.classList.remove('hidden');
}

function displayUserPage(section) {
  hideHomePage();
  // recipeView.classList.add('hidden')
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

// *---*---*PANTRY Section functions*---*----*:

// function updateIngredientAmount(event) {
//   if(event.target.className === 'plus'){
//     currentUser.pantry.contents.amount -= 1
//   } else if(event.target.className === 'minus'){
//     currentUser.pantry.contents.amount += 1
//   }
// }

function clearInputFields() {
  newItemName.value = "";
  newItemAmount.value = "0";
  newItemCategory.selected = "other"
};

function addItemToPantry(event) {
  event.preventDefault();
  const newItem = {
    ingredientName: `${newItemName.value}`,
    ingredient: `${Math.round(Math.random() * 1000)}`,
    amount: `${newItemAmount.value}`
  };
  currentUser.pantry.contents.unshift(newItem);
  clearInputFields();
};

function populatePantry() {
  pantryView.innerHTML = "";
  currentUser.pantry.contents.forEach(item => {
    let ingredientName = translateIngredientNumberToName(item.ingredient);
    pantryView.insertAdjacentHTML('afterbegin', `
  <section class='pantry-item-block' id=${item.ingredient}>
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

// *---*---*EVENT HANDLER functions*---*----*:
function clickHandler(event) {
  // event.target.classList.forEach(iconHandler(event));
  if (event.target.classList.contains('recipe-image')) {
    displayRecipePage();
  } else if (event.target.classList.contains('icon')) {
    currentUser ? iconHandler(event) : alert('Please sign in to save this recipe for later');
  };
  event.target !== searchInput ? searchInput.classList.remove('search-input--clicked') : null;
};

function displayUserSectionHandler(event) {
  console.log(event.target.innerText);
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
