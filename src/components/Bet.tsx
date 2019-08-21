import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Bet } from 'card-games-typescript';

type BetState = {
  bet: Bet,
}

type BetProps = {
  betMaximum: number,
  onSetBet: Function,
  acceptBets: boolean
}

class BetDisplay extends React.Component<BetProps, BetState> {
  constructor(props) {
    super(props);
    this.state = {
      bet: {
        on: 'pass',
        ammount: 1,
      }
    }
  }

  onSetAmmount(increase=true) {
    const delta = increase ? 1 : -1; // decide if we add or subtract
    const isValidBet = (increase && this.state.bet.ammount < this.props.betMaximum)
      || (!increase && this.state.bet.ammount > 1)
    if (this.props.acceptBets && isValidBet) {
      this.setState({
        bet: {
          ammount: this.state.bet.ammount + delta,
        }
      })
    }
  }

  onSelectBet(option) {
    const state = Object.assign({}, this.state); // copy state to object to be manipulated
    state.bet.on = option;
    if (this.props.acceptBets) {
      this.props.onSetBet(state.bet); // callback function that dispatches action to set bet
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Button title="low" onPress={() => {this.onSelectBet('low')}} />
          <Button title="draw" onPress={() => {this.onSelectBet('draw')}} />
          <Button title="high" onPress={() => {this.onSelectBet('high')}} />
        </View>
        <View>
          <Button title="+" onPress={() => {this.onSetAmmount(true)}} />
          <Button title="-" onPress={() => {this.onSetAmmount(false)}} />
          <Text>Bet: {this.state.bet.ammount}$ on {this.state.bet.on !== 'pass' ? this.state.bet.on : 'playerToDecide'} </Text>
        </View>
      </View>
    );    
  }

}

const styles = StyleSheet.create({
  container: {
    top: 200,
  }
});

export default BetDisplay;
