// Local storage utility for storing and retrieving UserInfo

import type {UserInfo} from './types';

const USER_INFO_KEY = 'image-lister-user-info';

export function saveUserInfo(userInfo: UserInfo): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  }
}

export function loadUserInfo(): UserInfo | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }
  const userInfoString = localStorage.getItem(USER_INFO_KEY);
  if (userInfoString) {
    try {
      return JSON.parse(userInfoString) as UserInfo;
    } catch (error) {
      console.error('Error parsing user info from local storage:', error);
      return undefined;
    }
  }
  return undefined;
}
