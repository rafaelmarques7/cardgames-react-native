import { StyleSheet } from "react-native"
import { screen } from "./config"

export const blueLightBackground = '#90caf9'
export const greyMedium = '#757575'
export const brown = '#4d2f00'

export const colorsApp = {
  blueLightBackground: '#90caf9',
  greyMedium: '#757575',
  brown: '#4d2f00',
  cream: '#efc050',  
}

export const animationDelayApp = {
  highscores: {
    fadeInStart: 200,
    fadeInItemsDelay: 100,
  },
}

export const stylesApp = StyleSheet.create({
  fullScreen: {
    flex: 1,
    paddingTop: (screen.heightScreen - screen.heightWindow) / 2,
    backgroundColor: 'green',
  },
  textSubTitle: {
    fontFamily: 'Roboto',
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
  },
  fontLarge: {
    fontSize: 80,
  },
  fontSmall: {
    fontSize: 30
  },
})
