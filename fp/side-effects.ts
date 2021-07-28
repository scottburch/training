let y: number = 0;
const f = (x: number): number => y = y + x + 1

const x = () => 2;
console.log(f(x()) == f(x()));