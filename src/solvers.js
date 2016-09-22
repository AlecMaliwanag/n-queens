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

  var boards = [];
  for (var i = 0; i < n; i++) {
    var board = new Board({n: n});
    board.togglePiece(0, i);
    boards.push(board);
  }

  if (n === 1) {
    return boards[0].rows();
  }
  var evaluateBoard = function(board, row, col, counter) {
    var placed = false;
    if (col === n) {
      row = row + 1;
      col = 0;
    }

    if (board.get(row)[col] === 0) {
      board.togglePiece(row, col);
      counter++;
      placed = true;
    }

    if (board.hasAnyQueensConflicts()) {
      board.togglePiece(row, col);
      counter--;
      placed = false;
    }

    if (placed && counter < n) {
      var dup = new Board(board.rows().slice());
      evaluateBoard(dup, row + 1, 0, counter);
      board.togglePiece(row, col);
      counter--;
    }


    if (row === n - 1 && col === n - 1) {
      if (counter === n) {
        solution.push(board.rows());
      }
      return;
    }
    evaluateBoard(board, row, col + 1, counter);
  };
  boards.forEach(function(board) {
    evaluateBoard(board, 1, 0, 1);
  });




  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution[0];
};

  // var solution;
  // var evaluateBoard = function(board, row, col, counter) {
  //   if (col === n) {
  //     row = row + 1;
  //     col = 0;
  //   }

  //   board.togglePiece(row, col);
  //   counter++;
  //   if (board.hasAnyQueensConflicts()) {
  //     board.togglePiece(row, col);
  //     counter--;
  //   }

  //   if (row === n - 1 && col === n - 1) {
  //     if (counter === n) {
  //       solution = board.rows();
  //     }
  //     return;
  //   }
  //   evaluateBoard(board, row, col + 1, counter);
  // };
  // boards.forEach(function(board) {
  //   evaluateBoard(board, 1, 0, 1);
  // });
// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
