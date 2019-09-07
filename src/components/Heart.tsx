import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'

const Heart = ({ isLive=true, style={}, size=25 }) => {
  return (
    <Icon 
      name={isLive ? 'heart' : 'hearto'} 
      size={size} 
      style={{color: 'red'}}
      />
  )
}


export default Heart
