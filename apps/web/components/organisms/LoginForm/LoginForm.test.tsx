import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LoginForm } from './LoginForm';

const mockSetLoginId = jest.fn();
const mockSetPassword = jest.fn();
const mockHandleSubmit = jest.fn();

jest.mock('@/features/auth/hooks/useLogin', () => ({
  useLogin: () => ({
    loginId: '',
    password: '',
    errorMessage: '',
    isSubmitting: false,
    setLoginId: mockSetLoginId,
    setPassword: mockSetPassword,
    handleSubmit: mockHandleSubmit,
  }),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('ログインフォームを表示する', () => {
    render(<LoginForm />);

    expect(screen.getByText('ログインID')).toBeInTheDocument();
    expect(screen.getByText('パスワード')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument();
  });

  it('ログインID入力時にsetLoginIdが呼ばれる', async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText('ログインIDを入力'), 'admin');

    expect(mockSetLoginId).toHaveBeenCalled();
  });

  it('パスワード入力時にsetPasswordが呼ばれる', async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(screen.getByPlaceholderText('パスワードを入力'), 'adminpass');

    expect(mockSetPassword).toHaveBeenCalled();
  });

  it('ログインボタン押下時にhandleSubmitが呼ばれる', async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: 'ログイン' }));

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });
});