import {curry} from 'lodash/fp'

interface User {
    id: number,
    name: string
}

type UserReader = (id: number) => Promise<User>
type Logger = (s: string) => void

const readUser = (id: number): Promise<User> => Promise.resolve({
    id,
    name: 'Scott Burch'
});


const readAndGreetWrong = async (id: number) => {
    const user = await readUser(id);
    const parts = user.name.split(' ');
    console.log(`Hello ${parts[0]}!!!`);
};


const getFirstName = (user: User): string =>
    user.name.split(' ')[0];


const greet = curry((greeting: string, name: string): string =>
    `${greeting} ${name}`);

const exclaim = curry((n: number, s: string) =>
    `${s}${'!'.repeat(n)}`)




const readAndGreetRight = (id: number) =>
    readUser(id)
        .then(getFirstName)
        .then(greet('Hello'))
        .then(exclaim(3))
        .then(console.log);





const readAndGreetPure = (id: number, readUser: UserReader, log: Logger): Promise<void> =>
    readUser(id)
        .then(getFirstName)
        .then(greet('Hello'))
        .then(exclaim(4))
        .then(log);





readAndGreetWrong(1);
readAndGreetRight(1);
readAndGreetPure(1, readUser, console.log)



