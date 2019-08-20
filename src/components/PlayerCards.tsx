import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './Card';

const PlayersCards = ({ cards, displayCards=true, username=''}) => {
  return (
    <View style={styles.container}>
      <View style={styles.cards}>
      { cards.map((card, index) => {
          return (
            <Card 
              key={`card-${index}`}
              cardObject={card} 
              backOfDeck={!displayCards}
            />
          );
        })
      }
      </View>
      <Text style={styles.text}>{username}</Text>
    </View>
  );
}

// const PlayersCards = (player: PlayerHighLow) => {
//   return (
//     <View>
//       <Text>{player.username}</Text>
//     </View>
//   )
// }

// interface Props {
//   player: PlayerHighLow;
//   displayCards: boolean;
// }

// const PlayersCards: React.SFC<Props> = ({ player, displayCards }) => {
//   console.log(`inside PlayerCards\n\tplayer: ${JSON.stringify(player)}\n\tdisplayCards:${displayCards}`);
//   return (
//     <View style={styles.container}>
//       <View style={styles.cards}>
//       {
//         player.cards.cards.map((card, index) => {
//           return (
//             <Card 
//               key={`card-${player.username}-${index}`}
//               cardObject={card} 
//               backOfDeck={!displayCards}
//             />
//           );
//         })
//       }
//       </View>
//       <Text style={styles.text}>{player.username}</Text>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  cards: {
    flexDirection: 'row',
    marginLeft: 100,
  },
  text: {
    textAlign: 'center',
  },
  container: {
    top: 150,
    margin: 10,
    borderTopColor: 'black',
    borderTopWidth: 1,
    borderTopLeftRadius: 70,
    borderTopRightRadius: 70,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  }
});

export default PlayersCards;
