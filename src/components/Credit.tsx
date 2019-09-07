import React, { useState, useEffect } from 'react';
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

  // declare the two possible animations
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
      <View>
        <Text style={styles.text}>{ammount}</Text>        
      </View>
      <View style={styles.imageContainer}>
        <AnimatedImage
          style={{...styles.image, ...spring}}
          source={require('../../assets/gold-coins.png')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 17,
    marginRight: 5,
    marginBottom: 3,
  },
  image: {
    height: 20,
    width: 20,
  },
  imageContainer: {
    width: 35,                    // by fixing the width of the container, 
    height: 35,                   // it does not interfere with the other components
    justifyContent: 'center',
  },
});

export default CreditPlayer;
