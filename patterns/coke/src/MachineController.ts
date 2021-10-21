import {DisplayFn, insertCoin, newMachine, Product} from "./machine";
import {Some} from "monet";

const display: DisplayFn = (str) => document.querySelector('#display')?.setAttribute('value', str);


const products: Product[] = [{
    name: 'Coke',
    price: 1.25
}, {
    name: 'Chips',
    price: 2.50
}];


Some(newMachine({display,products}))
    .forEach(machine => {
        document.querySelector('#nickle')?.addEventListener('click', () => insertCoin(0.05, machine))
        document.querySelector('#dime')?.addEventListener('click', () => insertCoin(0.10, machine))
        document.querySelector('#quarter')?.addEventListener('click', () => insertCoin(0.25, machine))
    })
