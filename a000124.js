const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin, 
  output: process.stdout 
});

function solveA000124(n) {
  if (n <= 0) {
    return "Input harus berupa angka positif.";
  }
  let result = [];
  let currentValue = 1;
  for (let i = 0; i < n; i++) {
    result.push(currentValue);
    currentValue = currentValue + (i + 1);
  }
  return result.join('-');
}

rl.question('Masukkan angka: ', (input) => {

  const number = parseInt(input);

  if (isNaN(number)) {
    console.log('Input tidak valid. Harap masukkan angka.');
  } else {
    const output = solveA000124(number);
    console.log(`Output: ${output}`);
  }

  rl.close();
});