import MDEditor from '@uiw/react-md-editor';
import React, { memo } from 'react';

interface MarkdownTextareaProps {
  value: string;
  setValue: (value: string) => void;
}

function MarkdownTextarea({ value, setValue }: MarkdownTextareaProps) {
  return (
    <div data-color-mode="light">
      <MDEditor
        aria-required
        value={value}
        onChange={(val) => {
          setValue(val as string);
        }}
      />
    </div>
  );
}

export default memo(MarkdownTextarea);
