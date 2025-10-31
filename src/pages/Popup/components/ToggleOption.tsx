interface ToggleOptionProps {
  text: string;
  enabled: boolean;
  onToggle: (state: boolean) => void;
  optionDisabled?: boolean;
}

export default function ToggleOption({
  text,
  enabled,
  onToggle,
  optionDisabled = false,
}: ToggleOptionProps) {
  return (
    <label className="toggle-option__container">
      <input
        type="checkbox"
        role="switch"
        id={text}
        className="toggle-option__button"
        defaultChecked={enabled}
        onChange={(e) => onToggle(e.target.checked)}
        disabled={optionDisabled}
      />
      <span className="toggle-option__text">{text}</span>
    </label>
  );
}
