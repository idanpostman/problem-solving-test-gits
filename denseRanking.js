const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function calculateDenseRanking(scores, gitsScores) {
  const uniqueScores = [...new Set(scores)].sort((a, b) => b - a);
  const result = [];

  for (const score of gitsScores) {
    let rank = 1;
    while (rank <= uniqueScores.length && score < uniqueScores[rank - 1]) {
      rank++;
    }
    result.push(rank);
  }
  return result;
}

rl.question("Masukkan jumlah pemain: ", (n) => {
  rl.question("Masukkan skor pemain: ", (scoresInput) => {
    const scores = scoresInput.split(" ").map(Number);

    if (scores.some(isNaN)) {
      console.log("\nInput tidak valid. Harap masukkan angka.");
      rl.close();
      return;
    }

    rl.question("Masukkan jumlah permainan GITS: ", (g) => {
      rl.question("Masukkan skor GITS: ", (gitsInput) => {
        const gitsScores = gitsInput.split(" ").map(Number);

        if (gitsScores.some(isNaN)) {
          console.log("\nInput tidak valid. Harap masukkan angka.");
          rl.close();
          return;
        }

        const result = calculateDenseRanking(scores, gitsScores);

        console.log("\nHasil Peringkat GITS:");
        console.log(result.join(" "));

        rl.close();
      });
    });
  });
});