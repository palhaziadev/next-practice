import React from 'react';
import style from './test.module.scss';

function Test() {
  return (
    <div className={style.test}>
      Test
      <span className={style.asdImport}>import</span>
      <span className={style.testy}>Testy</span>
      <span className={style['asd-asd']}>asdy</span>
    </div>
  );
}

export default Test;
