import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import AnimationContainer from './AnimationContainer'

const Heart = ({ isLive=true, style={}, size=30 }) => {
  return (
    <Icon 
      name={isLive ? 'heart' : 'hearto'} 
      size={size} 
      style={{color: 'red'}}
      />
  )
}

const HeartAnimated = (props) => {
  const animationType = props.isLive ? 'bounceInUp' :  'fadeInUp'
  return(
    <AnimationContainer
      animate={true}
      animationType={animationType}>
      <Heart {...props}/>
    </AnimationContainer>
  )

}

export default HeartAnimated
