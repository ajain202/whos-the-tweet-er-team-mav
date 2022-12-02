import axios from 'axios';
import { OAuthCredential, User } from 'firebase/auth';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaceIdError } from 'tabler-icons-react';
import { Following, FollowingTweets, Question } from '../../models/models';
import GameScreen from '../game-screen/game-screen';
import Button from '../resusable-controls/button';
import FollowingList from './following-list';
import generateQuestions from '../../utilities/generate-questions';
import Leaderboard from '../leaderboard/leaderboard';

interface Props {
  oAuthCredential: OAuthCredential | null;
  session: User | null;
}

function Home({ oAuthCredential, session }: Props) {
  const [stage, setStage] = useState<'start' | 'following' | 'ingame'>('start');
  const [following, setFollowing] = useState<Array<Following>>([]);
  const [questions, setQuestions] = useState<Array<Question>>([]);

  const onStartHandler = async () => {
    try {
      if (oAuthCredential?.accessToken && oAuthCredential.secret) {
        const { data }: { data: Array<Following> } = await axios.get(
          '/.netlify/functions/get-following',
          {
            params: {
              accessToken: oAuthCredential.accessToken,
              accessSecret: oAuthCredential.secret,
            },
          },
        );
        if (Array.isArray(data)) {
          if (data.length > 2) {
            setFollowing(data);
            setStage('following');
          } else {
            toast("Why are you even playing you don't follow enough people", {
              icon: <FaceIdError />,
            });
          }
        } else {
          toast("Twitter isn't talking to us try again in some time", { icon: <FaceIdError /> });
        }
      }
    } catch (_error) {
      toast("Twitter isn't talking to us try again in some time", { icon: <FaceIdError /> });
    }
  };

  const onFollowingSubmitHandler = async () => {
    try {
      const selectedCount = following.filter(({ selected }) => selected).length;
      if (selectedCount < 2) {
        toast('Did you even read the rules select atleast 2', { icon: <FaceIdError /> });
      } else if (selectedCount > 5) {
        toast('Did you even read the rules select atmost 5', { icon: <FaceIdError /> });
      } else if (oAuthCredential?.accessToken && oAuthCredential.secret) {
        const { data }: { data: FollowingTweets } = await axios.get(
          '/.netlify/functions/get-tweets-for-following',
          {
            params: {
              accessToken: oAuthCredential.accessToken,
              accessSecret: oAuthCredential.secret,
              following: following
                .filter(({ selected }) => !!selected)
                .map(({ id }) => id)
                .join(','),
            },
          },
        );
        if (Array.isArray(data) && data.length > 0) {
          const genQuestions = await generateQuestions(data, session);
          if (genQuestions.length > 0) {
            setQuestions(genQuestions);
            setStage('ingame');
          } else {
            toast('These people s@ck, choose someone else', { icon: <FaceIdError /> });
          }
        } else {
          toast('twitter hates me cause am cooler, try again in some time', {
            icon: <FaceIdError />,
          });
        }
      }
    } catch (_error) {
      toast('twitter hates me cause am cooler, try again in some time', { icon: <FaceIdError /> });
    }
  };

  const onExitHandler = () => {
    setStage('start');
    setFollowing([]);
    setQuestions([]);
  };

  return (
    <div className="container mx-auto p-5 xl:px-0 grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-8 md:h-[85vh] max-w-[1200px]">
      <div className="p-5 md:col-span-3 h-auto border border-blue-500 border-dashed">
        {session ? (
          <div className="flex flex-col items-center">
            {stage === 'start' && (
              <Button label="Start Game" type="button" onClick={onStartHandler} />
            )}
            {stage === 'following' && (
              <FollowingList
                following={following}
                setFollowing={setFollowing}
                onFollowingSubmitHandler={onFollowingSubmitHandler}
              />
            )}
            {stage === 'ingame' && questions.length > 0 && (
              <GameScreen
                questions={questions}
                following={following}
                onExitHandler={onExitHandler}
                session={session}
              />
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">Please login</div>
        )}
      </div>
      <div className="p-5 md:col-span-2 h-auto overflow-y-auto custom-scrollbar border border-blue-500 border-dashed">
        <div className="flex flex-col items-center">
          <p className="font-semibold text-lg">Leaderboards</p>
          <Leaderboard />
        </div>
      </div>
    </div>
  );
}

export default Home;
