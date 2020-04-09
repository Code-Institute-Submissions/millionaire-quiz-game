# Millionaire Quiz Game

## A quiz game for Code Institute Javascript Milestone 2 Project

The game is a simplified version of popular TV Quiz Show - Who Wants to be a Millionaire.

Each player has 12 questions to answer - the main prize is €1 Million.
During the online game each player can use 3 chances. Each chance will hide 2 incorrect answers from the set.

Link to live project here: [Quiz Game][1]

---

## UX

### User Stories

- The user is presented with welcome screen, where she/he can read the rules of the game, start the game with a button and view the high scores list using the second button.
- When starting the game the player has to enter own name, the game won’t start with an empty field.
- The user gets some extra time before the timer (45 sec.) starts running. The delay is based on the length of the question (2, 4, 6 seconds).
- The user is able to re-start the game after failed answer or when the timer runs out. Each event is presented with a modal screen.
- The user can quit game the game at any stage using "Quit Game" button at the bottom of the game screen.

---

## Design

The game uses colorful, cartoon-ish graphics for the user interface. The background imitates a live tv show stage.

![Game preview][image-1]

### Wireframes
[Welcome Screen](wireframes/welcome-screen.png)

[Game Screen](wireframes/game-screen.png)

[High Scores List](wireframes/high-scores-screen.png)

[Mobile Layout](wireframes/phone-layout.png)

---

## Features

- The game uses a set of questions loaded from the JSON file containing question, 4 answers and correct answer as each record. JSON file contains 547 sets of questions and answers.
- Using external library chance.js each game generates 12 unique and random numbers between 1 - 547. These numbers are used as indexes to pick questions from the large set. These 12 question make the set for one game.
- The game has a high score page. It uses localStorage feature of Javascript to save scores on individual machines. The scores are sorted - the best to the worst. The local storage only stores 10 best results and games with less than 2 questions are not saved.

### Future plans

- I would like the game to use some central database to keep the scores globally.
- A proper game should also have some sound effects and music so that would be another feature I’d like to add at a later stage.

## Technologies

The game uses the following:

1. HTML
2. CSS with Bootstrap framework
3. Javascript
4. JQuery
5. [Chance.js][2] - number generator library
6. Google Fonts
7. Font Awesome

## Testing

- The project was built on a local machine using VS Code editor as the main tool. I've used couple of extensions to help me with the code, such as ESlint, Prettier and Live Server to have constant preview of the project. I've used Chrome and Firefox as my testing desktop browsers with their built in DevTools (mainly Console) to catch any bugs in the code.
- While writing the JS part of the application I've used console.log extensively to print out the variables, calculations or arrays used for the game. Developer tools were also helpful to preview the contents of the local storage items, normally not accessible to regular user.
- With the access to all answers I've run the game start to finish couple of times to make sure it is playable and doesn't brake along the way. The game does indeed stop at the 12th question and displays Victory splash screen. All scores above 3 are being recorded to local storage. There's only 1 user input box - Player's name. It won't allow the game to continue without the name being entered. I've asked my family members to play as well to spot any issues I could have missed.

**During the development I come across couple of challenging issues:**

- The countdown timer was not running correctly after few questions answered. I've built a function to delay the timer "ticking" to give the player an extra time to read the question and the answers. After the delay the timer would start counting down 45 seconds. The issue was if a player clicks on an answer button during the delay the timer would not reset and start another one on top of the previous. Thus after few questions the timer would run 2x or 3x times faster. The solution for that was to disable the click event for all 4 answer buttons, and only make them "clickable" when the delay ends.
- Another serious issue was mobile browsers not supporting Jquery .hide and .show functions. I use these 2 functions to hide 2 answer buttons when the player uses the "50:50 Chance" button. When the button is clicked the game hides 2 incorrect answers. This feature was working correctly on desktop browsers, but on mobile devices the buttons would hide but for the next question they would not reset to show all 4 again. I had to switch to special css class instead, which uses "display: none" to hide the items.
- I've noticed that mobile browsers didn't reset the hover state from the answer buttons. The game does not refresh the page after each question so after a successful answer, the button that was clicked was still highlighted with different colour. Using media queries I was able to fix it.
- As per my mentor's request I've included Jasmine test on the function calculating the delay, base on the length of the question.
- The game was tested on all main browsers (Chrome, Firefox, Safari, Edge) and couple of mobile devices (iPhone, iPad, Samsung Galaxy). All devices display the game correctly.

## Deployment

- The project is hosted on GitHub repository under this url: [Game Repository](https://github.com/redlik/millionaire-quiz-game)
- The live version was created using GitHub pages. To create the live preview I've switched the feature on the settings panel of my repository. When the master branch was selected as the source I was given the published URL of the app.
- The live preview is updated automatically every time I make a new commit.
- To clone the project on another machine one can download zip file containing the whole project and run it locally on any install browser using green download button at the top of the github page.
- The project is built with HTML and Javascript so not extra software is necessary to run it.
- If the user is familiar with `git` commands and have `git` installed on local machine the project can be cloned using this command `git clone https://github.com/redlik/millionaire-quiz-game.git`
- `git clone` command clones the project in its entirety, including all commits so the user can trace all changes going back to start of the project.

## Credits

- The local storage saving functionality was created using James Quick tutorial found on [YouTube][3]
- Shout out to Steve, tutor that helped me with the timer issue

[1]:	https://redlik.github.io/millionaire-quiz-game/index.html "Quiz Game"
[2]:	https://chancejs.com/
[3]:	https://youtu.be/u98ROZjBWy8

[image-1]:	wireframes/mockups.jpg