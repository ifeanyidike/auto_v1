'use client';
import { hookstate } from '@hookstate/core';

export const toggleNav = hookstate<boolean>(false);
export const subdomainFunc = hookstate<string | null | undefined>(null);

export const getSubdomain = () => {
  if (!window) return;
  const url = window.location.host;
  const strToCompare = url
    .replace('www.', '')
    .replace('https://', '')
    .replace('http://', '');
  const localhostTest = strToCompare.split(':').length > 1;

  let isLocalHost = false;
  if (localhostTest && strToCompare.includes('localhost')) {
    isLocalHost = true;
  }

  const urlParts = url.replace('www.', '').split('.');
  if (isLocalHost) {
    return urlParts.length < 2 ? '' : urlParts[0];
  }
  return urlParts.length <= 2 ? '' : urlParts[0];
};
