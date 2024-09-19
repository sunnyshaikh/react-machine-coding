const string = "Hello world";

function reverseString(str) {
  // inbuilt
  // return str.split("").reverse().join("");

  let reversed = "";
  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;
}

console.log(reverseString(string));
