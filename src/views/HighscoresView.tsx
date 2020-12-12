import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { stylesApp, colorsApp, animationDelayApp } from '../styles'
import AnimationContainer from '../components/AnimationContainer'
import get from 'lodash.get';

type cProps = {
  fetchHighscoreWorld,
  scores: [{
    numRounds: number,
    points: number,
    date: Date
  }],
  scoresWorld
}

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

class HighscoresView extends React.Component<cProps> {
  state = {
    displayWorld: true,
  }

  componentDidMount() {
    this.props.fetchHighscoreWorld()
  }

  formatDate = (date) => {
    if (!date) {
      return 
    }
    if (typeof(date) === 'string') {
      date = new Date(date)
    }
    return `${months[date.getMonth()]} ${date.getDate()}`
  }

  setDisplayType(displayWorld=false) {
    this.setState({ displayWorld: displayWorld})
  }

  renderDisplayOptions = () => {
    const styleRegular = {...styles.optionItem}
    const styleActive = {...styles.optionItem, ...styles.isActive}
    return (
    <>
      <TouchableOpacity 
        onPress={() => this.setDisplayType(false)}
        style={this.state.displayWorld ? styleRegular : styleActive}
        >
        <Text 
          style={{...styles.textScore, fontSize: 20}}>
          My{'\n'}Highscores</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        onPress={() => this.setDisplayType(true)}
        style={this.state.displayWorld ? styleActive : styleRegular}
      >
        <Text 
          style={{...styles.textScore, fontSize: 20}}>
          World{'\n'}Leaderboard</Text>
      </TouchableOpacity>
    </>
  )
}

  renderNoScoresAvailableView = () => (
    <View>
      <Text style={styles.textScore}>You have no scores yet.</Text> 
      <Text style={styles.textScore}>Play some games first.</Text>
    </View>
  )
  
  renderScores = (scores) => (
    <View style={styles.containerScores}>
      { 
        scores.length === 0 
          ? this.renderNoScoresAvailableView() 
          : null
      }
      { scores
        .sort((a, b) => a.points > b.points)
        .map((score, index) => (
        <AnimationContainer 
          key={`score=${index}`}
          style={styles.containerRow}
          animate={true} 
          iterationDelay={animationDelayApp.highscores.fadeInStart + index*animationDelayApp.highscores.fadeInItemsDelay}
          animationType={index % 2 ? 'slideInLeft' : 'slideInRight'}>
          <View style={styles.containerCellSmall}>
            <Text style={styles.textScore}>{scores.length-index}</Text>
          </View>
          <View style={styles.containerCell}>
            <Text style={styles.textScore}>{score.points}</Text>
          </View>
          <View style={styles.containerCell}>
            <Text style={styles.textScore}>{get(score, 'user.username', '')}</Text>
          </View>
          <View style={styles.containerCell}>
            <Text style={styles.textScore}>{this.formatDate(score.date)}</Text>      
          </View>
        </AnimationContainer>
      ))}
    </View> 
  )

  renderTableHeader = () => (
    <AnimationContainer
      style={styles.containerHeader}
      animate={true} 
      iterationDelay={animationDelayApp.highscores.fadeInStart + animationDelayApp.highscores.fadeInItemsDelay}
      animationType='fadeInUp'>
      <View style={styles.containerCellSmall}>
        <Text style={styles.textScore}>#</Text>
      </View>
      <View style={styles.containerCell}>
        <Text style={styles.textScore}># Points</Text>            
      </View>
      <View style={styles.containerCell}>
        <Text style={styles.textScore}>User</Text>
      </View>
      <View style={styles.containerCell}>
        <Text style={styles.textScore}>Date</Text>
      </View>
    </AnimationContainer>
  )

  render() {
    return (
      <View style={stylesApp.fullScreen}>
        <View style={styles.containerHighscore}>

          <View style={styles.containerTitle}>
            <Text style={styles.titleScore}>Highscores</Text>
          </View>

          <AnimationContainer
            style={styles.containerDisplayOptions}
            animate={true} 
            iterationDelay={animationDelayApp.highscores.fadeInStart + 2*animationDelayApp.highscores.fadeInItemsDelay}
            animationType='fadeInUp'>
            {this.renderDisplayOptions()}
          </AnimationContainer>

          {this.renderTableHeader()}

          <View style={styles.containerTable}>
            {
              this.state.displayWorld 
              ? this.renderScores(this.props.scoresWorld)
              : this.renderScores(this.props.scores)
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
    flex: 1,
  },
  containerCellSmall: {
    flex: 1/2,
  },
  textScore: {
    ...stylesApp.textSubTitle,
    fontSize: 15,
  },
  containerDisplayOptions: {
    flex: 1/7,
    flexDirection: 'row',
    marginTop: 20, 
    marginBottom: 20,
  },
  optionItem: {
    flex: 1,
    margin: 1,
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: colorsApp.brown,
  },
  isActive: {
    borderBottomWidth: 5,
    borderRightWidth: 2,
  }
})

export default HighscoresView
