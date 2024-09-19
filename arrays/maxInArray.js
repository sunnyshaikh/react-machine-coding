const ele = [5, 3, 2, 6, 8, 1, 4];

function maxElement(ele) {
  // with sorting
  // return ele.sort((a, b) => a - b)[ele.length - 1];

  // w/o sorting
  let max = -Infinity;
  for (n of ele) {
    if (n > max) max = n;
  }
  return max;
}

console.log(maxElement(ele));
