import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextInput } from './TextInput';

describe('TextInput', () => {
  it('placeholderを表示する', () => {
    render(
      <TextInput
        value=""
        placeholder="氏名を入力"
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByPlaceholderText('氏名を入力')).toBeInTheDocument();
  });

  it('valueを表示する', () => {
    render(
      <TextInput
        value="山田太郎"
        placeholder="氏名を入力"
        onChange={jest.fn()}
      />,
    );

    expect(screen.getByDisplayValue('山田太郎')).toBeInTheDocument();
  });

  it('入力時にonChangeが呼ばれる', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();

    render(
      <TextInput
        value=""
        placeholder="氏名を入力"
        onChange={handleChange}
      />,
    );

    await user.type(screen.getByPlaceholderText('氏名を入力'), '山田');

    expect(handleChange).toHaveBeenCalled();
  });
});