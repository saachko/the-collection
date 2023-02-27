import MDEditor from '@uiw/react-md-editor';
import clsx from 'clsx';
import React, { memo } from 'react';
import { Image, Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { FaHeart } from 'react-icons/fa';
import { MdClose, MdDone } from 'react-icons/md';
import { v4 } from 'uuid';

import { defaultInputTypes } from 'utils/constants';
import { formatDate } from 'utils/functions';

import useCustomFieldsInCollection from 'hooks/useGetCustomFieldsInCollection';

import { Item } from 'ts/interfaces';

import styles from './ItemsTable.module.scss';

interface ItemsTableProps {
  collectionId: string | undefined;
  items: Item[] | null;
}

function ItemsTable({ collectionId, items }: ItemsTableProps) {
  const { t } = useTranslation('translation', { keyPrefix: 'collectionPage' });
  const defaultItemsTableHeadings = ['#', 'image', 'name', 'date'];
  const { fieldsInCollection } = useCustomFieldsInCollection(collectionId);

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
            {fieldsInCollection &&
              fieldsInCollection.map((field) => <th key={v4()}>{field.label}</th>)}
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
                <td key={field.customFieldId}>
                  {defaultInputTypes.includes(field.type) && (`${field.value}` || '⎯')}
                  {field.type === 'text' && (
                    <MDEditor.Markdown
                      source={field.value || '⎯'}
                      className={styles.textarea}
                    />
                  )}
                  {field.type === 'checkbox' &&
                    (field.value === 'true' ? (
                      <div className={styles.checkboxTrue}>
                        <MdDone />
                      </div>
                    ) : (
                      <MdClose />
                    ))}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default memo(ItemsTable);
