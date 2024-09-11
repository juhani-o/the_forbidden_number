function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const table = [];

export function getStage1Table(rows, cols) {
  console.log("game table ", rows, cols);
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      const num1 = getRandomNumber(1, 15); // Satunnainen numero välillä 1-15
      const blur = getRandomNumber(3, 7); // Satunnainen numero välillä 0-5
      const clicked = false; // Boolean-arvo clicked
      row.push({ num1, blur, clicked }); // Lisätään objekti riviin
    }
    table.push(row); // Lisätään rivi taulukkoon
  }
  return table;
}
