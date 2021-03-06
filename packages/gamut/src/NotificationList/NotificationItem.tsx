import React from 'react';
import cx from 'classnames';
import { Truncate } from '../Truncate';
import { Notification } from './typings';
import { NotificationIcon } from './NotificationIcon';
import styles from './styles/Notification.module.scss';

export type NotificationItemProps = {
  onClick?: (event: object) => void;
  notification: Notification;
};

export const NotificationItem: React.FC<NotificationItemProps> = (props) => {
  const { notification, onClick } = props;
  const {
    date,
    iconSettings,
    iconSlug,
    imageUrl,
    link,
    text,
    unread,
  } = notification;

  const notificationClasses = cx(styles.notification, {
    [styles.unread]: unread,
  });

  const [TagName, tagProps] = link
    ? ([
        'a',
        { href: link, rel: 'noopener noreferrer', target: '_blank' },
      ] as const)
    : (['button', { type: 'button' }] as const);

  return (
    <TagName
      className={cx(notificationClasses)}
      onClick={onClick}
      {...tagProps}
    >
      <NotificationIcon
        iconSettings={iconSettings}
        iconSlug={iconSlug}
        imageUrl={imageUrl}
      />
      <div className={styles.body}>
        <div className={styles.text}>
          <Truncate lines={3}>{text}</Truncate>
        </div>
        <div className={styles.time}>{date}</div>
      </div>
    </TagName>
  );
};
