import {expect} from "chai";
import {newDoubleLinkedList} from "./doubleLinkedList";

describe('doubly linked list', () => {
    it('should be able to create a new doubly linked list', () => {
        expect(newDoubleLinkedList()).not.to.be.undefined;
    });
});
