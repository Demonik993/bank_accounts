'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const eurToUsd = 1.1;
const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// const arr = ['a', 'b', 'c', 'd', 'e'];
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-1));
// console.log(arr.slice(2, -1));
// console.log(arr);

// // console.log(arr.splice(-1));
// // console.log(arr);
// console.log('////');

// const arr1 = arr.splice(1, 1);
// console.log(arr1);
// console.log(arr);
// console.log(arr.at(-2));
// const stringExample = 'Dominik';
// console.log(stringExample.at(-3));
// movements.forEach(function (mov, i) {
//   console.log(mov);
//   console.log(i);
// });
// currencies.forEach(function (val, key, arr) {
//   console.log(val);
//   console.log(key);
//   console.log(arr.keys());
// });
const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const mov = sort ? movements.slice().sort((a, b) => a - b) : movements;
  mov.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
  </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
const countDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (movements, interestRate) {
  const incomes = movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = ` ${incomes}€`;
  const outcomes = movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = ` ${Math.abs(outcomes)}€`;
  const interest = movements
    .filter(mov => mov > 0)
    .map(mov => (mov * interestRate) / 100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};
const updateUI = function (acc) {
  displayMovements(acc.movements, sort);
  countDisplayBalance(acc);
  calcDisplaySummary(acc.movements, acc.interestRate);
};

// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age,
and stored the data into an array (one array for each). For now, they are just interested in 
knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, 
and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'),
 and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, 
not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied 
array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult,
 and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const arr = [1, 2, 3, 4];
// // const checkDogs = function (dogsJulia, dogsKate) {
// //   const dogsJuliaCorrect = [...dogsJulia];
// //   dogsJuliaCorrect.splice(0, 1);
// //   dogsJuliaCorrect.splice(-2);
// //   const dogs = dogsJuliaCorrect.concat(dogsKate);
// //   dogs.forEach(function (age, i) {
// //     const text =
// //       age >= 3 ? `an adult, and is ${age} years old` : 'still a puppy 🐶';
// //     console.log(`Dog number ${i + 1} is ${text}`);
// //   });
// //   console.log(dogs);
// // };
// // checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
// // checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
// const arr1 = arr.map(val => val * 2);
// console.log(arr);
// console.log(arr1);

const createUsernames = function (users) {
  users.forEach(user => {
    user.username = user.owner
      .toLowerCase()
      .split(' ')
      .map(el => el[0])
      .join('');
  });
};
createUsernames(accounts);

const deposits = movements.filter(e => e > 0);
const withdrawals = movements.filter(e => e < 0);
// console.log(withdrawals);

// const calcAndPrintBalance = function (mov) {
//   mov.forEach(
//     e => (e.balance = e.movements.reduce((acc, cur) => acc + cur, 0))
//   );
// };
// calcAndPrintBalance(accounts);
// console.log(accounts);

// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to 
human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), 
and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old,
 humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping 
  dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other 
  challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]
*/
// const calcAverageHumanAge = function (arr) {
//   const dogsInHuman = arr
//     .map(e => (e <= 2 ? e * 2 : e * 4 + 16))
//     // {
//     //   if (e <= 2) return e * 2;
//     //   else return e * 4 + 16;
//     // })
//     .filter(e => e >= 18)
//     .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
//   // console.log(dogsInHuman);
//   // const sum = dogsInHuman.reduce((acc, cur) => acc + cur, 0);
//   // return sum / dogsInHuman.length;
//   return dogsInHuman;
// };
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
// const totalDepositsUSD = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurToUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// Coding Challenge #3

