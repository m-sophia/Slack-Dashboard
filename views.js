function renderHomeTab(statusStore) {
  const statusOptions = {
    available: '🟢 Available',
    busy: '🔴 Busy',
    offline: '⚪️ Offline',
  };

  const users = Object.keys(statusStore).map(userId => ({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: `<@${userId}> is *${statusOptions[statusStore[userId]] || 'Unknown'}*`,
    },
  }));

  return {
    type: 'home',
    blocks: [
      {
        type: 'section',
        text: { type: 'mrkdwn', text: '*👥 Team Status Dashboard*' },
      },
      ...users,
      {
        type: 'divider',
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'static_select',
            action_id: 'status_select',
            placeholder: { type: 'plain_text', text: 'Set your status' },
            options: Object.entries(statusOptions).map(([value, label]) => ({
              text: { type: 'plain_text', text: label },
              value,
            })),
          },
        ],
      },
    ],
  };
}

module.exports = { renderHomeTab };