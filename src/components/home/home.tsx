/* eslint-disable no-console */
import axios from 'axios';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    axios
      .get('/.netlify/functions/getFollowerTweets')
      .then((data) => {
        console.log('data', data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  return <div>Home</div>;
}

export default Home;
