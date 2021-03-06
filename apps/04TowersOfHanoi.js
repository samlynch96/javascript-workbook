'use strict';

var assert = require('assert');
var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

function printStacks() {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

function movePiece(startStack, endStack) {
  // Your code here
  // moving the block off the startStack and adding it to the endStack
  var block = stacks[startStack].pop();
  stacks[endStack].push(block);

}

function isLegal(startStack, endStack) {
  // Your code here
  //logging the various variables that will be used in this function
  console.log('startStack', startStack);
  console.log('endStack',endStack);
  console.log('startArray',stacks[startStack]);
  console.log('endArray',stacks[endStack]);

// checking the value of the last number on the start and end stacks
  var startArray = stacks[startStack];
  var topOfStart = startArray[startArray.length -1];
  console.log(topOfStart);

  var endArray = stacks[endStack];
  var topOfEnd = endArray[endArray.length -1];
  console.log(topOfEnd);

// checking legality of the move
if(startArray.length === 0){
  return false;
}

if(endArray.length === 0){
  return true;
}



  if(topOfStart < topOfEnd){
    return true;
  }
  else {
    console.log("move is illegal");
    return false;
  }
}

function checkForWin() {
  // Your code here
  // checking the lengths of either end stack to determine a win
  if(stacks ['b'].length === 4 || stacks ['c'].length === 4 ){
    console.log("You Win");
    return true;
  }else{
    return false;
  }


}

function towersOfHanoi(startStack, endStack) {
  // Your code here
  //order the gremlin will check the functions to run the game properly
  isLegal(startStack, endStack);
  movePiece(startStack, endStack);
  console.log(stacks);
  checkForWin(endStack);

}

function getPrompt() {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', function () {
    it('should be able to move a block', function () {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', function () {
    it('should not allow an illegal move', function () {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', function () {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', function () {
    it('should detect a win', function () {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });
} else {

  getPrompt();

}
