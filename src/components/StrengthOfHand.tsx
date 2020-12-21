import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { animated, useSpring } from 'react-spring';
import { selectColorFromGradient } from '../logic/strengthLogic';

const AnimatedView = animated(View); 

const TextAnimatedBackgroundColor = ({ text, colorFrom, colorTo, size }) => {
  const spring = useSpring({
    config: {
      tension: 170/6, // this slows the animation; 170 is the default value
    },
    from: { backgroundColor: colorFrom },
    to: { backgroundColor: colorTo }
  });

  const styles = createStyle(size)

  return (
    <AnimatedView style={{...styles.container, ...spring}}>
      <Text style={styles.text}>{text}</Text>
    </AnimatedView>
  )
}

export enum validSizes {
  small,
  medium,
  large,
}

type cProps = {
  colorGradient: number, // between 0 and 1
  textFront: string,
  textBack?: string,
  size?: validSizes,
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
class StrengthOfHand extends React.Component<cProps> {
  state = {
    isToggled: false,
  }

  toggleState() {
    this.setState({ 
      isToggled: !this.state.isToggled,
    });
    if (!this.state.isToggled) {
      setTimeout(this.toggleState.bind(this), 2000);
    }
  }

  render() {
    const { textFront, textBack, colorGradient, size = validSizes.medium } = this.props;

    const colorFrom = selectColorFromGradient(0);
    const colorTo = selectColorFromGradient(colorGradient)

    return (      
      <TouchableOpacity
        onPress={() => this.toggleState()}
      >
        <TextAnimatedBackgroundColor 
          text={this.state.isToggled ? textBack : textFront}
          colorFrom={colorFrom}
          colorTo={colorTo} 
          size={size}
        />
      </TouchableOpacity>
    )
  }
} 

const createStyle = (size: validSizes) => {
  let iconSize = 65
  if (size === validSizes.small) {
    iconSize = 50
  } else if (size === validSizes.large) {
    iconSize = 80
  }

  return StyleSheet.create({
    container: {
      width: iconSize,
      height: iconSize,
      borderRadius: iconSize/2,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 10, 
    }, 
    text: {
      textAlign: 'center',
      fontWeight: 'bold',
    }
  })
};

export default StrengthOfHand;
