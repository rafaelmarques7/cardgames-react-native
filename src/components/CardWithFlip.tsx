import React from 'react';
import Card from './Card';
import { StyleSheet, View, Animated } from 'react-native';

/**
 * This is an extension of the Card component,
 * that includes a 3D "flip" transition.
 * 
 */
class CardWithFlip extends React.Component {
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
    this.animatedValue.addListener(({ value }) => {
      this.value = value;
    })
    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg'],
    })
    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '360deg']
    })
    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })
    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  flipCard() {
    if (this.value >= 90) {
      Animated.spring(this.animatedValue,{
        toValue: 0,
        friction: 8,
        tension: 10
      }).start();
    } else {
      Animated.spring(this.animatedValue,{
        toValue: 180,
        friction: 8,
        tension: 10
      }).start();
    }
  }

  componentDidUpdate() {
    if (this.props.flipCards) {
      this.flipCard()
    }
  }

  render() {
    const frontAnimatedStyle = {
      transform: [
        { rotateY: this.frontInterpolate }
      ]
    }
    const backAnimatedStyle = {
      transform: [
        { rotateY: this.backInterpolate }
      ]
    }
    const { cardObject } = this.props;

    return (
      <View>
        <Animated.View 
          style={{
            ...frontAnimatedStyle, 
            ...{opacity: this.frontOpacity}}}>
          <Card 
            cardObject={null} 
            backOfDeck={true} />
        </Animated.View>

        <Animated.View 
          style={{
            ...styles.cardBack, 
            ...backAnimatedStyle, 
            ...{opacity: this.backOpacity}}}>
          <Card 
            cardObject={cardObject} 
            backOfDeck={cardObject ? false : true} />
        </Animated.View>
      </View>
    )
  }
} 

const styles = StyleSheet.create({
  cardBack: {
    position: 'absolute',
    top: 0,
  },
});

export default CardWithFlip;
