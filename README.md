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