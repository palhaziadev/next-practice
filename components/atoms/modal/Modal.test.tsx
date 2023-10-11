import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithIntl } from '@/__tests__/helpers';
import Modal from './Modal';

describe('Modal', () => {
  test('should not render content if not open', async () => {
    await renderWithIntl(
      <Modal show={false} onClose={() => undefined}>
        <div>modal content</div>
      </Modal>
    );

    expect(screen.queryByText('modal content')).not.toBeInTheDocument();
    expect(screen.queryByText('close')).not.toBeInTheDocument();
  });

  test('should render content if open', async () => {
    await renderWithIntl(
      <>
        <Modal show={true} onClose={() => undefined}>
          <div>modal content</div>
        </Modal>
        <div id="modal-portal"></div>
      </>
    );

    expect(screen.queryByText('modal content')).toBeInTheDocument();
    expect(screen.queryByText('close')).toBeInTheDocument();
  });

  test('should close the modal on Escape keydown', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    await renderWithIntl(
      <>
        <Modal show={true} onClose={onClose}>
          <div>modal content</div>
        </Modal>
        <div id="modal-portal"></div>
      </>
    );

    expect(screen.queryByText('modal content')).toBeInTheDocument();
    expect(screen.queryByText('close')).toBeInTheDocument();

    await user.keyboard('[Escape]');

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('should close the modal on click close button', async () => {
    const user = userEvent.setup();
    const onClose = jest.fn();

    await renderWithIntl(
      <>
        <Modal show={true} onClose={onClose}>
          <div>modal content</div>
        </Modal>
        <div id="modal-portal"></div>
      </>
    );

    expect(screen.queryByText('modal content')).toBeInTheDocument();
    expect(screen.queryByText('close')).toBeInTheDocument();

    await user.click(screen.getByText('close'));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('should render title', async () => {
    await renderWithIntl(
      <Modal show={false} title="test title" onClose={() => undefined}>
        <div>modal content</div>
      </Modal>
    );

    expect(screen.queryByText('test title')).not.toBeInTheDocument();
  });
});
