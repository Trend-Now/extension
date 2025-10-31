import ToggleOption from './components/ToggleOption';
import './Popup.css';

const Popup = () => {
  const handleButtonDisplayToggle = (state: boolean) => {
    chrome.storage.local.set({ showButton: state });
  };

  return (
    <div className="popup-container">
      <ToggleOption
        text="트렌드나우 아이콘 표시"
        enabled={false}
        onToggle={handleButtonDisplayToggle}
      />
    </div>
  );
};

export default Popup;
