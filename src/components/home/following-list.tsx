import { Following } from '../../models/models';
import Button from '../resusable-controls/button';
import Checkbox from '../resusable-controls/checkbox';

interface Props {
  following: Following[];
  setFollowing: React.Dispatch<React.SetStateAction<Following[]>>;
  onFollowingSubmitHandler: React.MouseEventHandler<HTMLButtonElement>;
  disableFollowingButton: boolean;
}

function FollowingList({
  following,
  setFollowing,
  onFollowingSubmitHandler,
  disableFollowingButton,
}: Props) {
  const onFollowingChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFollowing(
      following.map((foll) =>
        foll.id === e.target.id ? { ...foll, selected: e.target.checked } : foll,
      ),
    );
  };

  return (
    <div>
      <p className="font-semibold text-lg">Select users you follow</p>
      <ul className="my-3">
        {following.map(({ username, id, name, selected }) => (
          <li key={id}>
            <Checkbox
              id={id}
              label={`${name} (@${username})`}
              checked={!!selected}
              onChange={onFollowingChangeHandler}
            />
          </li>
        ))}
      </ul>
      <Button
        label={disableFollowingButton ? 'Loading...' : 'Submit'}
        type="button"
        onClick={onFollowingSubmitHandler}
        disabled={disableFollowingButton}
      />
    </div>
  );
}

export default FollowingList;
