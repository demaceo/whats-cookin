// document.addEventListener('keydown', playerKeyEvent)

document.querySelector('.navbar-whats-cookin').addEventListener('click', function goHome() {
  document.querySelector('.hero-container').classList.remove('hidden');
  document.querySelector('.home-view').classList.remove('hidden');
  document.querySelector('.recipe-view').classList.add('hidden');
})

document.querySelector('.search-input').addEventListener('click', function extendSearchBar() {
  document.querySelector('.search-input').classList.add('search-input--clicked');
})

document.querySelector('.recipe-image').addEventListener('click', function openRecipeView(event) {
  document.querySelector('.hero-container').classList.add('hidden');
  document.querySelector('.home-view').classList.add('hidden');
  document.querySelector('.recipe-view').classList.remove('hidden');
})
