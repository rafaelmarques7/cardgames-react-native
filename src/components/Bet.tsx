import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Bet, Payoffs } from 'card-games-typescript';

interface BetProps {
  bet: Bet;
  payoffRates: Payoffs,
}

const BetDisplay: React.SFC<BetProps> = ({ bet, payoffRates }) => {
  const pp = bet.ammount * payoffRates[bet.on];
  return (
    <View>
      <Text>bet: {bet.ammount}$ on {bet.on}</Text>
      <Text>potential payoff: {pp}$</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
  }
});


export default BetDisplay;
