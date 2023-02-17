import React, { memo } from 'react';
import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { AiFillLock, AiFillStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { setSelectedUser } from 'redux/slices/adminSlice';

import { usersTableHeadings } from 'utils/constants';
import { formatDate } from 'utils/functions';

import { useAppDispatch } from 'hooks/useRedux';

import { User } from 'ts/interfaces';

import styles from './UsersTable.module.scss';

interface UsersTableProps {
  users: User[] | null;
}

function UsersTable({ users }: UsersTableProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'usersPage' });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const selectUser = (userId: string) => {
    const selectedUser = users?.find((user) => user._id === userId);
    if (selectedUser) {
      dispatch(setSelectedUser(selectedUser));
      navigate(`/users/${userId}`);
    }
  };

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
            <tr key={user._id} onClick={() => selectUser(user._id)}>
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
