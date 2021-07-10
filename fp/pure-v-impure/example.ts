
import {readAddress, readUsers, writeAccount} from "./common";

export const collate = async () => {
    const users = await readUsers();
    for(const user of users) {
        const address = await readAddress(user.addrId);
        const [first, last] = user.name.split(' ');
        writeAccount({
            first: first,
            last: last,
            address: address
        })
    }
};

collate();

