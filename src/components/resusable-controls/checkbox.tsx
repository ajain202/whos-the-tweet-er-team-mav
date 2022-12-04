import { ChangeEventHandler } from 'react';

interface Props {
  id: string;
  label: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
}

function Checkbox({ id, label, checked, onChange }: Props) {
  return (
    <label className="flex py-2 cursor-pointer select-none" htmlFor={id}>
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
            className="max-w-none"
            src="https://tuk-cdn.s3.amazonaws.com/can-uploader/checkbox_large-svg1.svg"
            alt="tick"
          />
        </div>
      </div>
      <p className="ml-3 mt-[1px] text-base leading-4 font-normal text-gray-800">{label}</p>
    </label>
  );
}

export default Checkbox;
