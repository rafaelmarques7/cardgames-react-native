import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Bet } from 'card-games-typescript';
import { screen } from '../config';
import MyButton from './MyButton';

type BetState = {
  bet: Bet,
}

type BetProps = {
  betValue: number,
  onSetBet: Function,
  acceptBets: boolean
}

class BetDisplay extends React.Component<BetProps, BetState> {
  constructor(props) {
    super(props);
    this.state = {
      bet: {
        on: 'pass',
        ammount: props.betValue,
      }
    }
  }

  componentDidUpdate(prevProps) {
    // resets the bet type if betValue (credit) changes
    if(prevProps.betValue !== this.props.betValue) {
      this.onSelectBet('pass')
    }
  }  

  onSelectBet(option) {
    this.setState({
      bet: {
        ammount: this.props.betValue,
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
          <View style={styles.containerBetType}>
            <MyButton 
              title="High" 
              onPress={() => {this.onSelectBet('high')}} />
            <MyButton 
              title="Draw" 
              onPress={() => {this.onSelectBet('draw')}} />
            <MyButton 
              title="Low" 
              onPress={() => {this.onSelectBet('low')}} />
          </View>
        </View>
      </View>
    );    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    width: screen.width * 0.4,
  },
  containerSelection: {
    flex: 3,
    flexDirection: 'row',
  },
  containerAction: {
    flex: 1,
    paddingBottom: 7,
  },
  containerBetType: {
    flex: 1,
  },
  containerButton:{
    flex: 1,
  },
});

export default BetDisplay;