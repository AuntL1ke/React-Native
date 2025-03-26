import * as Notifications from 'expo-notifications';

export async function scheduleTaskNotification(title: string, datetime: Date, taskId: string) {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: '⏰ Deadline!',
      body: `Task "${title}" is due.`,
      data: { taskId },
      categoryIdentifier: 'task-actions',
    },
    trigger: datetime,
  });
}
