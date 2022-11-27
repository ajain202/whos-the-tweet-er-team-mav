import { Following } from '../../models/models';
import Button from '../resusable-controls/button';
import Checkbox from '../resusable-controls/checkbox';

interface Props {
  following: Following[];
  setFollowing: React.Dispatch<React.SetStateAction<Following[]>>;
  onFollowingSubmitHandler: React.MouseEventHandler<HTMLButtonElement>;
}

function FollowingList({ following, setFollowing, onFollowingSubmitHandler }: Props) {
  const onFollowingChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFollowing(
      following.map((f) => (f.id === e.target.id ? { ...f, selected: e.target.checked } : f)),
    );
  };

  return (
    <div>
      <ul>
        {following.map(({ username, id, name, selected }) => (
          <li key={id}>
            <Checkbox
              id={id}
              label={`${name} (@${username})`}
              checked={!!selected}
              onChange={onFollowingChangeHandler}
            />
            {/* {`${name} (@${username})`} */}
          </li>
        ))}
      </ul>
      <Button label="Submit" type="button" onClick={onFollowingSubmitHandler} />
    </div>
  );
}

export default FollowingList;
