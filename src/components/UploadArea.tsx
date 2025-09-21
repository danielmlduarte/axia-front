import { Grid } from '@mui/material';
import React, { useRef, useState } from 'react';

export default function UploadArea({ handleAddFiles }:{handleAddFiles: any}) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      handleAddFiles({ target: { files } });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <Grid container item xs={12}>
      <Grid item xs={12} mb={2}>
        <span>Enviar documentos:</span>
        <br/>
        <span>Use esta sessão para enviar os documentos deste funcionário</span>
      </Grid>
      <Grid item xs={12}>
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            border: '2px dashed #888',
            borderRadius: 8,
            padding: '30px',
            textAlign: 'center',
            backgroundColor: dragOver ? '#f0f0f0' : '#fff',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            marginBottom: 16,
          }}
        >
          <p style={{ margin: 0 }}>
            Arraste os arquivos aqui ou <strong>clique para selecionar</strong>
          </p>
          <input
            type="file"
            multiple
            onChange={handleAddFiles}
            accept="image/*,application/pdf"
            ref={inputRef}
            style={{ display: 'none' }}
          />
        </div>
      </Grid>
    </Grid>
  );
}
