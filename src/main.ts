import User from "./user/user";

const promp = (name: string, age: number) => {
  const user = new User(name, age);
  return user;
};

const a = promp("ken", 22);

console.log(a);