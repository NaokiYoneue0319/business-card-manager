import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('ボタンの文字を表示する', () => {
    render(<Button>ログイン</Button>);

    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument();
  });

  it('クリック時にonClickが呼ばれる', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(<Button onClick={handleClick}>保存</Button>);

    await user.click(screen.getByRole('button', { name: '保存' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('disabledの場合クリックできない', async () => {
    const user = userEvent.setup();
    const handleClick = jest.fn();

    render(
      <Button disabled onClick={handleClick}>
        保存
      </Button>,
    );

    await user.click(screen.getByRole('button', { name: '保存' }));

    expect(handleClick).not.toHaveBeenCalled();
  });
});