/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  
  var board = new Board({n: n});
  var counter = 0;
  var newcol = 0;
  var placer = function(row, col) {
    var placed = false;
    if (row === n) {
      return;
    }
    if (col === n) {
      row = row + 1;
      col = newcol;
    }
    board.togglePiece(row, col);
    counter++;
    placed = true;
    if (board.hasAnyRooksConflicts()) {
      board.togglePiece(row, col);
      counter--;
      placed = false;
    }
    if (placed) {
      newcol++;
      placer(row + 1, newcol);
    }
    if (counter === n) {
      return;
    }
    placer(row, col + 1);
  };

  placer(0, 0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0;
  var f = [];
  var factorial = function (n) {
    if (n === 0 || n === 1) {
      return 1;
    }
    if (f[n] > 0) {
      return f[n];
    }
    return f[n] = factorial(n - 1) * n;
  };
  solutionCount = factorial(n);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = [];
  if (n === 0) {
    return {n: 0};
  }
  var evaluateBoard = function(board, row ) {
    if (board.hasAnyQueensConflicts()) {
      return;
    }
    if (row === board.get('n')) {
      solution.push(board.rows().slice());
      return;
    }
    for (var i = 0; i < board.get('n'); i++) {
      testRow = [];
      for (var j = 0; j < board.get('n'); j++) {
        if (j === i) {
          testRow.push(1);
        } else {
          testRow.push(0);
        }
      }
      var newBoard = new Board(board.rows());
      newBoard.set(row, testRow);
      evaluateBoard(newBoard, row + 1);
    }
  };
  var initBoard = new Board({n: n });
  evaluateBoard(initBoard, 0);
  if (solution.length === 0) {
    return initBoard.rows();
  }
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution[0]));
  return solution[0];
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = 0;
  if (n === 0) {
    return 1;
  }
  if (n === 1) {
    return 1;
  }
  var evaluateBoard = function(board, row, column) {
    if (board.hasAnyQueensConflicts()) {
      return;
    }
    if (row === n) {
      if (board.get(0)[Math.floor(n / 2)] === 1) {
        solution++;
      } else {
        solution += 2;
      }
      return;
    }
    
    var ilength = row === 0 ? Math.ceil(n / 2) : n;
    for (var i = 0; i < ilength; i++) {
      testRow = [];
      for (var j = 0; j < n; j++) {
        if (j === i) {
          testRow.push(1);
        } else {
          testRow.push(0);
        }
      }
      var newBoard = new Board(board.rows());
      newBoard.set(row, testRow);
      evaluateBoard(newBoard, row + 1, i);
    }
  };
  var initBoard = new Board({n: n });
  evaluateBoard(initBoard, 0);
  console.log('Number of solutions for ' + n + ' queens:', solution);
  return solution;
};
