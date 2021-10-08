import {expect} from "chai";
import {addListNode} from "./doubleLinkedList";
import {Some} from "monet";
import {passThrough} from "promise-passthrough";

describe('doubly linked list', () => {
    it('should be able to create a new doubly linked list node', () => {
        expect(addListNode(1)).not.to.be.undefined;
    });

    it('should be able to get the length of the list', () => {
        Some(addListNode(1))
            .map(passThrough(node => expect(node.length).to.equal(1)))
            .map(node => addListNode(2, node))
            .forEach(node => expect(node.length).to.equal(2))
    });

    it('should be able to add a item to the list', () => {
        Some(addListNode(1))
            .map(prev => addListNode(2, prev))
            .forEach(node => expect(node.length).to.equal(2));
    });

    it('should be able to get a previous item on the list from a node', () =>
        Some(addListNode(1))
            .map(prev => addListNode(2, prev))
            .forEach(node => expect(node.prev?.data).to.equal(1))
    );

    it('should be able to get the next item on the list from a node', () => {
        Some(addListNode(1))
            .map(prev => addListNode(2, prev))
            .forEach(node => expect(node.prev?.next.data).to.equal(2))
    });
});
