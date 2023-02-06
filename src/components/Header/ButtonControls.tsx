import React, { memo } from 'react';
import { Button } from 'react-bootstrap';

function ButtonControls() {
  return (
    <div>
      <Button className="secondary-button me-2">Sign In</Button>
      <Button className="primary-button">Sign Up</Button>
    </div>
  );
}

export default memo(ButtonControls);
