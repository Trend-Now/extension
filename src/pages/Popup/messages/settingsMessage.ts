import { ChromeLocalStorage, ChromeTabs } from '../../shared/lib/chrome';
import {
  SettingsBooleanMessage,
  SettingsMessageResponse,
} from '../../shared/types/settings';

export const sendShowButtonMessage = (visible: boolean) => {
  ChromeTabs.sendTabsMessage<SettingsBooleanMessage, SettingsMessageResponse>(
    { option: 'showButton', data: visible },
    (res) => {
      if (res && res.success) ChromeLocalStorage.set('showButton', visible);
    }
  ).catch((err) => {
    console.error('Error sending showButton message:', err);
  });
};
