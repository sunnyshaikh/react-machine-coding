const ele = [1, 2, 2, 3, 1, 4, 5, 4, 6];

function removeDuplicates(arr) {
  const arr1 = [];

  // inbuilt
  // for (n of arr) {
  //   if (!arr1.includes(n)) arr1.push(n);
  // }

  // Set (efficient)
  // return [...new Set(arr)];

  // w/o inbuilt
  for (n of arr) {
    if (arr1.indexOf(n) === -1) arr1.push(n);
  }

  return arr1;
}

console.log(removeDuplicates(ele));
