import {Some} from "monet";
import {passThrough} from "promise-passthrough";

export interface DoubleLinkedListNode<T> {
    length: number
    prev: DoubleLinkedListNode<T> | undefined
    next: DoubleLinkedListNode<T> | undefined
    data: T
}

export const getListLength = <T>(node: DoubleLinkedListNode<T>) => node.length

export const addListNode = <T>(data: unknown, prev?: DoubleLinkedListNode<T> | undefined): DoubleLinkedListNode<T> =>
    Some({
        prev: prev,
        length: prev ? prev.length + 1 : 1,
        data
    } as DoubleLinkedListNode<T>)
        .map(passThrough(node => prev && (prev.next = node)))
        .join();
