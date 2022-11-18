interface ButtonProps {
  label: string;
  type: 'button' | 'submit' | 'reset' | undefined;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

function Button({ label, type, onClick }: ButtonProps) {
  return (
    <button
      name={label}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className="px-5 py-2 bg-indigo-600 transition duration-150 ease-in-out hover:bg-indigo-700 rounded text-white text-sm"
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default Button;
