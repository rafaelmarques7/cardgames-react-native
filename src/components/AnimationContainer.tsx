import React from 'react';
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';

type cProps = {
  animate?: boolean,
  animationType?: string,
  delay?: number,
  duration?: number,
  count?: any,
  style?: object,
}

const DEF_ANIMATION='bounce';
const DEF_DELAY = 0;
const DEF_DURATION = 2000;
const DEF_COUNT = 1;

class AnimationContainer extends React.Component<cProps> {  
  render() {
    let { animate, animationType, delay, duration, count, style } = this.props
    console.log(animationType, delay, duration, count)

    animationType = animationType ? animationType : DEF_ANIMATION;
    delay = delay !== undefined ? delay : DEF_DELAY;
    duration = duration ? duration : DEF_DURATION;
    count = count ? count : DEF_COUNT;

    return (
      <Animatable.View
        style={{...styles.container, ...style}}
        animation={animate ? animationType : null}
        duration={duration}
        iterationCount={count}
        iterationDelay={delay}>
        {
          this.props.children
        }
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default AnimationContainer;
