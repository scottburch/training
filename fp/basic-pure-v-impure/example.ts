import {Some} from "monet";

const double = (num: number) => num * 2;

const impureDoubleAndPrint = (num: number) => console.log(double(num));

const pureDoubleAndPrint = (num: number, writer: (n: number) => void) =>
    Some(num)
        .map(num => num * 2)
        .map<number>(writer)
