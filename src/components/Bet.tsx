import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Bet } from 'card-games-typescript';
import MyButton from './MyButton';
import AnimationContainer from './AnimationContainer';
import StrengthOfHand, {validSizes} from './StrengthOfHand';

type BetState = {
  bet: Bet,
  betOn: string,
}

type Odds = {
  low: number,
  draw: number,
  high: number,
}

type BetProps = {
  betValue: number,
  betOn: string
  onSetBet: Function,
  acceptBets: boolean,
  odds: Odds,
  shouldDisplayOdds: boolean,
  oddsDecimalPlaces?: number,
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
      this.props.onSetBet(this.state.bet);
    }
  }

  render() {
    const stringBet = this.state.bet.on === 'pass' 
      ? 'Select Bet' 
      : `Bet ${this.state.bet.ammount}\$ on ${this.state.bet.on}`;

    const { oddsDecimalPlaces = 0 } = this.props

    return (
      <View style={styles.container}>
        {
          this.props.shouldDisplayOdds &&
          <View style={styles.strengthContainer}>
            <StrengthOfHand 
              colorGradient={this.props.odds.low}
              textFront={`${(this.props.odds.low*100).toFixed(oddsDecimalPlaces)}%`}
              textBack={`odds`}
              size={validSizes.small}
            />
            <StrengthOfHand 
              colorGradient={this.props.odds.draw}
              textFront={`${(this.props.odds.draw*100).toFixed(oddsDecimalPlaces)}%`}
              textBack={`odds`}
              size={validSizes.small}
            />
            <StrengthOfHand 
              colorGradient={this.props.odds.high}
              textFront={`${(this.props.odds.high*100).toFixed(oddsDecimalPlaces)}%`}
              textBack={`odds`}
              size={validSizes.small}
            />
          </View>
        }


        <AnimationContainer 
          style={styles.containerOptions}
          animate={this.props.acceptBets && this.state.betOn === 'pass'} 
          animationType='rubberBand' 
          duration={1500}
          iterationCount='infinite'
          iterationDelay={2500}>
          <MyButton 
            title={`Low`}
            style={this.state.bet.on === 'low' ? styles.active : null}
            onPress={() => this.onSelectBet('low')} 
          />
          <MyButton 
            title={`Draw`}
            style={this.state.bet.on === 'draw' ? styles.active : null}
            onPress={() => this.onSelectBet('draw')} 
          />
          <MyButton 
            title={`High`}
            style={this.state.bet.on === 'high' ? styles.active : null}
            onPress={() => this.onSelectBet('high')} 
          />
        </AnimationContainer>
        
        <View style={styles.containerAction}>
          <AnimationContainer
            style={styles.containerAction}
            animate={this.props.acceptBets && this.state.bet.on !== 'pass'} 
            animationType='rubberBand' iterationDelay={2000} duration={2000} iterationCount='infinite'>
            <MyButton 
              title={stringBet}
              onPress={() => this.onSetBet()} 
            />
          </AnimationContainer>
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
