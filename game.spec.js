require('./legacy-game.js');
require('./game.js');

const runGame = function (game, randomsValues) {

  const oldConsole = console.log;
  let output = '';
  console.log = (text) => {
    output += `${text}\n`;
  }

  game.add('Chet');
  game.add('Pat');
  game.add('Sue');

  let i = 0;
  let j = 0;

  do {

    game.roll(randomsValues.pop());

    if (randomsValues.pop() == 7) {
      notAWinner = game.wrongAnswer();
    } else {
      notAWinner = game.wasCorrectlyAnswered();
    }

  } while (notAWinner);
  console.log = oldConsole;
  return output;
}

const scenarioGenerator = function (game) {
  const randoms = [];

  game.add('Chet');
  game.add('Pat');
  game.add('Sue');

  do {
    const randomRoll = Math.floor(Math.random() * 6) + 1;
    game.roll(randomRoll);
    randoms.push(randomRoll);

    const randomAnswer = Math.floor(Math.random() * 10);
    randoms.push(randomAnswer);
    if (randomAnswer == 7) {
      notAWinner = game.wrongAnswer();
    } else {
      notAWinner = game.wasCorrectlyAnswered();
    }

  } while (notAWinner);
  return randoms.reverse();
}

describe("The test environment", function() {
  it("should pass", function() {
    expect(true).toBe(true);
  });

  it("scenario 1", function() {
    /* const mathRandomSpy = jest.spyOn(Math, 'random');
    mathRandomSpy.mockImplementation(() => 0.5); */
    const randoms = [2, 1, 5, 5, 5, 3, 7, 3, 4, 2, 7, 5, 0, 3, 7, 3, 7, 2, 1, 4, 9, 6, 2, 3, 9, 6, 6, 3, 0, 2, 4, 4, 8, 4, 1, 3, 5, 1, 2, 1];
  
    const legacyGame = runGame(new LegacyGame(), [...randoms]);
    const game = runGame(new Game(), [...randoms]);
    expect(game).toBe(legacyGame);
  });

  it("scenario 2", function() {
    /* const mathRandomSpy = jest.spyOn(Math, 'random');
    mathRandomSpy.mockImplementation(() => 0.5); */
    const randoms = [4, 3, 9, 6, 0, 4, 5, 3, 6, 4, 8, 2, 0, 2, 2, 3, 5, 6, 0, 4, 8, 6, 7, 1, 0, 2, 7, 1, 7, 6, 6, 6, 6, 2];
  
    const legacyGame = runGame(new LegacyGame(), [...randoms]);
    const game = runGame(new Game(), [...randoms]);
    expect(game).toBe(legacyGame);
  });

  it("scenario 3", function() {
    /* const mathRandomSpy = jest.spyOn(Math, 'random');
    mathRandomSpy.mockImplementation(() => 0.5); */
    const randoms = [5, 2, 6, 6, 4, 2, 1, 1, 3, 6, 0, 3, 5, 6, 7, 2, 7, 1, 2, 3, 2, 5, 2, 5, 9, 5, 2, 2, 0, 2, 0, 2];
  
    const legacyGame = runGame(new LegacyGame(), [...randoms]);
    const game = runGame(new Game(), [...randoms]);
    expect(game).toBe(legacyGame);
  });

  it.skip("scenario generator", function() {
    /* const mathRandomSpy = jest.spyOn(Math, 'random');
    mathRandomSpy.mockImplementation(() => 0.5); */
  
    //const legacyGame = runGame2(new LegacyGame());

    const game = scenarioGenerator(new Game());
    expect(game).toBe('');
  });
});

describe("Your specs...", function() {
  // it ...
});
