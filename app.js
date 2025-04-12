const { App } = require('@slack/bolt');
require('dotenv').config();
const { renderHomeTab } = require('./views');
const statusStore = require('./statusStore');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
});

app.event('app_home_opened', async ({ event, client }) => {
  await client.views.publish({
    user_id: event.user,
    view: renderHomeTab(statusStore),
  });
});

app.action('status_select', async ({ ack, body, client }) => {
  await ack();
  const user = body.user.id;
  const selected = body.actions[0].selected_option.value;
  statusStore[user] = selected;

  await client.views.publish({
    user_id: user,
    view: renderHomeTab(statusStore),
  });
});

(async () => {
  await app.start();
  console.log('Slack app is running!');
})();