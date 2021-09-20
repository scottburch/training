type NumberMax100 = { max100: number };

const onlyTakesMax100 = ({max100}: NumberMax100) =>
    console.log('number: ', max100);

const newMax100 = (num: number): NumberMax100 => ({max100: Math.min(num, 100)});

//onlyTakesMax100(1) // type error
onlyTakesMax100(newMax100(111))  //no type error

