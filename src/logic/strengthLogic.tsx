/**
 * This file supports the <StrengthOfHand /> component
 * 
 */


/**
 * Sets colours to create a gradient.
 * Colors: variations of light blue, green and red
 */
export const percentColors = [
  { pct: 0.0, color: { r: 0x33, g: 0x33, b: 0xcc } },
  { pct: 0.5, color: { r: 0x66, g: 0xad, b: 0x00 } },
  { pct: 1.0, color: { r: 0xff, g: 0x33, b: 0x00 } }, 
];

/**
 * Selects a color from a gradient
 * @param pct - value between 0 and 1
 */
export const selectColorFromGradient = (pct) => {
  for (var i = 1; i < percentColors.length - 1; i++) {
      if (pct < percentColors[i].pct) {
          break;
      }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (pct - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
      r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
      g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
      b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
  };
  return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
}  

