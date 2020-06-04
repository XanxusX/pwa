/* eslint-disable no-console */

import {
  register
} from 'register-service-worker'


register(`${process.env.BASE_URL}service-worker.js`, {
  ready() {
    console.log(
      'App is being served from cache by a service worker.\n' +
      'For more details, visit https://goo.gl/AFskqB'
    )
    Notification.requestPermission(function (status) {
      displayNotification()
    });

  },
  registered() {
    console.log('Service worker has been registered.')
  },
  cached() {
    console.log('Content has been cached for offline use.')
  },
  updatefound() {
    console.log('New content is downloading.')
  },
  updated() {
    console.log('New content is available; please refresh.')
  },
  offline() {
    console.log('No internet connection found. App is running in offline mode.')
  },
  error(error) {
    console.error('Error during service worker registration:', error)
  }
})

function displayNotification() {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      var options = {
        body: 'Here is a notification body!',
        icon: 'images/example.png',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1
        },
        actions: [{
            action: 'explore',
            title: 'Explore this new world',
            icon: 'images/checkmark.png'
          },
          {
            action: 'close',
            title: 'Close notification',
            icon: 'images/xmark.png'
          },
        ]
      };
      reg.showNotification('Hello world!', options);
    });
  }
}