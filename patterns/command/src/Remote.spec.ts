import chai, {expect} from "chai";
import sinon from 'sinon-chai'
import {newRemote, remoteAddCmd, remotePressKey} from "./Remote";
import {Some} from "monet";
import {spy} from "sinon";

chai.use(sinon);


describe('remote control', () => {
    it('should initialize a new remote control', () => {
        expect(newRemote()).to.not.be.undefined
    });

    it('should be able to add a command to the remote', () => {
        const cmd = spy()
        Some(newRemote())
            .map(remoteAddCmd(0, cmd))
            .forEach(remotePressKey(0))

        expect(cmd).to.have.been.called
    });
});