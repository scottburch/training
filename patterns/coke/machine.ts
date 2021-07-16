import {Left, Right} from "monet";
import delay from 'delay'

interface Machine {
    state: MachineState
    coins: number
    price: number
    display: (str: string) => void
}

interface MachineState {
    insertCoin: (amt: number) => void
    selectProduct: (prod: string) => void
}

const idleState = (machine: Machine) => {
    machine.display('insert coins');
    machine.state = {
        insertCoin: (amt) =>
            Right(amt)
                .map(amt => machine.coins += amt)
                .flatMap(amt => amt > machine.price ? Right(amt) : Left(amt))
                .map(() => giveChange(machine))
                .leftMap(() => machine.display(`remaining: ${(machine.price - machine.coins).toFixed(2)}`)),

        selectProduct: () => machine.display('insert coins')
    }
};


const giveChange = (machine: Machine) => {
    machine.display(`change: ${(machine.coins - machine.price).toFixed(2)}`);
    machine.state = {
        insertCoin: () => machine.display('no more coins allowed'),
        selectProduct: () => machine.display('wait for change')
    }
    delay(2000)
        .then(() => vend(machine))
};

const vend = (machine: Machine) => {
    machine.display('make selection');
    machine.state = {
        insertCoin: () => machine.display('no more coins allowed'),
        selectProduct: () => {
            machine.display('dispensing product')
            delay(3000)
                .then(() => idleState(machine))
        }
    }
}

const machine: Machine = {
    state: {} as MachineState,
    coins: 0,
    price: 1,
    display: (str: string) => console.log(str)
}

idleState(machine);


process.stdin.setRawMode(true);
process.stdin.resume();
process.stdin.on('data', (buf) => cmds[buf.toString()]());


const cmds: Record<string, () => void> = {
    1: () => machine.state.insertCoin(.10),
    2: () => machine.state.insertCoin(.50),
    3: () => machine.state.selectProduct('coke')
}

