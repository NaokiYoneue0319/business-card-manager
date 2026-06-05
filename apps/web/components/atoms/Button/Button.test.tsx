import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('ボタンの文字を表示する', () => {
    render(<Button>ログイン</Button>);

    expect(screen.getByRole('button', { name: 'ログイン' })).toBeInTheDocument();
  });
});