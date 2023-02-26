import clsx from 'clsx';
import React, { memo } from 'react';
import { Image, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaHeart } from 'react-icons/fa';
import { v4 } from 'uuid';

import { formatDate } from 'utils/functions';

import { Item } from 'ts/interfaces';

import styles from './ItemsTable.module.scss';

interface ItemsTableProps {
  items: Item[] | null;
}

function ItemsTable({ items }: ItemsTableProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'collectionPage' });
  const defaultItemsTableHeadings = ['#', 'image', 'name', 'date'];
  const itemsTableHeadings = items
    ? items[0].customFields.map((field) => field.label)
    : [];

  return (
    <div>
      <Table responsive className={styles.table}>
        <thead>
          <tr>
            {defaultItemsTableHeadings.map((heading) => (
              <th key={v4()}>{t(heading)}</th>
            ))}
            <th className={styles.likes}>
              {t('likes')} <FaHeart />
            </th>
            {itemsTableHeadings.map((heading) => (
              <th key={v4()}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items?.map((item, index) => (
            <tr key={item._id}>
              <td>{index + 1}</td>
              <td className="position-relative">
                <div
                  className={clsx('loading-skeleton position-absolute', styles.image)}
                />
                <Image
                  src={item.itemImage}
                  className={clsx('avatar position-absolute', styles.image)}
                />
                <p className={styles.imagePlaceholder}>itemImage</p>
              </td>
              <td>{item.itemName}</td>
              <td>{formatDate(item.createdAt)}</td>
              <td>{item.likes.length}</td>
              {item.customFields.map((field) => (
                <td key={field.customFieldId}>{field.value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default memo(ItemsTable);
