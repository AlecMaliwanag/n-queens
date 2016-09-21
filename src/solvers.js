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
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