/* 
Rewrite the 'calcAverageHumanAge' function from the previous challenge, but this time as an arrow function, 
and using chaining!

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// const calcAverageHumanAge = ages =>
//   ages
//     .filter(age => age > 2)
//     .map(age => age * 4 + 16)
//     .reduce((acc, age, _, arr) => acc + age / arr.length, 0);
// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
// console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
let userLoged;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  userLoged = accounts.find(acc => acc.username === inputLoginUsername.value);
  if (userLoged?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome back ${userLoged.owner.split(' ')[0]}`;
    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginUsername.blur();
    inputLoginPin.blur();
    containerApp.style.opacity = 100;
    updateUI(userLoged);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  if (
    receiverAcc &&
    amount > 0 &&
    userLoged.balance >= amount &&
    receiverAcc.owner !== userLoged.owner
  ) {
    receiverAcc.movements.push(amount);
    userLoged.movements.push(-amount);
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();
    inputTransferTo.blur();
    updateUI(userLoged);
  } else if (userLoged.balance < amount) {
    alert("You can't afford this! 🤑");
  } else if (userLoged.owner === receiverAcc.owner) {
    alert('Why do you send money to yourself?');
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);
  if (loan > 0 && userLoged.movements.some(mov => mov >= 0.1 * loan)) {
    userLoged.movements.push(loan);
    updateUI(userLoged);
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === userLoged.username &&
    Number(inputClosePin.value) === userLoged.pin
  ) {
    accounts.splice(
      accounts.indexOf(acc => acc.username === userLoged.username),
      1
    );
    containerApp.style.opacity = 0;
    inputClosePin.value = inputCloseUsername.value = '';
  } else console.log('No way');
});
let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  // sort ? false : true;
  displayMovements(userLoged.movements, !sort);
  sort = !sort;
});

const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);

// console.log(overalBalance);
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);

// console.log(overalBalance2);
// console.log(movements);
// // movements.sort((a, b) => (a < b ? 1 : -1));
// movements.sort((a, b) => b - a);
// const newNames = [];
// console.log(movements);
// console.log(accounts.map(acc => acc.owner).sort((a, b) => b - 1));
// console.log(accounts.map(acc => acc.owner).sort());

// console.log(
//   accounts
//     .map(acc => acc.owner)
//     .forEach(e => newNames.push(e.replace(/\ /g, '')))
// );
// console.log(newNames);
// console.log(newNames.sort((a, b) => a - b));

// .sort((a, b) => b - a
// const newArr = [0, 4, 'abc', 'xyz', -3, -2, 'def'];
// // console.log(newArr.sort());
// const arr3 = new Array(10);
// arr3.fill('z');
// arr3.fill('x', 3, 5);
// console.log(arr3.reduce((count, cur) => (cur !== 'x' ? ++count : count), 0));
// console.log(arr3);
// // arr3.fill('x', 5, 6);
// console.log(arr3);
// console.log(Math.floor(Math.random() * 6) + 1);

// const diceRolls = Array.from(
//   { length: 100 },
//   () => Math.floor(Math.random() * 6) + 1
// );
// console.log(diceRolls);
// const result = new Set();
//   Array.from({ length: 6 }, () => Math.floor(Math.random() * 49) + 1)
// );
// console.log(
//   arr3
//     .map((e, i) => (i % 2 ? e : e.toUpperCase()))
//     .reduce((acc, cur) => acc + '-' + cur)
//   // .toUpperCase()
//   // .split('')
// );
// const str = 'adsasfda';
// const bankDepositSum = accounts
//   .flatMap(acc => acc.movements)
//   .filter(mov => mov > 0)
//   .reduce((acc, val) => acc + val, 0);
// console.log(bankDepositSum);

// const numDeposits1000 = accounts
//   .flatMap(acc => acc.movements)
//   // .filter(mov => mov >= 1000).length; // or...
//   .reduce((count, cur) => (cur >= 1000 ? count + 1 : count), 0);

// console.log(numDeposits1000);
// const sums = accounts
//   .flatMap(acc => acc.movements)
//   .reduce(
//     (acc, cur) => {
//       // cur > 0 ? (acc.deposits += cur) : (acc.withdrawals += cur);
//       acc[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
//       return acc; // remembwer to return accumulator
//     },
//     {
//       deposits: 0,
//       withdrawals: 0,
//     }
//   );
// console.log(sums);

// const convertTitleCase = function (title) {
//   const captalize = e => e[0].toUpperCase() + e.slice(1);
//   const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];
//   const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(e => (exceptions.includes(e) ? e : captalize(e)))
//     //   if (exceptions.includes(e)) return e;
//     //   else return e[0].toUpperCase() + e.slice(1);
//     // })
//     .join(' ');
//   return captalize(titleCase);
// };
// console.log(convertTitleCase('this is a nice title'));
// console.log(convertTitleCase('this is a LONG title but not too long'));
// console.log(convertTitleCase('and here is another title with an EXAMPLE'));
///////////////////////////////////////
// Coding Challenge #4

/* 
Julia and Kate are still studying dogs, and this time they are studying if dogs are eating too much or too little.
Eating too much means the dog's current food portion is larger than the recommended portion, and eating too 
little is the opposite.
Eating an okay amount means the dog's current food portion is within a range 10% above and 10% below the 
recommended portion (see hint).

1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion and 
add it to the object as a new property. Do NOT create a new array, simply loop over the array. Forumla:
 recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have 
multiple owners, so you first need to find Sarah in the owners array, and so this one is a bit tricky 
(on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much ('ownersEatTooMuch') 
and an array with all owners of dogs who eat too little ('ownersEatTooLittle').
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs 
eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is any dog eating EXACTLY the amount of food that is recommended 
(just true or false)
6. Log to the console whether there is any dog eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition
  used in 6.)
8. Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order 
(keep in mind that the portions are inside the array's objects)

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between
 them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];
// 1.
dogs.map(dog => (dog.recomendedFood = Math.trunc(dog.weight ** 0.75 * 28)));
console.log(dogs);
// 2.
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog eats too ${
    sarahDog.curFood > sarahDog.recomendedFood ? 'much' : 'less'
  } food.`
);
// 3.
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recomendedFood)
  .flatMap(dog => dog.owners);
const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recomendedFood)
  .flatMap(dog => dog.owners);
// 4.
console.log(
  `${ownersEatTooMuch.slice(0, -1).join(', ')} and ${ownersEatTooMuch.slice(
    -1
  )}'s dog eat too much!`
);
console.log(ownersEatTooLittle);
console.log(
  `${ownersEatTooLittle.slice(0, -1).join(', ')} and ${ownersEatTooLittle.slice(
    -1
  )}'s dog eat too much!`
);
// 5.

console.log(dogs.some(dog => dog.curFood === dog.recomendedFood));

// 6.
console.log(
  dogs.some(
    dog =>
      dog.curFood >= 0.9 * dog.recomendedFood &&
      dog.curFood <= 1.1 * dog.recomendedFood
  )
);
// 7.
const dogsEatingOK = dogs.filter(
  dog =>
    dog.curFood >= 0.9 * dog.recomendedFood &&
    dog.curFood <= 1.1 * dog.recomendedFood
);
console.log(dogsEatingOK);
// 8.
// Create a shallow copy of the dogs array and sort it by recommended food portion in an ascending order
const dogsOrdered = dogs
  .slice()
  .sort((a, b) => a.recomendedFood - b.recomendedFood);

console.log(dogsOrdered);

function generateRandomNumbers() {
  let numbers = [];

  // Function to check if a number already exists in the array
  function isUnique(num) {
    return numbers.indexOf(num) === -1;
  }

  // Generate 6 unique random numbers
  while (numbers.length < 6) {
    let randomNum = Math.floor(Math.random() * 49) + 1;
    if (isUnique(randomNum)) {
      numbers.push(randomNum);
    }
  }

  return numbers;
}

// Example usage
const randomNumbers = generateRandomNumbers();
console.log(randomNumbers);
