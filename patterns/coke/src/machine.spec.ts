import {SinonSpy, spy} from 'sinon'
import sinonChai from 'sinon-chai'
import chai, {expect} from 'chai'
import {DisplayFn, insertCoin, Machine, newMachine, Product} from "./machine";
import {Some} from "monet";
import {passThrough} from "promise-passthrough";

chai.use(sinonChai);

describe('coke machine', () => {
    it('should be able to instantiate a new machine', () =>
        expect(newMachine({display: getDisplaySpy()} as Machine)).not.to.be.undefined
    );

    it('should display "insert coins" when the machine is first started', () =>
        Promise.resolve(newMachine({
            products,
            display: getDisplaySpy()
        }))
            .then(machine => expect(machine.display).to.be.calledWithMatch(/insert coins/))
    );

    it('should increment amount entered when you insert coins', () =>
        Promise.resolve(newMachine({
            products,
            display: getDisplaySpy()
        }))
            .then(insertCoin(.25))
            .then(machine =>  expect(machine.display).to.have.been.calledWithMatch(/inserted: 0.25/))
    );

    it('should ask for selection when you have put in enough coins to cover the minimum product price', () =>
        Promise.resolve(newMachine({
            products,
            display: getDisplaySpy()
        }))
            .then(insertCoin(.25))
            .then(passThrough(machine => expect(machine.display).to.have.been.calledWithMatch(/0.25/)))
            .then(insertCoin(.25))
            .then(passThrough(machine => expect(machine.display).to.have.been.calledWithMatch(/0.50/)))
            .then(insertCoin(.25))
            .then(passThrough(machine => expect(machine.display).to.have.been.calledWithMatch(/0.75/)))
            .then(insertCoin(.50))
            .then(machine =>  expect(machine.display).to.have.been.calledWithMatch(/make selection or insert coins/))
    );

    it('should allow you to insert coins up to the max product price only', () =>
        Promise.resolve(newMachine({
            products,
            display: getDisplaySpy()
        }))
            .then(insertCoin(1))
            .then(passThrough(machine => expect(machine.display).to.have.been.calledWithMatch(/1.00/)))
            .then(insertCoin(1))
            .then(passThrough(machine => expect(machine.display).to.have.been.calledWithMatch(/make selection/)))
            .then(insertCoin(.75))
            .then(passThrough(machine => expect(machine.display).to.have.been.calledWithMatch(/make selection/)))
            .then(insertCoin(.50))
            .then(machine =>  expect(machine.display).to.have.been.calledWithMatch(/no more coins/))
    );

});

const getDisplaySpy: () => DisplayFn = () => spy();


const products: Product[] = [{
    name: 'Coke',
    price: 1.25
}, {
    name: 'Chips',
    price: 2.50
}];

