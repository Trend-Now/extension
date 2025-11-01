import { Option } from '../const/settings';

export class ChromeLocalStorage {
  static async get<T extends keyof Option>(
    key: T,
    defaultValue: Option[T]
  ): Promise<Option[T]> {
    return new Promise((resolve) => {
      chrome.storage.local.get(key, (result) => {
        if (result[key] === undefined) {
          resolve(defaultValue);
        } else {
          resolve(result[key]);
        }
      });
    });
  }

  static async set<T extends keyof Option>(
    key: T,
    value: Option[T]
  ): Promise<void> {
    return new Promise((resolve) => {
      chrome.storage.local.set({ [key]: value }, () => {
        resolve();
      });
    });
  }
}

export class ChromeTabs {
  static async sendTabsMessage<T, R>(
    message: T,
    callback: (response: R) => void
  ) {
    chrome.tabs.query({}, function (tabs) {
      tabs.forEach((tab) => {
        if (!tab.id) throw new Error('Tab ID is undefined');

        chrome.tabs.sendMessage<T, R>(tab.id, message, callback);
      });
    });
  }
}

export class ChromeRuntime {
  static async sendMessage<T, R>(message: T, callback: (response: R) => void) {
    chrome.runtime.sendMessage<T, R>(message).then(callback);
  }

  static addListener<T, R>(
    listener: (
      message: T,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: R) => void
    ) => void | boolean
  ) {
    chrome.runtime.onMessage.addListener(listener);
  }
}
