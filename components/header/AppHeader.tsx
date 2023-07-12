import Link from 'next/link';
import React from 'react';

//TODO use in page layout
const AppHeader = () => {
  return (
    <div>
      <Link href="/">To Main</Link>
      <Link href="/notes">To Notes</Link>
    </div>
  );
};

export default AppHeader;
