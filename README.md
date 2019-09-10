# Game 

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
* add redux persist;
* add testing for state management and basic game logic;

## User authentication

User authentication will be managed by AWS Amplify.
[This article](https://alligator.io/react/react-native-authentication/) is a good reference.


## Animable

https://github.com/oblador/react-native-animatable

## Navigation

https://facebook.github.io/react-native/docs/navigation