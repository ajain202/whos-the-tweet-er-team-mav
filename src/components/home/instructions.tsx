function Instructions() {
  return (
    <div className="p-6 bg-[#f1f2f2] border border-gray-200 rounded-lg shadow-md">
      <h2 className="font-semibold text-lg mb-2">Instructions:</h2>
      <ul className="ml-5 space-y-1 w-full list-disc text-gray-600">
        <li>Welcome to Who's the Tweeter</li>

        <li>
          Our game is a simple game, you'll be presented with a tweet along with two options. You
          have to select the correct option.
        </li>

        <li>
          After starting the game, you'll be presented with a list of users you follow on twitter.
        </li>
        <li>Please select a minimum of 2 and upto 5 users.</li>
        <li>
          After selecting the users you want to play your game with please submit and move forward
        </li>
        <li>
          The Game begins here. You will see a tweet along with two options. Select one you see fit.
        </li>
        <li>
          You can track your score along with the leaderboards through the right portion of your
          screen.
        </li>
        <li>Click on Start Game button above to start your game. All the Best! Have fun!</li>
      </ul>
    </div>
  );
}

export default Instructions;
