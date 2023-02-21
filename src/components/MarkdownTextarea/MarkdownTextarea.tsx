import MDEditor from '@uiw/react-md-editor';
import React, { memo, useState } from 'react';

function MarkdownTextarea() {
  const [value, setValue] = useState('');

  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val) => {
          setValue(val as string);
        }}
      />
    </div>
  );
}

export default memo(MarkdownTextarea);
