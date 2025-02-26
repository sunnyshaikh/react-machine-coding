class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  // insert first
  insertFirst(data) {
    let node = new Node(data);
    node.next = this.head;
    this.head = node;
    this.size += 1;
  }
  // insert last
  insertLast(data) {
    let node = new Node(data);
    let curr = this.head;
    if (!curr) {
      curr = node;
      this.size += 1;
      return;
    }
    while (curr.next) {
      curr = curr.next;
    }
    curr.next = node;
    this.size += 1;
  }
  // delete with given data
  deleteNode(data) {
    if (!this.head) {
      console.log("List is empty!");
      return;
    }
    if (this.head.data === data) {
      this.head = this.head.next;
      this.size -= 1;
      return;
    }
    let curr = this.head;
    while (curr.next) {
      if (curr.next.data === data) {
        curr.next = curr.next.next;
        this.size -= 1;
        return;
      }
      curr = curr.next;
    }
    console.log("Data not found to delete!");
  }
  // preview list
  preview() {
    let arr = [];
    let curr = this.head;
    while (curr) {
      arr.push(curr.data);
      curr = curr.next;
    }
    return arr.join(", ");
  }
  // get size
  getSize() {
    return this.size;
  }
}

const ll = new LinkedList();
ll.insertFirst(10);
ll.insertFirst(20);
ll.insertFirst(30);
ll.insertLast(40);
ll.deleteNode(20);
ll.insertFirst(50);
ll.insertLast(60);
console.log(ll.getSize());
console.log(ll.preview());
