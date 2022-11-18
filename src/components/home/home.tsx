import axios from 'axios';
import { OAuthCredential } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FollowerTweets } from '../../models/follower-tweets';

interface Props {
  oAuthCredential: OAuthCredential | null;
}

function Home({ oAuthCredential }: Props) {
  const [followerTweets, setFollowerTweets] = useState<Array<FollowerTweets>>([]);

  useEffect(() => {
    if (oAuthCredential?.accessToken && oAuthCredential.secret) {
      const cachedFollowerTweets = JSON.parse(localStorage.getItem('follower_tweets') || '[]');
      if (cachedFollowerTweets.length > 0) {
        setFollowerTweets(cachedFollowerTweets);
      } else {
        axios
          .get('/.netlify/functions/get-follower-tweets', {
            params: {
              accessToken: oAuthCredential.accessToken,
              accessSecret: oAuthCredential.secret,
            },
          })
          .then(({ data }) => {
            localStorage.setItem('follower_tweets', JSON.stringify(data));
            setFollowerTweets(data);
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [oAuthCredential]);

  return (
    <div className="p-5">
      {followerTweets.length > 0 && (
        <table className="w-full border text-center">
          <thead className="border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 border-r">
                Follower Name
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4">
                Tweets
              </th>
            </tr>
          </thead>
          <tbody>
            {followerTweets.map(({ follower, tweets }) => (
              <tr key={follower.id} className="border-b">
                <td className="text-sm text-gray-900 font-light px-6 py-4 border-r">
                  {follower.name}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4">
                  {tweets.map(({ id, text }) => (
                    <div key={id} className="border-b">
                      {text}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
