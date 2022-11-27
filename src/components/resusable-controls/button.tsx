interface ButtonProps {
  label: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  disabled?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function Button({ label, type, onClick, disabled }: ButtonProps) {
  return (
    <button
      name={label}
      // eslint-disable-next-line react/button-has-type
      type={type}
      onClick={onClick}
      disabled={disabled}
      className="px-5 py-2 bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-700 rounded text-white text-sm"
    >
      {label}
    </button>
  );
}

Button.defaultProps = {
  disabled: false,
};

export default Button;
