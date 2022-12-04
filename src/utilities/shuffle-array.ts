/*
  Function for shuffling elements of an array
  ref - https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
  ref - https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/18650169#18650169
*/
export default function shuffleArray(array: Array<any>) {
  const shuffledArray = array;
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
}
