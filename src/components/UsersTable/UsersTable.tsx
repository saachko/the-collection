import React, { memo } from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiFillLock, AiFillStar } from 'react-icons/ai';

import { usersTableHeadings } from 'utils/constants';
import { formatDate } from 'utils/functions';

import { User } from 'ts/interfaces';

import styles from './UsersTable.module.scss';

interface UsersTableProps {
  users: User[] | null;
}

function UsersTable({ users }: UsersTableProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'usersPage' });

  return (
    <div>
      <Table responsive className={styles.table}>
        <thead>
          <tr>
            {usersTableHeadings.map((heading) => (
              <th key={heading.id}>{t(heading.headingName)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <OverlayTrigger placement="right" overlay={<Tooltip>{user._id}</Tooltip>}>
                <td>{user._id.slice(0, 7)}...</td>
              </OverlayTrigger>
              <td>
                {user.username}
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>{t('admin')}</Tooltip>}
                >
                  <span className={styles.adminIcon}>
                    {user.roles.includes('admin') && <AiFillStar />}
                  </span>
                </OverlayTrigger>
                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip>{t('blocked')}</Tooltip>}
                >
                  <span className={styles.blockIcon}>
                    {user.isBlocked && <AiFillLock />}
                  </span>
                </OverlayTrigger>
              </td>
              <td>{user.email}</td>
              <td>{formatDate(user.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default memo(UsersTable);
