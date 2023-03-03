import React, { memo } from 'react';
import { Dropdown } from 'react-bootstrap';
import { BsThreeDots } from 'react-icons/bs';

import { EditDropdownItem } from 'ts/interfaces';

import styles from './EditDropdown.module.scss';

interface EditDropdownProps {
  dropdownItems: EditDropdownItem[];
}

function EditDropdown({ dropdownItems }: EditDropdownProps) {
  return (
    <Dropdown>
      <Dropdown.Toggle className={styles.dropdownButton}>
        <BsThreeDots />
      </Dropdown.Toggle>
      <Dropdown.Menu className={styles.dropdownMenu}>
        {dropdownItems.map((item) => (
          <Dropdown.Item
            key={item.id}
            className={styles.dropdownItem}
            onClick={item.action}
          >
            {item.title}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default memo(EditDropdown);
