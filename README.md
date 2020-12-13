# Game 

Game description. Add GIF here, if availble. Add link to Play Store.

- [Game](#game)
  - [Installation and Usage](#installation-and-usage)
  - [Game phases](#game-phases)
    - [Machine State diagram](#machine-state-diagram)
  - [Flip card animation](#flip-card-animation)
  - [Re-thinking the game](#re-thinking-the-game)
  - [World Leader Board](#world-leader-board)
  - [Desired features](#desired-features)
  - [Refactors to consider](#refactors-to-consider)
  - [Useful links](#useful-links)

---

## Installation and Usage

Requirements:
* Make sure you have *expo-cli* installed globally: `npm install -g expo-cli`
* Make sure you have *Android Studio* and an appropriate emulator installed

Setup:
* Clone this repo
* Run `npm install`

To run on virtual Android phone:
* Run the android emulator (locally: `run-android-device`)
* Run `npm run android` and click `a` to run on android emualtor
  
Note:
* This app uses AWS Amplify, and you may need to initialise amplify before using it `amplify init`
* This app uses an API key to talk with Amplify on the backend. This key has a validation of one year and will expire on the 12-12-2021.

---

## Building and deploying

1. Increment the `android.versionCode` on the [app.json](./app.json) file
2. Build the android bundle: `expo build:android -t apk`
3. Go the [google developer console](https://play.google.com/console/) and upload the bundle

---

## Game phases

What are the phases of this game, and how does it evolve? 

Write the machine state diagram for this game.

### Machine State diagram

* State 0) **Deal mode** 
  * game has not started.
* Action 0) **Deal action** 
  * player clicks the deal button to start the game; player gets cards.
* State 1) **Bet mode** 
  * game has started and player has cards.
* Action 1) **Bet action** 
  * player sets a bet.
* State 2) **End Game mode** 
  * S2.1) **showdown** mode 
    * the dealer shows his cards.
  * S2.2) **payoff** mode 
    * the dealers pays potential profit to the player.
  * S2.3) round-end mode 
    * the round is complete; game may return to state State 0).

This may be translated to *state*, as follows:
```javascript
const gameState = {
  dealMode: true,
  betMode: false,
  endMode: false,
}
```

## Flip card animation

The flip card animation was achieved by following a sample tutorial, together with some minor refactors and cleanups. [Video](https://codedaily.io/screencasts/12/Create-a-Flip-Card-Animation-with-React-Native) and [code](https://github.com/browniefed/examples/tree/animated_basic/flip) for further reference.
 
## Re-thinking the game

I want to make the game more exciting, and make it last longer.

I am thinking this: we need to increase the stakes:
* double or nothing
* live, live, live, die

The player has 3 lifes, and if they loose the bet, they loose a life.
If the player looses all 3 lifes, they loose the game.
The player starts with 5 coins, and the bet is always all in, double or nothing.
At the end of the game, the score of the player may be tracked in a "highscore section".

Note that the game may never end, as long as the player places the right bet.
Note also that there is only one deck, but when no more cards are available, it is reset.

Given the current state of the application, what is necessary to achieve this?

* Screens: 
  * HomeScreen - 
    * serves as the introduction for our application.
    * links to:
      * play
      * how to play section
      * highscores
* Game logic:
  * track the lifes of the player;
  * betting system;
  * "Game over" modal - should also display "new highscore" if that is the case...
  * state management regarding all of the above
  * reset deck;

## World Leader Board

The setup should be as follows:

* load WLB highscores on application start.
* on game loose:
  * update local leaderboard
  * update world leaderboard (always!)

## Desired features

* Animation speed control
* Backgroundcolor control
* Ability to show odds of any hand

## Refactors to consider

* Move all styles to one stylesheet
* Ability to better control and manipulate animation speed
* API keys
* unit-tests
* linter
* ci/cd 

## Useful links

* https://facebook.github.io/react-native/docs/navigation
* https://github.com/oblador/react-native-animatable
* User authentication will be managed by AWS Amplify.
[This article](https://alligator.io/react/react-native-authentication/) is a good reference.