import {Left, Right, Some} from "monet";
import delay from 'delay'
import {passThrough} from "promise-passthrough";
import {curry} from 'lodash/fp'


export interface MachineState {
    insertCoin: (amt: number) => Machine
}

export interface Product {
    name: string;
    price: number
}

export interface Machine {
    state: MachineState
    coins: number;
    products: Product[];
    display: DisplayFn;
}

export type DisplayFn = (str: string) => void;
export type StateFn = (machine: Machine) => Machine;

export const getMaxPrice = (machine: Machine) => machine.products.reduce((max, product) => {
    return product.price > max ? product.price : max
},0);

export const getMinPrice = (machine: Machine) => machine.products.reduce((min, product) => {
    return product.price < min ? product.price : min
},Number.MAX_SAFE_INTEGER);

export const insertCoin = curry((amt: number, machine: Machine) => machine.state.insertCoin(amt))

export const newMachine = (machine: Pick<Machine, 'display' | 'products'>): Machine =>
    idleState({
        state: {} as MachineState,
        coins: 0,
        ...machine
    })


const isPastMinimumPrice = (machine: Machine): boolean =>
    machine.coins >= getMinPrice(machine);

const isPastMaximumPrice = (machine: Machine): boolean =>
    machine.coins > getMaxPrice(machine);

export const idleState: StateFn = (machine) => {
    machine.display('insert coins');
    machine.coins = 0;
    machine.state = {
        insertCoin: amt => {
            machine.coins += amt;
            machine.display(`inserted: ${machine.coins.toFixed(2)}`);
            return isPastMinimumPrice(machine) ? pastMinimumState(machine) : machine;
        }
    }
    return machine
}

export const pastMinimumState: StateFn = (machine) => {
    machine.display('make selection or insert coins');
    return machine;
}
