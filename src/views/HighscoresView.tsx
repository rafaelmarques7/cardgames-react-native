import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { stylesApp, colorsApp, blueLightBackground, brown } from '../styles'
import AnimationContainer from '../components/AnimationContainer'

type cProps = {
  actionUpdateHighscore,
  actionGetHighscoreWorld,
  actionSetHighscoreWorld,
  fetchHighscoreWorld,
  scores: [{
    numRounds: number,
    points: number,
    date: Date
  }],
  scoresWorld
}

class HighscoresView extends React.Component<cProps> {
  state = {
    displayWorld: false
  }

  componentDidMount() {
    // this.props.fetchHighscoreWorld()
  }

  formatDate = (date) => {
    if (typeof(date) === 'string') {
      date = new Date(date)
    }
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
  }

  setDisplayType(displayWorld=false) {
    this.setState({ displayWorld: displayWorld})
  }

  renderDisplayOptions = () => (
    <>
      <TouchableOpacity 
        onPress={() => this.setDisplayType(false)}
        style={{
          ...styles.optionItem, 
          backgroundColor: !this.state.displayWorld ? 'green' : brown
        }}>
        <Text 
          style={styles.textScore}>
          My Highscores</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        onPress={() => this.setDisplayType(true)}
        style={{
          ...styles.optionItem, 
          backgroundColor: this.state.displayWorld ? 'green' : brown
        }}>
        <Text 
          style={styles.textScore}>
          World Leaderboard</Text>
      </TouchableOpacity>
    </>
  )
  
  renderScores = (scores) => (
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
            <Text style={styles.textScore}>{this.formatDate(score.date)}</Text>      
          </View>
        </AnimationContainer>
      ))}
    </View> 
  )

  render() {
    return (
      <View style={stylesApp.fullScreen}>
        <View style={styles.containerHighscore}>

          {/* TITLE */}
          <View style={styles.containerTitle}>
            <Text style={styles.titleScore}>Highscores</Text>
          </View>

          {/* DISPLAY OPTIONS */}
          <AnimationContainer
            style={styles.containerDisplayOptions}
            animate={true} 
            iterationDelay={400}
            animationType='fadeInUp'>
            {this.renderDisplayOptions()}
          </AnimationContainer>

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

          {/* TABLE */}
          <View style={styles.containerTable}>
            {/* ROWS MY HIGHSCORE */}
            { !this.state.displayWorld &&            
              this.renderScores(this.props.scores)
            }

            {/* ROWS WORLD LEADERBOARD  */}
            { this.state.displayWorld &&            
              this.renderScores(this.props.scoresWorld)
            }
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
  containerTable: {
    flex: 1
  },
  containerHeader: {
    // flex: 1/10,
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
  containerDisplayOptions: {
    flex: 1/10,
    flexDirection: 'row',
  },
  optionItem: {
    flex: 1,
    alignSelf: 'center',
  }
})

export default HighscoresView
