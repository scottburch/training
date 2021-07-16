import {Machine, newMachine} from "./machine";
import {SinonSpy, spy} from 'sinon'
import sinonChai from 'sinon-chai'
import chai, {expect} from 'chai'

chai.use(sinonChai);

describe('coke machine', () => {
    let machine: Machine;
    let displaySpy: SinonSpy;

   beforeEach(() =>
       machine = newMachine({
           display: displaySpy = spy()
       })
   );

    it('should not not make change if the amount inserted is equal to price', () => {
        machine.state.insertCoin(.50);
        machine.state.insertCoin(.50);
        expect(displaySpy).to.have.been.calledThrice;
        expect(displaySpy).to.have.been.calledWithMatch(/insert/)
        expect(displaySpy).to.have.been.calledWithMatch(/remaining: 0.50/);
        expect(displaySpy).to.have.been.calledWithMatch(/make selection/);
    });

    it('should make change if the amount inserted is higher than the price', () => {
        machine.state.insertCoin(.10);
        machine.state.insertCoin(.50);
        machine.state.insertCoin(.50);
        expect(displaySpy.callCount).to.equal(4);
        expect(displaySpy).to.have.been.calledWith('change: 0.10')
    })
});

