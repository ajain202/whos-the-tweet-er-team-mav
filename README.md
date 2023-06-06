# final-project-proposal-team-mav

final-project-proposal-team-mav created by GitHub Classroom

## Who's the Tweet-er

- [Who's the Tweet-er](https://whos-the-tweet-er.netlify.app) (Doessn't work as Elon Musk wants our money now for using his API)
- [Demo](demo/demo.mp4)

### Group Members

1. Vedant Maheshwari (UIN: 658894297)
2. Aakash Jain (UIN: 669082669)
3. Mayur Mule (UIN: 677596520)

## Current Functionality

1. Twitter OAuth using Firebase.
2. Fetching 10 random Twitter users who you follow using Twitter API.
3. Fetching their tweets using Twitter API.
4. Generating questions and assigning scores using tweet similarity.
5. Implementing the game with user score tracking.

### What does your application do?

Our application is called 'Who's The Tweet-er', its a simple concept based on the fact that the followers on social media are getting out of hand and we thought
it would be fun to test the user's knowledge. The user would be presented with a tweet and would have to guess the follower it belongs to.
There are other concepts involved such as similarity coefficient to decide the difficulty.

### What makes it different than a CRUD app? I.e., what functionality does it provide that is not just a user interface layer on top of a database of user information, and the ability to view / add to / change that information?

Our application uses the Twitter API for fetching user's followers and their tweets. We will be maintaining the database just for storing the application specific user data. We are planning to use the string-similarity npm package for detecting the similarity coefficient between tweets.

### What security and privacy concerns do you expect you (as developers) or your users to have with this application?

We plan to implement login with Twitter functionality and OAuth for restricted resource access. We are thinking of using either JWT or Passport for authenticating our API endpoints.
