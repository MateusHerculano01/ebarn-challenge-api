import webpush from 'web-push';

const options = {
  vapidDetails: {
    subject: 'mailto:challengeEbarn@gmail.com',
    publicKey: process.env.WEBPUSHPUBLICKEY,
    privateKey: process.env.WEBPUSHPRIVATEKEY,
  },
  TTL: 60,
};

const payloadFactory = (title: string, body: string, photoUrl: string) => {
  return JSON.stringify({
    notification: {
      title: title,
      body: body,
      icon: photoUrl,
      // actions: [
      //   { action: 'bar', title: 'Meus tratores' },
      //   { action: 'baz', title: 'Todos os tratores' },
      // ],
      data: {
        onActionClick: {
          default: { operation: 'openWindow' },
          bar: {
            operation: 'focusLastFocusedOrOpen',
            url: '/home',
          },
          baz: {
            operation: 'navigateLastFocusedOrOpen',
            url: '/timeline',
          },
        },
      },
    },
  });
}

const sendNotification = async (title, body, subscription, photoUrl) => {
  webpush.sendNotification(subscription, payloadFactory(title, body, photoUrl), options)
    .then((res) => {
      console.log('SENT!!!');
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}

export {
  sendNotification
}
