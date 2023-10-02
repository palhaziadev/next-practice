'use client';
import Button from '@/components/lib/button/Button';
import InputField from '@/components/lib/input-field/InputField';
import React, { useState } from 'react';
import styles from './Search.module.scss';
import { useTranslations } from 'next-intl';

type SearchProps = {
  onSearch: (value: string) => void;
};

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const t = useTranslations('Search');
  const [value, setValue] = useState('');

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      onSearch(value);
    }
  };

  return (
    <div className={styles.container}>
      <InputField
        onChange={(value) => setValue(value)}
        value={value}
        onKeyDown={handleKeyDown}
        placeholder={t('inputPlaceholder')}
      />
      <Button text={t('buttonText')} onClick={() => onSearch(value)}></Button>
    </div>
  );
};

export default Search;
