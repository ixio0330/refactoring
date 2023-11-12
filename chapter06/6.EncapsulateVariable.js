// 변수 캡슐화하기

let defaultOwnerData = { firstName: '마틴', lastName: '파울러' };

export function defaultOwner() { 
  return new Person(defaultOwnerData); 
}

export function setDefaultOwner(arg) {
  defaultOwnerData = arg;
}

class Person {
  constructor({ lastName, firstName }) {
    this._lastName = lastName;
    this._firstName = firstName;
  }
  get lastName() { return this._lastName; }
  get firstName() { return this._firstName; }
}
