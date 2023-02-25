import React, { memo } from 'react';

import { Item } from 'ts/interfaces';

import styles from './ItemsTable.module.scss';

interface ItemsTableProps {
  items: Item[] | null;
}

function ItemsTable({ items }: ItemsTableProps) {
  return <div>ItemsTable</div>;
}

export default memo(ItemsTable);
