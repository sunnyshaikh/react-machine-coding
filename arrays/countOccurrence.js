const ele = [1, 1, 2, 3, 2, 4, 5, 5, 6, 1];

function countOccurence(arr) {
  const arr1 = arr.reduce((acc, curr) => {
    // one
    // if (acc[curr]) return { ...acc, [curr]: acc[curr] + 1 };
    // return { ...acc, [curr]: 1 };

    // two
    // return { ...acc, [curr]: acc[curr] ? acc[curr] + 1 : 1 };

    // three
    return { ...acc, [curr]: (acc[curr] || 0) + 1 };
  }, {});

  return arr1;
}

function maxOccurring(arr) {
  const obj = countOccurence(arr);

  let max = -Infinity;
  let element = null;

  for (key in obj) {
    if (obj[key] > max) {
      max = obj[key];
      element = key;
    }
  }

  return { [element]: max };
}

console.log(countOccurence(ele));
console.log(maxOccurring(ele));
