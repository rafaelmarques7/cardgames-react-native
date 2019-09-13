import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { stylesApp, colorsApp } from '../styles'
import AnimationContainer from '../components/AnimationContainer'

const scoresList = [
  { numRounds: 3, points: 8, dateStr: '13/09/19' },
  { numRounds: 4, points: 16, dateStr: '13/09/19' },
  { numRounds: 3, points: 8, dateStr: '13/09/19' },
  { numRounds: 3, points: 8, dateStr: '13/09/19' },
  { numRounds: 5, points: 32, dateStr:'13/09/19' },
]

const HighScoreView = ({ scores=scoresList }) => {
  return (
    <View style={stylesApp.fullScreen}>
      <View style={styles.containerHighscore}>
        <View style={styles.containerTitle}>
          <Text style={styles.titleScore}>Highscores</Text>
        </View>
        <AnimationContainer
          style={styles.containerHeader}
          animate={true} 
          iterationDelay={300}
          animationType='fadeInUp'>
          <View style={styles.containerCell}>
            <Text style={styles.textScore}># Rounds</Text>
          </View>
          <View style={styles.containerCell}>
            <Text style={styles.textScore}># Points</Text>            
          </View>
          <View style={styles.containerCell}>
            <Text style={styles.textScore}>Date</Text>
          </View>
        </AnimationContainer> 
        <View style={styles.containerScores}>
          { scores
            .sort((a, b) => a.points > b.points)
            .map((score, index) => (
            <AnimationContainer 
              key={`score=${index}`}
              style={styles.containerRow}
              animate={true} 
              iterationDelay={500 + index*200}
              animationType={index % 2 ? 'slideInLeft' : 'slideInRight'}>
              <View style={styles.containerCell}>
                <Text style={styles.textScore}>{score.numRounds}</Text>
              </View>
              <View style={styles.containerCell}>
                <Text style={styles.textScore}>{score.points}</Text>
              </View>
              <View style={styles.containerCell}>
                <Text style={styles.textScore}>{score.dateStr}</Text>      
              </View>
            </AnimationContainer>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  containerHighscore: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
  },
  containerTitle: {
    flex: 1/5,
    marginTop: 20,
    marginBottom: 20,
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderBottomColor: 'white',
    borderTopColor: 'white',
    justifyContent: 'center'
  },
  titleScore: {
    ...stylesApp.textSubTitle
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 3,
    borderBottomColor: colorsApp.cream,
    marginBottom: 10,
    marginTop: 10,
    paddingBottom: 5,
    alignSelf: 'center',
  },
  containerScores: {
    flexDirection: 'column-reverse',
  },
  containerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  containerCell: {
    flex: 1/3,
  },
  textScore: {
    ...stylesApp.textSubTitle,
    fontSize: 20,
  },
})

export default HighScoreView
