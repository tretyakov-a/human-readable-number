module.exports = function toReadable (number) {
  
  const ones = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen',, 'fifteen',,, 'eighteen'];
  const tens = [,, 'twenty', 'thirty', 'forty', 'fifty',,, 'eighty'];
  const hundredPlus = ['thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion'];
  const minus = number < 0;

  number = Math.abs(number);
  if (number === 0)
    return ones[0];

  const parseHundreds = n => {
    const result = [];
    const hundredIdx = Math.trunc(n / 100);
    hundredIdx > 0 && result.push(ones[hundredIdx], 'hundred');

    n = n % 100;
    if (n > 0 && n <= 19) {
      result.push(ones[n] || teens[n % 10] || ones[n % 10] + 'teen');
    } else {
      const oneIdx = n % 10;
      const tenIdx = Math.trunc(n / 10);
      tenIdx > 0 && result.push(tens[tenIdx] ? tens[tenIdx] : ones[tenIdx] + 'ty');
      oneIdx > 0 && result.push(ones[oneIdx]);
    }
    return result;
  };

  let result = parseHundreds(number % 1000);

  let n = number;
  for (let i = 0; i < hundredPlus.length; i += 1) {
    n = Math.trunc(n / 1000);
    if (n === 0)
      break;
    const hundreds = parseHundreds(n % 1000);
    if (hundreds.length)
      result = [...parseHundreds(n % 1000), hundredPlus[i], ...result];
  }

  return (minus ? '-' : '') + result.join(' ');
  // return `"${result.join(' ')}"`;
}

console.log(module.exports(100));
console.log(module.exports(910));
console.log(module.exports(999));
console.log(module.exports(1999));
console.log(module.exports(5000));
console.log(module.exports(32440));
console.log(module.exports(99001));
console.log(module.exports(199501));
console.log(module.exports(2399001));
console.log(module.exports(4422399001));
console.log(module.exports(4000000000));