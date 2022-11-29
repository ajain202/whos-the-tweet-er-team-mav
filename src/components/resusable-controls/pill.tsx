interface ButtonProps {
  primaryLabel: string;
  secondaryLabel: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function Pill({ primaryLabel, secondaryLabel, type, onClick, disabled }: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
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
