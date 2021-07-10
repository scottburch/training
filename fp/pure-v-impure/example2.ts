import {Some} from "monet";
import {nth, split} from 'lodash/fp';
import {Account, AccountWriter, AddressReader, readAddress, readUsers, User, UserReader, writeAccount} from "./common";

export const collate = (userReader: UserReader, accountWriter: AccountWriter, addressReader: AddressReader) =>
    userReader.call(null)
        .then(processUsers(accountWriter, addressReader));


const processUsers = (accountWriter: AccountWriter, addrReader: AddressReader) =>
    (users: User[]): Promise<unknown> =>
        Promise.all(users.map(user =>
            Promise.resolve([user, {} as Account] as [User, Account])
                .then(splitFirstAndLast)
                .then(addAddressToAccount(addrReader))
                .then(nth(1))
                .then(x => x as Account)
                .then(accountWriter)
        ));


const addAddressToAccount = (addressReader: AddressReader) => ([user, account]: [User, Account]): Promise<[User, Account]> =>
    addressReader(user.addrId)
        .then(address => [user, {...account, address}])

const splitFirstAndLast = ([user, account]: [User, Account]): [User, Account] =>
    Some(user.name)
        .map(split(' '))
        .map(([first, last]) => ({...account, first, last}))
        .map(account => [user, account])
        .join();


collate(readUsers, writeAccount, readAddress);

export const example2TestHook = {
        addAddressToAccount,
        splitFirstAndLast,
        processUsers
}