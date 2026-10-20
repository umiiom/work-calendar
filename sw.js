// 업무 캘린더 서비스 워커: 윈도우 알림 전송 + 알림 클릭 시 창 열기
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', () => {}); // 앱 설치 조건 충족용
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const data = e.notification.data || {};
  e.waitUntil((async () => {
    const list = await self.clients.matchAll({type: 'window', includeUncontrolled: true});
    if (list.length) {
      const c = list[0];
      try { await c.focus(); } catch (_) {}
      c.postMessage({type: 'notif-click', id: data.id});
    } else {
      await self.clients.openWindow('./');
    }
  })());
});
