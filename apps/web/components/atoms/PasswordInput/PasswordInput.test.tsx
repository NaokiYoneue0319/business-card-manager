import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {
  it('placeholderを表示する', () => {
    render(
      <PasswordInput
        value=""
        placeholder="パスワードを入力"
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByPlaceholderText('パスワードを入力')).toBeInTheDocument();
  });

  it('type=passwordで表示される', () => {
    render(
      <PasswordInput
        value=""
        placeholder="パスワードを入力"
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByPlaceholderText('パスワードを入力')).toHaveAttribute(
      'type',
      'password',
    );
  });

  it('入力時にonChangeが呼ばれる', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <PasswordInput
        value=""
        placeholder="パスワードを入力"
        onChange={handleChange}
      />,
    );

    await user.type(screen.getByPlaceholderText('パスワードを入力'), 'pass');

    expect(handleChange).toHaveBeenCalled();
  });
});