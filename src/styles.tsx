import { StyleSheet } from "react-native"
import { screen } from "./config"

export const colorsApp = {
  cream: '#efc050',
}

export const blueLightBackground = '#90caf9'
export const greyMedium = '#757575'
export const brown = '#4d2f00'

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
  }
})
