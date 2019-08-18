import { Card } from 'card-games-typescript';

// function to translate a card to the corresponding SVG filename
export const cardToId = (card: Card) => { 
  console.log(`cardToId received: ${JSON.stringify(card)}`);
  return `${card.rank}${card.suite[0].toUpperCase()}`;
}

export const cardToSvgPath = (card: Card, assetsPath="../../assets") => {
  const filename = `${card.rank}${card.suite[0].toUpperCase()}`;
  const svgPath = `${assetsPath}/${filename}.svg`
  return svgPath
}
