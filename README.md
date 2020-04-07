# Millionaire Quiz Game
## A quiz game for Code Institute Javascript Milestone 2 Project

The game is a simplified version of popular TV Quiz Show - Who Wants to be a Millionaire.

Each player has 12 questions to answer - the main prize is €1 Million.
During the online game each player can use 3 chances. Each chance will hide 2 incorrect answers from the set.

Link to live project here: [Quiz Game][1]
---- 
# UX
## User Stories
- The user is presented with welcome screen, where she/he can ready the rules of the game, start the game with a button and view the high scores list using the second button.
- When starting the game the player has to enter own name, the game won’t start with an empty field.
- The user gets some extra time before the timer (45 sec.) starts running. The delay is based on the length of the question (5, 10, 15 sec.)
- The user is able to re-start the game after failed answer or when the timer runs out. Each activity is presented with a modal screen.
---- - 
# Features
- The game uses a set of questions loaded from the JSON file containing question, 4 answers and correct answer as each record. JSON file contains 547 sets of questions and answers.
- Using external library chance.js each game generates 12 unique and random numbers between 1 - 547. These numbers are used as indexes to pick questions from the large set. These 12 question make the one game.
- The game has a high score page. It uses localStorage feature of Javascript to save scores on individual machines. The scores are sorted - the best to the worst. The local storage only stores 10 best results and games with less than 2 questions are not saved.
## Future plans
- I would like the game to use some central database to keep the scores globally. 
- A proper game should also have some sound effects and music so that would be another feature I’d like to add at the later stage.
# Technologies
The game uses the following:
1. HTML
2. CSS with Bootstrap framework
3. Javascript
4. JQuery
5. [Chance.js][2] - number generator library
6. Google Fonts
7. Font Awesome 
# Testing
The game was tested on all main browsers (Chrome, Firefox, Safari, Edge) and couple of mobile devices (iPhone, iPad, Samsung Galaxy). All devices display the game correctly. 
# Deployment
The project is hosted on GitHub repository, the live version is created using the master branch. 
# Credits
- The local storage saving functionality was created using James Quick tutorial found on [YouTube][3]
- Shout out to Steve, tutor that helped me with the timer issue

[1]:	https://redlik.github.io/millionaire-quiz-game/index.html "Quiz Game"
[2]:	https://chancejs.com/
[3]:	https://youtu.be/u98ROZjBWy8