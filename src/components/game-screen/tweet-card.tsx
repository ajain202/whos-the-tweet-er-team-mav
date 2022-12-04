import ProfilePicture from '../../assets/images/twitter-profile-picture.jpg';
import { Question } from '../../models/models';

interface Props {
  question: Question;
  score: number;
}

function TweetCard({ question, score }: Props) {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="  min-h-[300px] bg-white border-gray-200 p-4 rounded-xl border w-full flex-col justify-between flex">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img className="h-11 w-11 rounded-full" src={ProfilePicture} alt="profile" />
            <div className="ml-1.5 text-sm leading-tight">
              <span className="text-black font-bold block ">???????????</span>
              <span className="text-gray-500 font-normal block">@_____</span>
            </div>
          </div>
          <svg className="text-blue-400 h-6 w-auto inline-block fill-current" viewBox="0 0 24 24">
            <g>
              <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z" />
            </g>
          </svg>
        </div>
        <p className="text-black block text-xl leading-snug my-3">{question.tweet}</p>
        <div>
          <div className="border-gray-200 border border-b-0 my-1" />
          <div className="flex flex-row justify-between">
            <p className="text-gray-500 text-base py-1 my-0.5">10:05 AM · Dec 19, 2020</p>
            <p className="text-gray-700 text-base py-1 my-0.5 font-medium">Points: {score}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TweetCard;
