import {DisplayFn, insertCoin, newMachine, Product} from "./machine";
import {Some} from "monet";

const display: DisplayFn = (str) => [0,1].forEach(n =>
    document.querySelector(`#display${n}`)?.setAttribute('value', str[n])
)


const getProducts = (): Product[] =>
    Array.from(document.querySelectorAll('[data-price]'))
        .map(el => {
            el.innerHTML = `${el.id} - ${el.getAttribute('data-price')}`
            return {name: el.id, price: parseFloat(el.getAttribute('data-price') || '0')}
        })


Some(newMachine({display, products: getProducts()}))
    .forEach(machine => {
        document.querySelector('#nickle')?.addEventListener('click', () => insertCoin(0.05, machine))
        document.querySelector('#dime')?.addEventListener('click', () => insertCoin(0.10, machine))
        document.querySelector('#quarter')?.addEventListener('click', () => insertCoin(0.25, machine))
    })
