import {Left, Right, Some} from "monet";
import delay from 'delay'
import {passThrough} from "promise-passthrough";

export interface Machine {
    behaviour: MachineBehaviour
    coins: number
    price: number
    display: (str: string) => void
}

export interface MachineBehaviour {
    insertCoin: (amt: number) => void
    selectProduct: (prod: string) => void
}


export const newMachine = (options: Partial<Machine> = {}): Machine =>
    Some({
        behaviour: {} as MachineBehaviour,
        coins: 0,
        price: 1,
        display: () => {},
        ...options
    })
        .map(passThrough(idle))
        .join();



export const idle = (machine: Machine) => {
    machine.display('insert coins');
    machine.coins = 0;
    machine.behaviour = {
        insertCoin: (amt) =>
            Right(amt)
                .map(amt => machine.coins += amt)
                .flatMap(amt => amt >= machine.price ? Right(amt) : Left(amt))
                .map(amt => amt === machine.price ? vend(machine) : giveChange(machine))
                .leftMap(() => machine.display(`remaining: ${(machine.price - machine.coins).toFixed(2)}`)),

        selectProduct: () => machine.display('insert coins')
    }
};


export const giveChange = (machine: Machine) => {
    machine.display(`change: ${(machine.coins - machine.price).toFixed(2)}`);
    machine.behaviour = {
        insertCoin: () => machine.display('no more coins allowed'),
        selectProduct: () => machine.display('wait for change')
    }
    delay(2000)
        .then(() => vend(machine))
};

const vend = (machine: Machine) => {
    machine.display('make selection');
    machine.behaviour = {
        insertCoin: () => machine.display('no more coins allowed'),
        selectProduct: () => {
            machine.display('dispensing product')
            delay(3000)
                .then(() => idle(machine))
        }
    }
}


