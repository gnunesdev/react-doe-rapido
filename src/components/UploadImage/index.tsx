import { useRef, useState } from 'react';

import { Button } from '../Button';
import { UploadImageContainer } from './styles';

export const UploadImage: React.VFC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  function handleFileSelected(event: any) {
    setSelectedFile(event.target.files[0]);
  }

  function handleClickInputUpload() {
    if (inputRef.current) {
      (inputRef.current as any).click();
    }
  }

  return (
    <UploadImageContainer>
      <span>Inserir imagem</span>
      <input
        type="file"
        id="img"
        name="img"
        accept="image/*"
        onChange={() => handleFileSelected}
        ref={inputRef}
      />
      <Button
        description="Anexar imagem"
        variant="primary"
        onClick={handleClickInputUpload}
      />
    </UploadImageContainer>
  );
};
