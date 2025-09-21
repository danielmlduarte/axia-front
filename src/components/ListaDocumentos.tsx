import * as React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandIcon from '@mui/icons-material/Expand';
import { Grid } from '@mui/material';
import { useState } from 'react';
import ConceptsModal from './modals/ConceptsModal';

interface ListaProps {
  enviados: DocumentoEnviado[];
  idOwner: string;
  handleRemoveFile: any;
  title: string;
  url?: string;
}

type DocumentoEnviado = {
  id: number;
  nome: string;
  path: string;
  tipo: string;
  data: string;
};

export default function ListaDocumentos(props: ListaProps) {
  const { enviados, idOwner, handleRemoveFile, title, url = "/documentos/" } = props;
  const [abertos, setAbertos] = useState<number[]>([]);
  const [maximizados, setMaximizados] = useState<number[]>([]);
  const [idToDelete, setIdTodelete] = useState<number>()
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const handleConfirm = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}${url}${idOwner}/${idToDelete}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Erro ao buscar documentos');
      handleRemoveFile(idToDelete)
      setModalOpen(false)
    } catch (err) {
      console.error('Erro ao buscar documentos:', err);
    } finally {
    }
  }

  const handleDeleteFile = (id: number) => {
    setIdTodelete(id)
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  const toggleMaximize = (id: number) => {
    setMaximizados((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isPDF = (fileName: string) => fileName.toLowerCase().endsWith('.pdf');
  const isImage = (fileName: string) =>
    /\.(jpg|jpeg|png|gif|bmp|webp)$/i.test(fileName);

  const toggleAccordion = (id: number) => {
    setAbertos((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <Grid item container rowGap={2}>
      { enviados.length === 0 ? (
        <p>Nenhum documento enviado.</p>
      ) : (
        enviados.map((doc) => {
          const url = `${process.env.REACT_APP_API}/${doc.path}`;
          const aberto = abertos.includes(doc.id);
          return (
            <Grid item xs={12} p={0} key={doc.id} style={{ border: '1px solid #ccc', borderRadius: 6, backgroundColor: '#f0f0f0' }} alignContent={"center"}>
              <button
                onClick={() => toggleAccordion(doc.id)}
                style={{
                  width: 'calc(100% - 50px)',
                  textAlign: 'left',
                  padding: '10px',
                  fontWeight: 'bold',
                  background: '#f0f0f0',
                  border: 'none',
                  borderBottom: '1px solid #ccc',
                  cursor: 'pointer',
                }}
              >
                {aberto ? '▼' : '▶'} {doc.nome} - {new Date(doc.data).toLocaleDateString()}
              </button>
              <button
                title='Excluir arquivo permanentemente.'
                onClick={() => handleDeleteFile(doc.id)}
                style={{
                  width: '50px',
                  textAlign: 'center',
                  padding: '10px',
                  fontWeight: 'bold',
                  background: '#f0f0f0',
                  color: 'red',
                  border: 'none',
                  borderBottom: '1px solid #ccc',
                  cursor: 'pointer',
                }}
              >
                <DeleteIcon />
              </button>
              <div>
                {isPDF(doc.path) ? (
                  <div
                    onDoubleClick={() => toggleMaximize(doc.id)}
                    style={{
                      resize: 'vertical',
                      overflow: 'hidden',
                      minHeight: aberto ? '0' : '0',
                      height: aberto ? (maximizados.includes(doc.id) ? '1000px' : '500px') : '0',
                      transition: 'height 1s ease',
                      border: 'none',
                      cursor: 'ns-resize',
                    }}
                  >
                    <iframe
                      src={url}
                      width="100%"
                      height="100%"
                      title={doc.nome}
                      style={{ border: 'none' }}
                    />
                  </div>
                ) : isImage(doc.path) ? (
                  <div
                    style={{
                      resize: 'both',
                      overflow: 'auto',
                      minWidth: '200px',
                      minHeight: '200px',
                      maxHeight: '600px',
                      border: '1px solid #ccc',
                      display: 'inline-block',
                    }}
                  >
                    <img
                      src={url}
                      alt={doc.nome}
                      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </div>
                ) : (
                  <a href={url} target="_blank" rel="noreferrer">Baixar arquivo</a>
                )}
                { aberto && (
                    <div style={{width: '100%', textAlign: 'center', padding: '8px'}}>
                      <button onClick={() => toggleMaximize(doc.id)} style={{width: '100%', border: 'none'}}>
                        
                        <ExpandIcon />
                      </button>
                    </div>
                  )
                }
              </div>
            </Grid>
          );
        })
      )}
      <ConceptsModal 
        open={modalOpen}
        handleConfirm={handleConfirm}
        handleClose={handleCloseModal}
        title='Excluir documento?'
        description={<span>Tem certeza que deseja excluir o documento <strong>permanentemente?</strong> <br/> Ao confirmar, <strong>não</strong> será mais possível <strong>recuperar</strong> o arquivo.</span>}
      />
    </Grid>
  )
}