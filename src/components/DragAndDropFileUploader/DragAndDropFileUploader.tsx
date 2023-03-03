import React from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { useTranslation } from 'react-i18next';

import { imageFileTypes } from 'utils/constants';

import styles from './DragAndDropFileUploader.module.scss';

interface DragAndDropFileUploaderProps {
  changeFile: (file: File) => void;
  name: string;
  fileName: string | undefined;
  caption: string;
  isDisabled: boolean;
}

function DragAndDropFileUploader({
  changeFile,
  name,
  fileName,
  caption,
  isDisabled,
}: DragAndDropFileUploaderProps) {
  const { t } = useTranslation('translation');

  return (
    <div className={styles.fileUploader}>
      <FileUploader
        handleChange={changeFile}
        name={name}
        types={imageFileTypes}
        hoverTitle=" "
        disabled={isDisabled}
      />
      <p className="mb-0">
        <em>
          {t(caption)}
          {fileName && `${fileName}`}
        </em>
      </p>
    </div>
  );
}

export default DragAndDropFileUploader;
