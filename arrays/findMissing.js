const ele = [1, 2, 3, 5, 6, 7, 8];
const n = 8;

function findMissing(arr, n) {
  let sum = (n * (n + 1)) / 2;
  let arrSum = arr.reduce((a, c) => a + c);

  return sum - arrSum;
}

console.log(findMissing(ele, n));
