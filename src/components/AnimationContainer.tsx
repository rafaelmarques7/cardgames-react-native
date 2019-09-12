import React from 'react';
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';

type cProps = {
  animate?: boolean,
  animationType?: string,
  iterationDelay?: number,
  duration?: number,
  iterationCount?: any,
  style?: object,
}

const DEF_ANIMATION='bounce';
const DEF_DELAY = 0;
const DEF_DURATION = 2000;
const DEF_COUNT = 1;

class AnimationContainer extends React.Component<cProps> {  
  render() {
    let { animate, animationType, iterationDelay, duration, iterationCount, style } = this.props

    animationType = animationType ? animationType : DEF_ANIMATION;
    iterationDelay = iterationDelay ? iterationDelay : DEF_DELAY;
    duration = duration ? duration : DEF_DURATION;
    iterationCount = iterationCount ? iterationCount : DEF_COUNT;

    return (
      <Animatable.View
        style={{...styles.container, ...style}}
        animation={animate ? animationType : null}
        duration={duration}
        iterationCount={iterationCount}
        iterationDelay={iterationDelay}>
        {
          this.props.children
        }
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  }
})

export default AnimationContainer;
