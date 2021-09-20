import {Maybe, None, Some} from "monet";

type UnverifiedEmail = Maybe<{unverifiedEmail: string}>
type VerifiedEmail = Maybe<{verifiedEmail: string}>

interface User {
    name: string
    email: UnverifiedEmail | VerifiedEmail
}

type UserWithVerifiedEmail = User & {email: VerifiedEmail}
type UserWithUnverifiedEmail = User & {email: UnverifiedEmail}


const verifyEmail = (user: UserWithUnverifiedEmail): UserWithVerifiedEmail => ({
    ...user,
    email:  user.email.bind(({unverifiedEmail}) => /@/.test(unverifiedEmail) ? Some({verifiedEmail: unverifiedEmail}) : None())
})

const notifyUser = (u: UserWithVerifiedEmail) =>
    u.email
        .forEach(email => console.log('notifying', u.name, email.verifiedEmail))


const readUser = (id: string): User & UserWithUnverifiedEmail => ({
    name: 'Scott',
    email: Some({unverifiedEmail: 'scott@bulldoginfo.com'})
//    email: Some({unverifiedEmail: 'wrong'})
//    email: None() as UnverifiedEmail
});

const u = readUser('xxx');
const u2 = verifyEmail(u as UserWithUnverifiedEmail);

notifyUser(u);  // ERROR
notifyUser(u2); // No error



