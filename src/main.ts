// TODO : Get all docs user has access including docs which they have read/edit access
// TODO : Implement Interface segregation


import User from "./user/user";


const u1 = new User("sounak");
const u2 = new User("pritam");

const doc = u1.addDocument("1-1 Doc");
const doc1 = u1.addDocument("Poem");

console.log(doc);
console.log(doc1);

doc.setContent(u1.getId(), "Hi this is edit doc");
doc1.setContent(u1.getId(), "Hi this is read doc");

console.log(doc.getContent(u1.getId()));
console.log(doc1.getContent(u1.getId()));

u1.grantEditAccess(u2.getId(), doc.getId());
u1.grantEditAccess(u2.getId(), doc1.getId());

console.log("===== user2 ========");

console.log(doc.getContent(u2.getId()));
console.log(doc1.getContent(u2.getId()));

doc.setContent(u2.getId(), "Hi this is edit doc 2");
console.log(doc.getContent(u2.getId()));

doc1.setContent(u2.getId(), "Hi this is read doc 2");
console.log(doc1.getContent(u2.getId()));



