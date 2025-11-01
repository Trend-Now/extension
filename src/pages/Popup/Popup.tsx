import { useEffect, useState } from 'react';
import ToggleOption from './components/ToggleOption';
import './Popup.css';
import { ChromeLocalStorage } from '../shared/lib/chrome';
import { sendShowButtonMessage } from './messages/settingsMessage';

const Popup = () => {
  const [isShowButton, setIsShowButton] = useState<boolean>(true);

  useEffect(() => {
    ChromeLocalStorage.get('showButton', true).then((res) => {
      setIsShowButton(res);
    });
  }, []);

  const handleButtonDisplayToggle = (state: boolean) => {
    setIsShowButton(state);
    sendShowButtonMessage(state);
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
