import React from 'react';
import * as Animatable from 'react-native-animatable';
import { StyleSheet } from 'react-native';

type cProps = {
  animate: boolean,
  animationType: string,
  delay: number,
  duration: number,
}

const DEF_ANIMATION='bounce';
const DEF_DELAY = 2500;
const DEF_DURATION = 1500;

class BounceContainer extends React.Component<cProps> {  
  render() {
    let { animate, animationType, delay, duration} = this.props
    animationType = animationType ? animationType : DEF_ANIMATION;
    delay = delay !== undefined ? delay : DEF_DELAY;
    duration = duration ? duration : DEF_DURATION;
    return (
      <Animatable.View
        style={styles.container}
        animation={animate ? animationType : null}
        duration={duration}
        iterationCount={"infinite"}
        iterationDelay={delay}>
        {this.props.children}
      </Animatable.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})


export default BounceContainer;
