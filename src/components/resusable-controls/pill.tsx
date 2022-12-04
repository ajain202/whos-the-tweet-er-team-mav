interface Props {
  primaryLabel: string;
  secondaryLabel: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function Pill({ primaryLabel, secondaryLabel, type, onClick, disabled }: Props) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="min-w-[50%] py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 focus:outline-none bg-[#f7f9f9] rounded-full border-[1.5px] border-gray-200 hover:bg-[rgba(0,0,0,0.05)] hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 disabled:cursor-not-allowed"
    >
      <div className="px-3">
        <div className="font-medium text-sm">{primaryLabel}</div>
        <div className="font-normal text-sm ">{secondaryLabel}</div>
      </div>
    </button>
  );
}

Pill.defaultProps = {
  disabled: false,
};

export default Pill;
