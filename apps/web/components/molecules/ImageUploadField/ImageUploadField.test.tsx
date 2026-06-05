import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageUploadField } from './ImageUploadField';

const mockUploadCardImage = jest.fn();
const mockShowToast = jest.fn();

jest.mock('@/features/uploads/api/uploadsApi', () => ({
  uploadCardImage: (file: File) => mockUploadCardImage(file),
}));

jest.mock('@/components/organisms/ToastProvider/ToastProvider', () => ({
  useToast: () => ({
    showToast: mockShowToast,
  }),
}));

describe('ImageUploadField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('画像未選択の場合、画像未選択を表示する', () => {
    render(
      <ImageUploadField
        label="名刺画像（表）"
        imageUrl=""
        onUploaded={jest.fn()}
      />,
    );

    expect(screen.getByText('画像未選択')).toBeInTheDocument();
  });

  it('画像URLがある場合、プレビュー画像を表示する', () => {
    render(
      <ImageUploadField
        label="名刺画像（表）"
        imageUrl="/uploads/cards/test.png"
        onUploaded={jest.fn()}
      />,
    );

    expect(screen.getByRole('img', { name: '名刺画像（表）' })).toHaveAttribute(
      'src',
      'http://localhost:3000/uploads/cards/test.png',
    );
  });

  it('ファイル選択時にアップロードしてonUploadedを呼ぶ', async () => {
    const user = userEvent.setup();
    const onUploaded = jest.fn();

    mockUploadCardImage.mockResolvedValue({
      imageUrl: '/uploads/cards/uploaded.png',
    });

    render(
      <ImageUploadField
        label="名刺画像（表）"
        imageUrl=""
        onUploaded={onUploaded}
      />,
    );

    const file = new File(['dummy'], 'card.png', {
      type: 'image/png',
    });

    const input = screen.getByLabelText('画像を選択');

    await user.upload(input, file);

    await waitFor(() => {
      expect(mockUploadCardImage).toHaveBeenCalledWith(file);
      expect(onUploaded).toHaveBeenCalledWith('/uploads/cards/uploaded.png');
      expect(mockShowToast).toHaveBeenCalledWith(
        '名刺画像（表）をアップロードしました',
        'success',
      );
    });
  });

  it('アップロード失敗時にエラートーストを表示する', async () => {
    const user = userEvent.setup();

    mockUploadCardImage.mockRejectedValue(new Error('upload error'));

    render(
      <ImageUploadField
        label="名刺画像（表）"
        imageUrl=""
        onUploaded={jest.fn()}
      />,
    );

    const file = new File(['dummy'], 'card.png', {
      type: 'image/png',
    });

    const input = screen.getByLabelText('画像を選択');

    await user.upload(input, file);

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalledWith(
        '名刺画像（表）のアップロードに失敗しました',
        'error',
      );
    });
  });
});