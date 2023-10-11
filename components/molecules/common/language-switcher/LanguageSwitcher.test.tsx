import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { renderWithIntl } from '@/__tests__/helpers';

jest.mock('next-intl/client', () => ({
  usePathname() {
    return '';
  },
}));

describe('LanguageSwitcher', () => {
  test('loads and displays item on click', async () => {
    const user = userEvent.setup();

    await renderWithIntl(<LanguageSwitcher />);

    expect(screen.getAllByText('English')).toHaveLength(1);

    await user.click(screen.getByText('English'));

    expect(screen.getByText('Español')).toBeInTheDocument();
    expect(screen.getByText('Magyar')).toBeInTheDocument();
    expect(screen.getAllByText('English')).toHaveLength(2);
  });
});
