import { ChangeEventHandler } from 'react';

interface Props {
  id: string;
  label: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}

function Checkbox({ id, label, checked, onChange }: Props) {
  return (
    <div className="py-4 flex items-center">
      <div className="bg-white border rounded-sm border-gray-400 w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
        <input
          id={id}
          checked={checked}
          onChange={onChange}
          type="checkbox"
          className="focus:outline-none opacity-0 focus:opacity-100 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 absolute cursor-pointer w-full h-full"
        />
        <div
          className={`check-icon bg-indigo-700 text-white rounded-sm ${checked ? '' : 'hidden'}`}
        >
          <img
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/checkbox_large-svg1.svg"
            alt="tick"
          />
        </div>
      </div>
      <p className="ml-3 text-base leading-4 font-normal text-gray-800">{label}</p>
    </div>
  );
}

export default Checkbox;
