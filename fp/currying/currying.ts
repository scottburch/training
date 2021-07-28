import {Identity, Maybe, None, Some} from "monet";
import {first} from 'lodash/fp';
import {passThrough} from "promise-passthrough";

interface Transaction {
    desc: string
    debit: number
    credit: number
}

const transactions: Transaction[] = [{
    desc: 'initial balance',
    debit: 0,
    credit: 100
},{
    desc: 'withdrawl',
    debit: 50,
    credit: 0
}];


describe('total', () => {
    it('', () =>
        Some(transactions)
            .flatMap<Transaction[]>(txs => txs.length ? Some(txs) : None(txs))

    )
})

