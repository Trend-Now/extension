import React from 'react';
import { createRoot } from 'react-dom/client';
import Root from './components/Root';

function inject() {
  // 고유 컨테이너 생성
  const host = document.createElement('div');
  host.id = 'tnext-floating-host';
  document.documentElement.appendChild(host);

  // Shadow DOM 생성 (스타일 충돌 방지)
  const shadow = host.attachShadow({ mode: 'open' });
  const container = document.createElement('div');
  shadow.appendChild(container);

  // ✅ CSS 파일을 link로 Shadow DOM 안에 넣기
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = chrome.runtime.getURL('content.styles.css');
  shadow.appendChild(link);

  // React 마운트
  const root = createRoot(container);
  root.render(<Root />);
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', inject);
} else {
  inject();
}
