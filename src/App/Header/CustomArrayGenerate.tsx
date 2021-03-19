import React from 'react';

import { Button } from 'antd';

import { useArrayActions } from 'contexts';

const CustomArrayGenerate: React.FC = () => {
  const { replaceArray } = useArrayActions();

  return (
    <Button type="primary" onClick={replaceArray}>
      Generate
    </Button>
  );
};

export default CustomArrayGenerate;
