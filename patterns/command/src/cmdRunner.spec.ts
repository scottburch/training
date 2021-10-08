import chai, {expect} from "chai";
import sinon from 'sinon-chai'
import {newCmdRunner, runCommand} from "./cmdRunner";
import {Some} from "monet";
import {spy} from 'sinon'

chai.use(sinon);

describe('command runner', () => {
    it('should allow you to create a new command runner', () => {
        expect(newCmdRunner()).not.to.be.undefined
    });

    it('should allow you to run a command using a command runner', () => {
        const cmdSpy = spy()
        Some(newCmdRunner())
            .forEach(runCommand(cmdSpy, () => {}))
        expect(cmdSpy).to.have.been.called
    });

    it('should allow you to run an undo command', () => {
        const cmdSpy = spy()
        const undoSpy = spy()

        Some(newCmdRunner())
            .map(runCommand(cmdSpy, undoSpy))
//            .forEach(undoCommand);

        expect(cmdSpy).to.have.been.called;
        expect(undoSpy).to.have.been.called;
    });

})