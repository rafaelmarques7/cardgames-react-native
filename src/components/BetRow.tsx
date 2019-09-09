import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Bet } from 'card-games-typescript';
import { screen } from '../config';
import MyButton from './MyButton';

type BetState = {
  bet: Bet,
}

type BetProps = {
  betValue: number,
  betOn: string
  onSetBet: Function,
  acceptBets: boolean
}

class BetDisplay extends React.Component<BetProps, BetState> {
  constructor(props) {
    super(props);
    this.state = {
      bet: {
        on: props.betOn,
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
          { this.state.bet.on !== 'pass' &&
          <MyButton 
            title={stringBet}
            onPress={() => {this.onSetBet()}} />
          } 
        </View>
        <View style={styles.containerOptions}>
          <MyButton 
            title="Low" 
            style={this.state.bet.on === 'low' ? styles.active : null}
            onPress={() => {this.onSelectBet('low')}} />
          <MyButton 
            title="Draw" 
            style={this.state.bet.on === 'draw' ? styles.active : null}
            onPress={() => {this.onSelectBet('draw')}} />
          <MyButton 
            title="High" 
            style={this.state.bet.on === 'high' ? styles.active : null}
            onPress={() => {this.onSelectBet('high')}} />
        </View>
      </View>
    );    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1/2,
    flexDirection: 'column',
    width: screen.width,
  },
  containerOptions: {
    flex: 1,
    flexDirection: 'row',
  },
  containerAction: {
    flex: 1,
  },
  active: {
    backgroundColor: 'green'
  }
});

export default BetDisplay;
