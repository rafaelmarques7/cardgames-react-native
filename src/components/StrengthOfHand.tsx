import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { animated, useSpring } from 'react-spring';
import { selectColorFromGradient } from '../logic/strengthLogic';

const AnimatedView = animated(View); 

const TextAnimatedBackgroundColor = ({ text, colorFrom, colorTo }) => {
  const spring = useSpring({
    config: {
      tension: 170/6, // this slows the animation; 170 is the default value
    },
    from: { backgroundColor: colorFrom },
    to: { backgroundColor: colorTo }
  });

  return (
    <AnimatedView style={{...styles.container, ...spring}}>
      <Text style={styles.text}>{text}</Text>
    </AnimatedView>
  )
}

/**
 * Component that visually represents the strength of a hand.
 * Strong hands will be red;
 * Weak hands will be blue;
 * This should be a gradient in fact!
 * It is necessary to show this in a very clear way.
 * Possibly add onTouch event to support this, 
 * and change the text to display info. 
 */
class StrengthOfHand extends React.Component {
  state = {
    isToggled: false,
  }

  toggleState() {
    this.setState({ isToggled: !this.state.isToggled });
    // if the action was to toggle, 
    // set delayed action to reset the toggle.
    if (!this.state.isToggled) {
      setTimeout(this.toggleState.bind(this), 2000);
    }
  }

  render() {
    const { valueHand, numCardsPerHand } = this.props;
    
    const maxValueHand = numCardsPerHand * 14;
    const strengthHand = valueHand/maxValueHand;  

    const colorFrom = selectColorFromGradient(0);
    const colorTo = selectColorFromGradient(strengthHand)

    const textStrength = `${valueHand}/${maxValueHand}`;
    const textInfo = `cards:\n me/max`;

    return (      
      <TouchableOpacity
        onPress={() => {this.toggleState()}}>
        <TextAnimatedBackgroundColor 
          text={this.state.isToggled ? textInfo : textStrength}
          colorFrom={colorFrom}
          colorTo={colorTo} />
      </TouchableOpacity>
    )
  }
} 

const size = 65
const styles = StyleSheet.create({
  container: {
    width: size,
    height: size,
    borderRadius: size/2,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10, 
  }, 
  text: {
    textAlign: 'center',
  }
});

export default StrengthOfHand;
