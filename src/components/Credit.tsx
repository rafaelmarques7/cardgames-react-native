import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { animated, useSpring } from 'react-spring';

const AnimatedImage = animated(Image)

const CreditPlayer = ({ ammount }) => {
  // set state to track credit change
  const [credit, setCredit] = useState(0);

  // this is called on prop or state update
  useEffect(() => {
    if (credit !== ammount) {
      setTimeout(setCredit, 1500, ammount)
    }
  })

  // declare possible animations
  const springLarger = useSpring({
    from: { width: 20, height: 20 },
    to: async (next) => {
      await next({ width: 27, height: 27})
      await next({ width: 20, height: 20},)
    }
  })

  const springSmaller = useSpring({
    from: { width: 20, height: 20 },
    to: async (next) => {
      await next({ width: 15, height: 15})
      await next({ width: 20, height: 20},)
    }
  })

  // select animation
  let spring = {}
  if (ammount > credit) { spring = springLarger }
  if (ammount < credit) { spring = springSmaller }

  return (
    <View style={styles.container}>
      <AnimatedImage
        style={{...styles.image, ...spring}}
        source={require('../../assets/gold-coins.png')} />
      <Text 
        style={styles.text}>
        {ammount}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 30,
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 7,
  },
  image: {
    height: 20,
    width: 20,
    marginBottom: 7,
  }
});


export default CreditPlayer;
