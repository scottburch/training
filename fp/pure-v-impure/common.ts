export type UserReader = () => Promise<User[]>
export const readUsers = (): Promise<User[]> => Promise.resolve([{
    id: 1,
    name: 'Sam Jones',
    addrId: 1
}, {
    id: 2,
    name: 'Jim Hyde',
    addrId: 2
}, {
    id: 3,
    name: 'Jene Baker',
    addrId: 3
}]);

export interface User {
    id: number,
    name: string,
    addrId: number
}

interface Address {
    address: string
}

export interface Account {
    first: string,
    last: string,
    address: Address
}

export type AddressReader = (id: number) => Promise<Address>;
export const readAddress = (id: number): Promise<Address> => Promise.resolve({
    1: {address: 'Sam Address'},
    2: {address: 'Jim Address'},
    3: {address: 'Jene Address'}
}[id] as Address)
export type AccountWriter = (account: Account) => void;
export const writeAccount = (account: Account): Promise<void> =>
    Promise.resolve(console.log(account));