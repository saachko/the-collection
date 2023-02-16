import React, { memo } from 'react';
import Image from 'react-bootstrap/Image';
import { useTranslation } from 'react-i18next';

import EditDropdown from 'components/EditDropdown/EditDropdown';

import { EditDropdownItem } from 'ts/interfaces';

interface UserInfoProps {
  avatar: string | undefined;
  username: string | undefined;
  roles: string[] | undefined;
}

function UserInfo({ avatar, username, roles }: UserInfoProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'profilePage' });

  const editActions: EditDropdownItem[] = [
    { id: '1', title: 'Edit my data', action: () => console.log('edit') },
    { id: '2', title: 'Delete my profile', action: () => console.log('delete') },
  ];

  return (
    <div className="d-flex gap-4 justify-content-between">
      <div className="d-flex gap-4">
        <Image src={avatar} />
        <div>
          <h1 className="mb-0">{username}</h1>
          <p className="mt-0">
            <em>{t(`${roles?.includes('admin') ? `admin` : `user`}`)}</em>
          </p>
        </div>
      </div>
      <EditDropdown dropdownItems={editActions} />
    </div>
  );
}

export default memo(UserInfo);
