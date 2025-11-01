import { create } from 'zustand';

interface SettingsState {
  buttonVisible: boolean;
  setButtonVisible: (visible: boolean) => void;
}

const getInitialButtonVisible = (): boolean => {
  let state = true;

  chrome.storage.local.get('showButton', ({ showButton }) => {
    console.log('Retrieved showButton from storage:', showButton);
    if (showButton !== undefined) state = Boolean(showButton);
  });

  return state;
};

export const useSettings = create<SettingsState>((set) => ({
  buttonVisible: getInitialButtonVisible(),
  setButtonVisible: (visible) => {
    console.log('Setting showButton in storage to:', visible);
    chrome.storage.local.set({ showButton: visible }).then(() => {
      set({
        buttonVisible: visible,
      });
    });
  },
}));
