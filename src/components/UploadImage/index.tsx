import { useRef, useState } from 'react';

import { Button } from '../Button';
import { UploadImageContainer } from './styles';

export const UploadImage: React.VFC = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputRef = useRef(null);

  function handleFileSelected(event: any) {
    console.log('teste');
    setSelectedFile(event.target.files[0]);
  }

  function handleClickInputUpload() {
    inputRef.current?.click!();
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
