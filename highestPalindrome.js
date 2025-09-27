const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function findHighestPalindrome(s, k) {
  const n = s.length;
  let arr = s.split('');
  let originalArr = s.split('');
  let changes = { k: k };

  function makePalindrome(left, right) {
    if (left >= right) return;

    if (arr[left] !== arr[right]) {
      changes.k--;
      if (arr[left] > arr[right]) {
        arr[right] = arr[left];
      } else {
        arr[left] = arr[right];
      }
    }

    makePalindrome(left + 1, right - 1);
  }

  makePalindrome(0, n - 1);

  if (changes.k < 0) {
    return "-1";
  }

  function maximize(left, right) {
    if (left > right || changes.k <= 0) return;

    if (left === right) {
      if (changes.k > 0) arr[left] = '9';
      return;
    }

    if (arr[left] < '9') {
      if (originalArr[left] === originalArr[right]) {
        if (changes.k >= 2) {
          arr[left] = '9';
          arr[right] = '9';
          changes.k -= 2;
        }
      } 
      else {
        if (changes.k >= 1) {
          arr[left] = '9';
          arr[right] = '9';
          changes.k -= 1;
        }
      }
    }
    maximize(left + 1, right - 1);
  }

  maximize(0, n - 1);
  return arr.join('');
}

rl.question('Masukkan angka: ', (s) => {
  if (!/^\d+$/.test(s)) {
    console.log("\nInput tidak valid. String hanya boleh berisi angka.");
    rl.close();
    return;
  }

  rl.question('Masukkan nilai k: ', (kStr) => {
    const k = parseInt(kStr);
    if (isNaN(k) || k < 0) {
      console.log("\nInput tidak valid. Nilai k harus berupa angka positif.");
      rl.close();
      return;
    }

    const hasil = findHighestPalindrome(s, k);

    console.log(`\nOutput: ${hasil}`);

    if (hasil !== "-1" && hasil !== s) {
      console.log(`Penjelasan: Dari bentuk palindrom yang diperoleh maka highest palindrome-nya adalah ${hasil} dikarenakan ${hasil} > ${s}.`);
    } else if (hasil !== "-1" && hasil === s) {
      console.log(`Penjelasan: Input sudah merupakan bentuk palindrom tertinggi yang bisa dibentuk dengan ${k} perubahan.`);
    }
    
    rl.close();
  });
});