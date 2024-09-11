function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getStage1Table(rows, cols, level) {
  let table = [];
  for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < cols; j++) {
      const num1 = getRandomNumber(1, 15); // numbers to use in blocks
      const blur = getRandomNumber(1 + level, 5 + level); // random blur, add level to make harder to guess number
      const clicked = false; // Boolean clicked
      row.push({ num1, blur, clicked });
    }
    // Lets ensure we have enough number 13
    for (let k = 0; k < cols / 3; k++) {
      row[k]["num1"] = 13;
    }
    row = row.sort(() => Math.random() - 0.5);

    table.push(row); // Lisätään rivi taulukkoon
  }
  return table;
}
