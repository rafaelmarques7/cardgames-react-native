import { Card } from 'card-games-typescript';

// function to translate a card to the corresponding SVG filename
export const cardToId = (card: Card) => { 
  return `${card.rank}${card.suite[0].toUpperCase()}`;
}

export const cardToSvgPath = (card: Card, assetsPath="../../assets") => {
  const filename = `${card.rank}${card.suite[0].toUpperCase()}`;
  const svgPath = `${assetsPath}/${filename}.svg`
  return svgPath
}

function randomChoice(arr) {
  return arr[Math.floor(arr.length * Math.random())];
}

export const randomCard = () => {
  const suites = ['diamonds', 'hearts', 'spades', 'clubs']
  const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']
  const card =  {
    rank: randomChoice(ranks), 
    suite: randomChoice(suites)
  }
  return card
}