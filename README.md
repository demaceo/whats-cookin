https://demaceo.github.io/whats-cookin/

---
# What's Cookin' - Recipe sites don't have to be boring
###### A simple and elegant site to search, share and store your recipes


---
## Table of Contents
* [Introduction](#introduction)
* [Features](#features)
* [Resources](#resources)
* [Contributors](#contributors)

## Introduction

![Welcome to What's cookin'!](https://media.giphy.com/media/yHlPATYrKHmIBcgHpM/giphy.gif)

The What's Cookin website is based on project criteria laid out for Turing Front End students in week 2/3 of Mod 2 in their time at Turing, as laid out [here](https://frontend.turing.io/projects/whats-cookin.html). The project seeks to challenge the totality of learning of students at this point, pulling together their knowledge of HTML, CSS, JS, DOM interaction and TDD (test driven development), as well as working proficiency in the terminal and GitHub, in order to construct a fully functional web site from scratch (outside of canned datasets/assets). 

The project emphasises proper interactions between the DOM and the Data Model, thusly pushing students to think carefully and critically about their logic to maintain DRY and SRP principles. The project also increases the scope of employing software developing skills to the planning stages - encouraging students to use project management tools and utilize wireframing and mind-mapping.

The site presents the user with the ability to search the site for recipes, to 'login' (for this project there is a set number of canned users to choose from -- a sort of 'admin' view approach to be able to check out any user's data).

Lastly, be sure to click this here when you see it:
<details>
  <summary>**Under the Hood**</summary>
There's more info under here about the functionality being described!
</details>

## Features
---
* [General Site Features](#general-site-features)
* [Responsive Design](#responsive-design)
* [UX, Animations and Extensions](#ux-animations-and-extensions)
* [Test Driven Development](#test-driven-development)
* [Roadmap](#roadmap)
---

#### General Site Features
The game is a simple game of traditional slapjack. Players alternate turns playing cards face-up into a central pile until a card that can be 'slapped' appears. A jack or wild can be slapped, winning the hand. When a hand is won, all the cards of the central pile go to the winning players hand, and then their total cards are shuffled. The goal is to collect all the cards to win the round. Other winning slaps include two cards in a row with the same value (includeing king, queen, ace) or two cards with the same value - one on top, one at the third spot below it (a 'sandwich'). When a player is out of cards, they may slap back in on a valid hand, but can no longer deal until they gain a card.

<details>
  <summary>**Under the Hood**</summary>
A host of logic discussed further below powers this web app. Both `clicks` and `keypresses` are listened for and used to employ extensive event delegation, interpolation, and other multi-syllable words. The primary muscle being worked for this project is employing in an efficient manner array iteration with multiple data sets, and understanding how to cross reference them.
</details>

###### Logged Out View

This is the page the user will land on. From here, users can search, click through to the recipe views, or the user can choose one of the canned user profiles from the top right corner of the screen. At that point, the user will be logged in under that user profile and have access to that users pantry, favorites, and to cook queue, as well as have access to the ability to click the bookmark icon to add the recipe to the 'cook later' section.

###### User View
Users recieve visual feedback that they have been logged into the site in the navbar. They also receive feedback for which part of the user view they are in.

![Different user sections](https://media.giphy.com/media/D9f58mNpL9BcYsFKnE/giphy.gif)

**User Pantry**

The pantry view displays all ingredients that are available for the given user. Real world application for this view would require functionality to add and remove ingredients both in and outside of the site's database (say I wanted to add something unique). When logged in, a recipe in recipe view will show you whether you have enough of a given ingredient to complete the dish, displayed in a table of ingredients, and also indicated by a green glowing shopping cart. If not, you will see what ingredients you are missing and how much. 

![Icon indicating all ingredients](https://user-images.githubusercontent.com/66697338/96816712-01915780-13db-11eb-9fbc-44b71c0c7bb8.png)

![Screen Shot 2020-10-21 at 8 23 09 PM](https://user-images.githubusercontent.com/66697338/96816833-42896c00-13db-11eb-8d94-f9dae6e6d4b7.png)

**User To Cook**

Once logged in, users will be able to click the ribbon icons seen around the site accompanying recipe images. Clicking the ribbon will add the recipe to the user's 'recipes to cook' section - a section to collect prospective recipes. Upon cooking the recipe, if the user enjoyed it, they can add that recipe to their favorites by clicking the star icon which is only available from the user view. Clicking the star icon will remove the recipe from the 'to cook' section and place it in the 'favorites' section.

**User Favorites**

Recipes the user enjoyed making and added from the 'recipes to cook' section.

###### Search
Users have the ability to search recipes on the site either by name or ingredient in just one search bar. Typing in a term will present the user with an array of matched recipes by recipe name as well as if the search term is an ingredient in a recipe. Users can also search their own favorites and recipes to cook.

![Searching recipes](https://media.giphy.com/media/VsNbioo1G5x5XywNv7/giphy.gif)

###### Browse by Category
Users can also search by a limited number of categories inside the hamburger menu. While exposed, the social media icons are currently inactive, but the idea is to incorporate *juuuust* a bit of social media.

![Searching recipes](https://media.giphy.com/media/VsNbioo1G5x5XywNv7/giphy.gif)

###### Recipe View
In logged in recipe view, users can see whether or not they have all of the ingredients to complete the recipe. The cookie icon would indicate the amount of times a given recipe has been cooked (it's 'popularity'), the cart indicating if all ingredients are available, and the ribbon for adding the recipe to 'recipes to cook'. Users can hover over a given step in order to highlight it. 

![Screen Shot 2020-10-21 at 8 23 09 PM](https://user-images.githubusercontent.com/66697338/96816833-42896c00-13db-11eb-8d94-f9dae6e6d4b7.png)

#### Responsive Design
There was great attention paid to building out the architecture of the HTML and CSS to build out as responsive as a site as possible. CSS follows the spirit of BEM naming conventions, though even best-practice practitioners will admit that there is room for interpretation as the class names can get extensive. This is still an area of never ending improvement.

![Animated gif of responsive design](https://media.giphy.com/media/Tz1oOxzXq1FcuStluo/giphy.gif)

#### UX, Animations and Extensions

One goal was to employ modern and attractive styling without distracting, and even more in an effort to enhance the experience for a user on a site geared towards telling someone how to cook with steps. To that end, the site is fairly streamlined and straightforward. The recipe view (clicking a recipe) focuses on the recipe and it's steps. Mousing over a given step will increase contrast by inverting the text and background color - helpful for both the visually normal or impaired.

![Instruction Highlight](https://media.giphy.com/media/MOFIscS8ae4KhxTIsN/giphy.gif)

Other animations bring some small joy to the UX - on hover animations bring the recipe image closer to you, the 'to cook later' ribbons pop to life. Our mission was to inject style and joy into what might otherwise be a flat, and sometimes hard to read experience.

![Small joys](https://media.giphy.com/media/XMsKHQPSxaTx86pYdE/giphy.gif)
![A cute little ribbon](https://media.giphy.com/media/PapJLO9cMcVNx7FGRO/giphy.gif)


<details>
  <summary>**Under the Hood**</summary>
To accomplish animated icons, the team leveraged the ability to use SVG images as responsive background images. Hover states are accomplished in CSS, while swapping active/inactive states by replacing classes upon click is accomplished with heavy logic and DOM interaction. Most of the site is styled in vh/vw/em with a few hard pixel widths/heights here and there. Tactical use of the transition properties brings the site to life.
</details>

#### Test Driven Development

To use the class tests for TDD, the class files must be relinked to the test files. Make sure all necessary `module.exports` code is uncommented, as well as any code linking the data sets which should be available at either the top or the bottom of those data files. Any questions please contact the team through github!

#### Roadmap

In future iterations, additions to the game include:
- Instagram API integration for related images for a given recipe
- Instagram API integration for user images
- Tightening up styling 
- A real login and local and server-side storage
- Ability to add unique ingredients to the pantry
- Updating ingredient amounts in the pantry when a user cooks that recipe
- User cooking a recipe will add to that recipes cook count total and the creator's clout
- Cleaner logic
- More considerations for accessibility

#### Resources

CSS tricks:
- Rapid animation restart (for when player hits deal or slap quickly in succession): https://css-tricks.com/restart-css-animation/
- Cropping an SVG with a div container to get images to size correctly without skewing card image: https://www.educative.io/edpresso/how-to-crop-an-image-in-css
- Sticky Navbar: 
1. https://css-tricks.com/position-sticky-and-table-headers/
2. https://www.w3schools.com/howto/howto_js_navbar_sticky.asp
3. https://css-tricks.com/scroll-fix-content/
- Free online SVG editor: https://boxy-svg.com/app/disk:Z1KzSH1Wcj
- Free SVG icons https://www.svgrepo.com/svg/17356/empty-cart
- Fade in animation: https://blog.hubspot.com/website/css-fade-in

## Contributors
<img src="https://avatars1.githubusercontent.com/u/66697338?s=460&u=3d2e338fdeb625c1940a87b1cfdb7ba6e7d16c5c&v=4" alt="Coding Magician"
 width="150" height="auto" style="float: left" />\
**Scott Brabson**

[GitHub Profile](https://github.com/brabbuss)

FE Engineering student at Turing School entering Mod 2 (of 5) who has found no end to the joy that is creating as you speak the language of JS.

<img src="https://avatars2.githubusercontent.com/u/62954974?s=400&u=b246587c21877b7fe4a4972e89ec98677d5c29d6&v=4" alt="Coding Centaur"
 width="150" height="auto" style="float: left" />\
**Demaceo Vincent Howard**

[GitHub Profile](https://github.com/demaceo)

FE Engineering student at Turing School entering Mod 2.
