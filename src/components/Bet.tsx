import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Bet } from 'card-games-typescript';
import { screen } from '../config';
import MyButton from './MyButton';

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
          ...this.state.bet,
          ammount: this.state.bet.ammount + delta,
        }
      })
    }
  }

  onSelectBet(option) {
    this.setState({
      bet: {
        ...this.state.bet,
        on: option
      }
    });
  }

  onSetBet() {
    if (this.props.acceptBets) {
      this.props.onSetBet(this.state.bet); // callback function that dispatches action to set bet
    }
  }

  render() {
    const stringBet = `Bet ${this.state.bet.ammount}\$ on ${this.state.bet.on !== 'pass' ? this.state.bet.on : '?'}`;
    return (
      <View style={styles.container}>
        <View style={styles.containerAction}>
          <MyButton 
            title={stringBet}
            onPress={() => {this.onSetBet()}} />
        </View>
        <View style={styles.containerSelection}>
          <View style={styles.containerBetAmmount}>
            <MyButton 
              title="+" 
              onPress={() => {this.onSetAmmount(true)}} />            
            <MyButton 
              title="-" 
              onPress={() => {this.onSetAmmount(false)}} />
          </View>
          <View style={styles.containerBetType}>
            <MyButton 
              title="low" 
              onPress={() => {this.onSelectBet('low')}} />
            <MyButton 
              title="draw" 
              onPress={() => {this.onSelectBet('draw')}} />
            <MyButton 
              title="high" 
              onPress={() => {this.onSelectBet('high')}} />
          </View>
        </View>
      </View>
    );    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2/3,
    flexDirection: 'column',
    width: screen.width * 0.4,
  },
  containerSelection: {
    flex: 1,
    flexDirection: 'row',
  },
  containerAction: {
    flex: 2/5,
    paddingBottom: 7,
  },
  containerBetAmmount: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 5,
  },
  containerBetType: {
    flex: 1,
  },
  containerButton:{
    flex: 1,
  },
});

export default BetDisplay;
