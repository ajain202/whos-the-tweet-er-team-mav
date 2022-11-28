import axios from 'axios';
import { OAuthCredential, User } from 'firebase/auth';
import { useState } from 'react';
import { Following } from '../../models/models';
import GameCard from '../game-screen/game-screen';
import Button from '../resusable-controls/button';
import FollowingList from './following-list';
import generateQuestions from '../../utilities/generate-questions';

interface Props {
  oAuthCredential: OAuthCredential | null;
  session: User | null;
}

function Home({ oAuthCredential, session }: Props) {
  const [stage, setStage] = useState<'start' | 'following' | 'ingame'>('start');
  const [following, setFollowing] = useState<Array<Following>>([]);

  const onStartHandler = () => {
    if (oAuthCredential?.accessToken && oAuthCredential.secret) {
      axios
        .get('/.netlify/functions/get-following', {
          params: {
            accessToken: oAuthCredential.accessToken,
            accessSecret: oAuthCredential.secret,
          },
        })
        .then(({ data }) => {
          if (Array.isArray(data) && data.length > 0) {
            setStage('following');
            setFollowing(data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onFollowingSubmitHandler = () => {
    if (oAuthCredential?.accessToken && oAuthCredential.secret) {
      axios
        .get('/.netlify/functions/get-tweets-for-following', {
          params: {
            accessToken: oAuthCredential.accessToken,
            accessSecret: oAuthCredential.secret,
            following: following
              .filter(({ selected }) => !!selected)
              .map(({ id }) => id)
              .join(','),
          },
        })
        .then(({ data }) => {
          if (Array.isArray(data) && data.length > 0) {
            console.log('data', data);
            sessionStorage.setItem('data', JSON.stringify(data));
            generateQuestions(data, session);
            setStage('ingame');
          }
        });
    }
  };

  return (
    <div className="p-5">
      {stage === 'start' && <Button label="Start Game" type="button" onClick={onStartHandler} />}
      {stage === 'following' && (
        <FollowingList
          following={following}
          setFollowing={setFollowing}
          onFollowingSubmitHandler={onFollowingSubmitHandler}
        />
      )}
      {stage === 'ingame' && <GameCard />}
    </div>
  );
}

export default Home;
