import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BusinessCardItem } from './BusinessCardItem';
import type { CardListItem } from '@/features/cards/types/cardTypes';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockCard: CardListItem = {
  id: '1',
  name: '山田太郎',
  frontImageUrl: '/uploads/cards/front.png',
  store: {
    id: '1',
    storeName: '梅田本店',
    prefecture: '大阪府',
    area: '大阪市北区',
  },
  cardUsers: [
    {
      user: {
        id: '1',
        userName: '管理者',
      },
    },
  ],
  cardTags: [
    {
      tag: {
        id: '1',
        tagName: '重要',
      },
    },
  ],
};

describe('BusinessCardItem', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('名刺情報を表示する', () => {
    render(<BusinessCardItem card={mockCard} onDeleteClick={jest.fn()} />);

    expect(screen.getByText('山田太郎')).toBeInTheDocument();
    expect(screen.getByText('梅田本店')).toBeInTheDocument();
    expect(screen.getByText('重要')).toBeInTheDocument();
  });

  it('画像クリックで詳細画面へ遷移する', async () => {
    const user = userEvent.setup();

    render(<BusinessCardItem card={mockCard} onDeleteClick={jest.fn()} />);

    await user.click(screen.getByRole('img', { name: '山田太郎の名刺画像' }));

    expect(mockPush).toHaveBeenCalledWith('/cards/1');
  });

  it('編集ボタンクリックで編集画面へ遷移する', async () => {
    const user = userEvent.setup();

    render(<BusinessCardItem card={mockCard} onDeleteClick={jest.fn()} />);

    await user.click(screen.getByRole('button', { name: '編集' }));

    expect(mockPush).toHaveBeenCalledWith('/cards/1/edit');
  });

  it('削除ボタンクリックでonDeleteClickが呼ばれる', async () => {
    const user = userEvent.setup();
    const onDeleteClick = jest.fn();

    render(<BusinessCardItem card={mockCard} onDeleteClick={onDeleteClick} />);

    await user.click(screen.getByRole('button', { name: '削除' }));

    expect(onDeleteClick).toHaveBeenCalledWith(mockCard);
  });
});