import * as numOperations from "./module.js";

import { myArr, logArr } from "./data.js"

import Person from './person.js';

console.log(numOperations.sumNums(3,5));

logArr();
myArr.push(4);
logArr();

console.log(numOperations.numProduct(3, 5))
console.log(Person)