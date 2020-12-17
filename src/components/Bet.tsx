import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Bet } from 'card-games-typescript';
import { screen } from '../config';
import MyButton from './MyButton';
import AnimationContainer from './AnimationContainer';
import StrengthOfHand from './StrengthOfHand';

type BetState = {
  bet: Bet,
  betOn: string,
}

type BetProps = {
  betValue: number,
  betOn: string
  onSetBet: Function,
  acceptBets: boolean,
  odds: object,
}

class BetDisplay extends React.Component<BetProps, BetState> {
  constructor(props) {
    super(props);
    this.state = {
      betOn: props.betOn,
      bet: {
        on: props.betOn,
        ammount: props.betValue,
      },
    }
  }

  componentDidUpdate(prevProps) {
    // resets the bet type if the store state changed
    if (this.props.betOn !== prevProps.betOn) {
      this.setState({ betOn: this.props.betOn})
      this.onSelectBet(this.props.betOn)
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
        <View style={styles.strengthContainer}>
          <StrengthOfHand 
            valueHand={10} 
            numCardsPerHand={2} 
          />
          <StrengthOfHand 
            valueHand={10} 
            numCardsPerHand={2} 
          />
          <StrengthOfHand 
            valueHand={10} 
            numCardsPerHand={2} 
          />
        </View>

        <AnimationContainer 
          style={styles.containerOptions}
          animate={this.props.acceptBets && this.state.betOn === 'pass'} 
          animationType='rubberBand' 
          duration={1500}
          iterationCount='infinite'
          iterationDelay={2500}>
          <MyButton 
            title={`Low (${this.props.odds.low*100}%)`}
            style={this.state.bet.on === 'low' ? styles.active : null}
            onPress={() => {this.onSelectBet('low')}} 
          />
          <MyButton 
            title={`Draw`}
            style={this.state.bet.on === 'draw' ? styles.active : null}
            onPress={() => {this.onSelectBet('draw')}} 
          />
          <MyButton 
            title={`High`}
            style={this.state.bet.on === 'high' ? styles.active : null}
            onPress={() => {this.onSelectBet('high')}} 
          />
        </AnimationContainer>
        <View style={styles.containerAction}>
          { this.state.bet.on !== 'pass' && 
            <AnimationContainer
              style={{flex: 1}}
              animate={this.props.acceptBets} 
              animationType='rubberBand' iterationDelay={2000} duration={2000} iterationCount='infinite'>
              <MyButton 
                title={stringBet}
                onPress={() => {this.onSetBet()}} />
            </AnimationContainer>
          } 
        </View>
      </View>
    );    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 2/5,
    flexDirection: 'column',
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
  },
  strengthContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  }
});

export default BetDisplay;
