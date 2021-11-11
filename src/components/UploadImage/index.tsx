import { useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';

import { Button } from '../Button';
import { UploadImageContainer, SelectedImage } from './styles';
import { blobToBase64 } from '~/utils/file';

export interface UploadImageProps {
  onChange?: (image?: string) => unknown;
}

export const UploadImage: React.VFC<UploadImageProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageName, setImageName] = useState<string>();
  const [image, setImage] = useState<string>();

  async function handleFileSelected(event: any) {
    const file: File = event.target.files[0];
    const base64Image = await blobToBase64(file);
    setImageName(file.name);
    setImage(base64Image);
    if (onChange) {
      onChange(base64Image);
    }
  }

  function handleClickInputUpload() {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }

  function handleClickRemoveImage() {
    setImage(undefined);
    setImageName(undefined);
    if (onChange) {
      onChange();
    }
  }

  return (
    <UploadImageContainer>
      <span>Inserir imagem</span>
      <input type="file" accept="image/*" onChange={handleFileSelected} ref={inputRef} />
      {!imageName && (
        <Button
          description="Anexar imagem"
          variant="primary"
          onClick={handleClickInputUpload}
          type="button"
        />
      )}
      {imageName && (
        <SelectedImage>
          <img className="image" src={image} />
          <div className="name">{imageName}</div>
          <button className="close" type="button" onClick={handleClickRemoveImage}>
            <FaTimes size={18} />
          </button>
        </SelectedImage>
      )}
    </UploadImageContainer>
  );
};
