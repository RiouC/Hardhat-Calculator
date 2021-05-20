const { expect } = require("chai");


describe("Calculator", async function() {
    this.slow(2000);

    // beforeEach(async function() {
    //     const Calculator = await ethers.getContractFactory('Calculator');
    //     const calculator = await Calculator.deploy();
    //     await calculator.deployed();
    // });

    const testCase = (fn) => {
        const wrapper = ({args, expected}) =>
              async function() {
                  const Calculator = await ethers.getContractFactory('Calculator');
                  const calculator = await Calculator.deploy();
                  await calculator.deployed();
                  expect(await calculator[fn](args[0], args[1])).to.equal(expected);
              };
        return wrapper;
    };
    


    describe("add", function() {
        const testAdd = testCase('add');

        
        it("add two digits", testAdd({args: [2, 3], expected: 5}));

        it("add two positive numbers", testAdd({args: [12, 37], expected: 49}));

        it("add one negative number and a positive one", testAdd({args: [-54, 27], expected: -27}));

        it("add one positive number and a negative one", testAdd({args: [98, -63], expected: 35}));

        it("add two big positive numbers (int256 overflow)", testAdd({args: [340282366920938463463374607431768211455n, 3n], expected: 340282366920938463463374607431768211458n}));
    });


    describe("sub", function() {
        const testSub = testCase('sub');


        it("substract two digits", testSub({args: [2, 3], expected: -1}));

        it("substract two positive numbers", testSub({args: [12, 37], expected: -25}));

        it("substract one negative number and a positive one", testSub({args: [-54, 27], expected: -81}));

        it("substract one positive number and a negative one", testSub({args: [98, -63], expected: 161}));

        it("substract two big positive numbers (int256 overflow)", testSub({args: [340282366920938463463374607431768211455n, 3n], expected: 340282366920938463463374607431768211452n}));
    });


    describe("mul", function() {
        const testMul = testCase('mul');


        it("multiply two digits", testMul({args: [2, 3], expected: 6}));

        it("multiply two positive numbers", testMul({args: [12, 37], expected: 444}));

        it("multiply one negative number and a positive one", testMul({args: [-54, 27], expected: -1458}));

        it("multiply one positive number and a negative one", testMul({args: [98, -63], expected: -6174}));

        it("multiply two big positive numbers (int256 overflow)", testMul({args: [340282366920938463463374607431768211455n, 3n], expected: 1020847100762815390390123822295304634365n}));

    });

    
    describe("div", function() {
        const testDiv = testCase('div');


        it("multiply two digits", testDiv({args: [2, 3], expected: 0}));

        it("multiply two positive numbers", testDiv({args: [12, 37], expected: 0}));

        it("multiply one negative number and a positive one", testDiv({args: [-54, 27], expected: -2}));

        it("multiply one positive number and a negative one", testDiv({args: [98, -63], expected: -1}));

        it("multiply two big positive numbers (int256 overflow)", testDiv({args: [340282366920938463463374607431768211455n, 3n], expected: 113427455640312821154458202477256070485n}));

    });


    describe("mod", function() {
        const testMod = testCase('mod');


        it("multiply two digits", testMod({args: [2, 3], expected: 2}));

        it("multiply two positive numbers", testMod({args: [12, 37], expected: 12}));

        it("multiply one negative number and a positive one", testMod({args: [-54, 27], expected: 0}));

        it("multiply one positive number and a negative one", testMod({args: [98, -63], expected: 35}));

        // 113427455640312814857969558651062452224 * 3 = 340282366920938463463374607431768211455
        it("multiply two big positive numbers (int256 overflow)", testMod({args: [340282366920938463463374607431768211455n, 3n], expected: 0n}));

    });
});
