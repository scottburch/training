import {Some} from "monet";
import {collate, example2TestHook} from "./example2";
import {Account, User} from "./common";
import chai, {expect} from 'chai'
import {passThrough} from "promise-passthrough";
import sinon from 'sinon'
import sinonChai from 'sinon-chai'
chai.use(sinonChai);

describe('example2', () => {
    describe('splitFirstAndLast', () => {
        it('should split fist and last name in a user and set it in an account', () => {
          Some<[User, Account]>([{name: 'first last'} as User, {} as Account])
              .map(example2TestHook.splitFirstAndLast)
              .map(x => x[1])
              .map(passThrough(account =>expect(account).to.have.property('first', 'first')))
              .map(passThrough(account => expect(account).to.have.property('last', 'last')))
        });
    });

    describe('addAddressToAccount', () => {
        it('should add an address to a user based on id', () => {
            const addressReader = () => Promise.resolve({
                address: 'test address'
            });
            return Promise.resolve([{addrId: 1}, {}] as [User, Account])
                .then(example2TestHook.addAddressToAccount(addressReader))
                .then(x => x[1])
                .then(account => expect(account.address).to.deep.equal({address: 'test address'}))
        });
    });

    describe('processUsers', () => {
        it('should write accounts generated from users', () => {
            const accountWriter = sinon.spy()
            const addressReader = () => Promise.resolve({
                address: 'test address'
            });
            const users: User[] = [{
                name: 'first last',
            } as User]
            return example2TestHook.processUsers(accountWriter, addressReader)(users)
                .then(x => {
                    expect(accountWriter).to.have.been.calledWith({
                        first: 'first',
                        last: 'last',
                        address: {
                            address: 'test address'
                        }
                    });
                });
        });
    });

    describe('collate', () => {
        it('should write accounts generated from users', () => {
            const accountWriter = sinon.spy()
            const addressReader = () => Promise.resolve({
                address: 'test address'
            });
            const usersReader = () => Promise.resolve([{
                name: 'first last',
            } as User])

            return collate(usersReader, accountWriter, addressReader)
                .then(x => {
                    expect(accountWriter).to.have.been.calledWith({
                        first: 'first',
                        last: 'last',
                        address: {
                            address: 'test address'
                        }
                    });
                });
        });
    });
});