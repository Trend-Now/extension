import { useEffect, useState } from 'react';
import ToggleOption from './components/ToggleOption';
import './Popup.css';

const Popup = () => {
  const [isShowButton, setIsShowButton] = useState<boolean>(true);

  useEffect(() => {
    chrome.storage.local.get('showButton', ({ showButton }) => {
      setIsShowButton(Boolean(showButton));
    });
  }, []);

  const handleButtonDisplayToggle = (state: boolean) => {
    setIsShowButton(state);
    chrome.storage.local.set({ showButton: state });
  };

  return (
    <div className="popup-container">
      <ToggleOption
        text="트렌드나우 아이콘 표시"
        enabled={isShowButton}
        onToggle={handleButtonDisplayToggle}
      />
    </div>
  );
};

export default Popup;
