import { Option } from '../const/settings';

export interface SettingsMessageResponse {
  success: boolean;
}

export interface SettingsMessage {
  option: keyof Option;
}

export interface SettingsBooleanMessage extends SettingsMessage {
  data: boolean;
}

export interface SettingsNumberMessage extends SettingsMessage {
  data: number;
}
