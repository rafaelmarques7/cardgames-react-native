import React from 'react';
import { animated, useSpring } from "react-spring";
import { StyleSheet, View } from 'react-native';

const AnimatedView = animated(View); 

type cProps = {
  colorFrom: string,
  colorTo: string,
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default class ContainerColorGradient extends React.Component<cProps> {
  constructor(props) {
    super(props)
  }

  render() {
    const { colorFrom, colorTo } = this.props;
    const spring = useSpring({
      config: {
        tension: 170/6, // this slows the animation; 170 is the default value
      },
      from: { 
        backgroundColor: colorFrom
      },
      to: { 
        backgroundColor: colorTo
      }
    });

    return (
      <AnimatedView style={{...style.container, ...spring}}>
        {this.props.children}
      </AnimatedView>
    )
  }
}
