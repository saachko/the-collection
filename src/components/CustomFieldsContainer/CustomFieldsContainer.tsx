import MDEditor from '@uiw/react-md-editor';
import React, { memo } from 'react';
import { MdClose, MdDone } from 'react-icons/md';

import { defaultInputTypes } from 'utils/constants';

import { CustomFieldInItem } from 'ts/interfaces';

import styles from './CustomFieldsContainer.module.scss';

interface CustomFieldsContainerProps {
  fields: CustomFieldInItem[] | undefined;
}

function CustomFieldsContainer({ fields }: CustomFieldsContainerProps) {
  return (
    <div className={styles.container}>
      {fields &&
        fields.length > 0 &&
        fields.map((field) => (
          <div key={field.customFieldId} className="d-flex gap-3 mb-3 mt-3">
            <div className={styles.label}>{field.label}:</div>
            <div className={styles.fieldValue}>
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
            </div>
          </div>
        ))}
    </div>
  );
}

export default memo(CustomFieldsContainer);
