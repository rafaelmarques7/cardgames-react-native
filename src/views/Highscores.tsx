import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { stylesApp, colorsApp } from '../styles'
import AnimationContainer from '../components/AnimationContainer'
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { actionUpdateHighscore } from '../stateHandle/actions'

const formatDate = (date) => {
  if (typeof(date) === 'string') {
    date = new Date(date)
  }
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}


type cProps = {
  scores: [{
    numRounds: number,
    points: number,
    date: Date
  }]
}

class HighScoreView extends React.Component<cProps> {
  render() {
    const { scores } = this.props

    return (
      <View style={stylesApp.fullScreen}>
        <View style={styles.containerHighscore}>

          {/* TITLE */}
          <View style={styles.containerTitle}>
            <Text style={styles.titleScore}>Highscores</Text>
          </View>

          {/* HEADER */}
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

           {/* ROWS  */}
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
                  <Text style={styles.textScore}>{formatDate(score.date)}</Text>      
                </View>
              </AnimationContainer>
            ))}
          </View> 
        
        </View>
      </View>
    )
  }
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

const mapStateToProps = state => {
  console.log(state.highscores)
  return {
    scores: state.highscores.highscores,
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    actionUpdateHighscore
  }, dispatch)
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(HighScoreView)

