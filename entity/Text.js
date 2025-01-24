
class Text {
  textData;
  fontFamily;
  fontColor;
  fontSize;
  duration;

  position;

  constructor(
    textData,
    fontFamily,
    fontColor,
    fontSize,
    duration,
    position
  ) {
    this.textData = textData ? textData.toUpperCase() : textData;
    this.fontFamily = 'sans-serif';
    this.fontColor = fontColor;
    this.fontSize = parseInt(fontSize)/2;
    this.duration = duration;
    this.position = position;
  }
}

module.exports = { Text };
