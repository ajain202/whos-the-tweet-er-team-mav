import architecture from '../../assets/images/cs484.jpg';

function About() {
  return (
    <div className="p-5 max-w-[850px] mx-auto">
      <div
        style={{
          color: '#05395c',
          fontWeight: '600',
          lineHeight: '1.1',
          margin: '0px 0px 10px 0px',
          fontSize: 'clamp(40px, 8vw, 80px)',
          alignContent: 'center',
        }}
      >
        Architecture Diagram
      </div>

      <img src={architecture} alt="arch" style={{ width: '100%', border: '3px solid #05395c' }} />
      <div className="mt-4">
        <h2 style={{ textDecorationLine: 'underline', color: '#05395c', alignItems: 'center' }}>
          Product Description
        </h2>
        Our application is called 'Who's the Tweet-er', its a simple concept based on the fact that
        the followers on social media are getting out of hand and we thought it would be fun to test
        the user's knowledge. The user would be presented with a tweet and would have to guess the
        user who tweeted it. <br />
        <br />
        We use Twitter OAuth using Firebase for user login. Only a logged in twitter user can play
        our game. On game start, we display 10 random twitter users that the logged in user follows.
        The user can select between 2-5 users and continue with the game. We fetch the tweets of the
        selected users and generate questions out of the fetched tweets. Each question is assigned a
        score between 1 and 5 based on tweet similarity. We update the user's score based on the
        selected answer.
        <br />
        We are using Firebase for backend and React for frontend. We are using use GitHub for
        version control along with Netlify for CI/CD and hosting.
      </div>
      <div className="mt-5">
        <h2 style={{ textDecorationLine: 'underline', color: '#05395c', alignItems: 'center' }}>
          Current Functionality
        </h2>
        1. Twitter OAuth using Firebase.
        <br />
        2. Fetching 10 random Twitter users who you follow using Twitter API.
        <br />
        3. Fetching their tweets using Twitter API.
        <br />
        4. Generating questions and assigning scores using tweet similarity.
        <br />
        5. Implementing the game with user score tracking.
      </div>
    </div>
  );
}

export default About;
