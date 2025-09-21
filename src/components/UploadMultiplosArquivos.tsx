import React, { useState, useEffect, useCallback } from 'react';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ListaDocumentos from './ListaDocumentos';
import { Box, Button, Grid } from '@mui/material';
import Tabs from './Tabs';
import UploadArea from './UploadArea';
import Notification from './Notification';
import DeleteIcon from '@mui/icons-material/Delete';
import SelectCustom from './SelectCustom';

type DocumentoEnviado = {
  id: number;
  nome: string;
  path: string;
  tipo: string;
  data: string;
};

interface Props {
  idFuncionario?: string;
}

export default function UploadMultiplosDocumentos({ idFuncionario }: Props) {
  const [arquivos, setArquivos] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [enviados, setEnviados] = useState<DocumentoEnviado[]>([]);
  const [nomesCustomizados, setNomesCustomizados] = useState<{ [index: number]: string }>({});
  const [editandoIndex, setEditandoIndex] = useState<number | null>(null);
  const [tipos, setTipos] = useState<string[]>([]);
  const [tipoGlobal, setTipoGlobal] = useState('');
  const [selectedTab, setSelectedTab] = useState<string>("personal");
  const [stateNotification, setStateNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("Teste");

  const handleClose = () => {
    setStateNotification(!stateNotification);
  };

  const handleChangeTab = (event: React.SyntheticEvent, value: string) => {
    setSelectedTab(value);
  };

  const handleTipoGlobalChange = (novoTipo: any) => {
    setTipoGlobal(novoTipo);
    setTipos(arquivos.map(() => novoTipo));
  };

  const handleTipoChange = (index: number, tipo: string) => {
    setTipos((prev) => {
      const atualizados = [...prev];
      atualizados[index] = tipo;
      return atualizados;
    });
  };

  const toggleEdicao = (index: number | null) => {
    setEditandoIndex(index);
  };
  
  const handleNomeChange = (index: number, novoNome: string) => {
    setNomesCustomizados((prev) => ({ ...prev, [index]: novoNome }));
  };

  const fetchDocumentos = useCallback(async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/documentos/funcionario/${idFuncionario}`);
      if (!res.ok) throw new Error('Erro ao buscar documentos');
      const data = await res.json();
      setEnviados(data);
    } catch (err) {
      console.error('Erro ao buscar documentos:', err);
    } finally {
    }
  },[idFuncionario]);

  useEffect(() => {
    if (!idFuncionario) return;


    fetchDocumentos();
  }, [idFuncionario]);

  const handleAddFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const novos = e.target.files ? Array.from(e.target.files) : [];
    setArquivos((prev) => [...prev, ...novos]);
  };

  const handleRemoveFile = (idDelete: number) => {
    setEnviados((prev) => prev.filter((arquivo: DocumentoEnviado) => arquivo.id !== idDelete));
  };

  const handleUpload = async () => {
    if (arquivos.length === 0) return;
    if (tipos.length < arquivos.length) {
      setNotificationMessage("É necessário definir o tipo de documento de todos os arquivos carregados")
      setStateNotification(true)
      return;
    }
    if (tipos.some((tipo) => tipo.length === 0)) {
      setNotificationMessage("É necessário definir o tipo de documento de todos os arquivos carregados")
      setStateNotification(true)
      return;
    }
  
    const formData = new FormData();
  
    arquivos.forEach((file, index) => {
      formData.append('documentos', file);
  
      const nomeCustomizado = nomesCustomizados[index] || file.name;
      formData.append('nomes', nomeCustomizado);
      formData.append('tipos', tipos[index] || '');
    });
  
    setUploading(true);
  
    try {
      const res = await fetch(`${process.env.REACT_APP_API}/documentos/funcionario/${idFuncionario}`, {
        method: 'POST',
        body: formData,
      });
  
      if (!res.ok) throw new Error('Erro no upload');
      const data = await res.json();
  
      alert('Upload realizado com sucesso!');
      setArquivos([]);
      fetchDocumentos();
      console.log(data);
    } catch (error) {
      console.error(error);
      alert('Falha no upload.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{width: "100%"}}>
      <Grid container justifyContent={"space-between"} mt={3} border={"1px solid #ccc"} borderRadius={2} sx={{backgroundColor: "#fff"}}>
        <Grid item xs={2} borderRadius={"8px 0 0 8px"} p={2} sx={{backgroundColor: "#f7f7f7"}}>
          <Tabs
            handleChange={handleChangeTab}
            vertical={true}
            value={selectedTab}
            labels={[
              { label: "Documentos Pessoais", name: "personal" },
              { label: "Documentos Admissionais", name: "hired" },
              { label: "Documentos Demissionais", name: "fired" },
              { label: "Atestados", name: "medical" },
              { label: "Advertências", name: "warning" },
              { label: "Outros Documentos", name: "others" },
              { label: "ENVIAR DOCUMENTOS", name: "upload", color: "red", bold: true, icon: <FileUploadIcon />}
            ]}
          />
        </Grid>
        <Grid item xs p={2}>
          <Box sx={{ width: "100%", backgroundColor: "#fff", border: "none"}}>
            { idFuncionario &&
              <div>
                {
                  selectedTab === "personal" &&
                  <ListaDocumentos enviados={enviados.filter((doc) => doc.tipo == '0')} idOwner={idFuncionario} url={"/documentos/funcionario/"} handleRemoveFile={handleRemoveFile} title='Documentos Pessoais'/>
                }
                {
                  selectedTab === "hired" &&
                  <ListaDocumentos enviados={enviados.filter((doc) => doc.tipo == '1')} idOwner={idFuncionario} url={"/documentos/funcionario/"} handleRemoveFile={handleRemoveFile} title='Documentos Admissionais'/>
                }
                {
                  selectedTab === "fired" &&
                  <ListaDocumentos enviados={enviados.filter((doc) => doc.tipo == '2')} idOwner={idFuncionario} url={"/documentos/funcionario/"} handleRemoveFile={handleRemoveFile} title='Documentos Demissionais'/>
                }
                {
                  selectedTab === "medical" &&
                  <ListaDocumentos enviados={enviados.filter((doc) => doc.tipo == '3')} idOwner={idFuncionario} url={"/documentos/funcionario/"} handleRemoveFile={handleRemoveFile} title='Atestados'/>
                }
                {
                  selectedTab === "warning" &&
                  <ListaDocumentos enviados={enviados.filter((doc) => doc.tipo == '4')} idOwner={idFuncionario} url={"/documentos/funcionario/"} handleRemoveFile={handleRemoveFile} title='Advertências'/>
                }
                {
                  selectedTab === "others" &&
                  <ListaDocumentos enviados={enviados.filter((doc) => doc.tipo == '5')} idOwner={idFuncionario} url={"/documentos/funcionario/"} handleRemoveFile={handleRemoveFile} title='Outros Documentos'/>
                }
              </div>
            }
            {
              selectedTab === "upload" &&
              (
                <div style={{padding: 16 }}>
                  <div style={{ display: 'block', alignItems: 'center', gap: 16, marginBottom: 16}}>

                    <UploadArea handleAddFiles={handleAddFiles}/>

                    <Button sx={{marginRight: "16px"}} className="btn-primario" variant="contained" onClick={handleUpload} disabled={uploading || arquivos.length === 0}>
                      {uploading ? 'Enviando...' : 'Salvar documentos carregados'}
                    </Button>
                    <Button sx={{marginRight: "16px"}} className="btn-secundario" variant="contained" onClick={() => setArquivos([])} disabled={uploading || arquivos.length === 0}>
                      Limpar lista
                    </Button>
                    <div style={{marginTop: "16px"}}>
                      <SelectCustom
                        placeholder={'Escolher o tipo do documento para todos arquivos carregados'}
                        items={[{value: 'Pessoal', valueKey: "0"},{value: 'Admissional', valueKey: "1"},{value: 'Demissional', valueKey: "2"},{value: 'Atestado', valueKey: "3"},{value: 'Advertência', valueKey: "4"},{value: 'Outro', valueKey: "5"}]}
                        selectedItem={tipoGlobal}
                        handleChange={(e:any) => handleTipoGlobalChange(e.target.value)}
                        name={''}                          
                      />
                    </div>

                  </div>

                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {arquivos.map((file, i) => (
                      <li
                        key={i}
                        style={{
                          marginBottom: 12,
                          padding: 12,
                          border: '1px solid #ccc',
                          borderRadius: 8,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 8,
                        }}
                      >
                        {editandoIndex === i ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <input
                              type="text"
                              value={nomesCustomizados[i] || file.name}
                              onChange={(e) => handleNomeChange(i, e.target.value)}
                              style={{ flex: 1, padding: '4px 8px' }}
                            />
                            <Button className="btn-primario" variant="contained" onClick={() => toggleEdicao(null)}>Salvar</Button>
                            <Button className="btn-secundario" variant="outlined" onClick={() => setEditandoIndex(null)}>Cancelar</Button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ flex: 1 }}>
                              {nomesCustomizados[i] || file.name} ({(file.size / 1024).toFixed(1)} KB)
                            </span>
                            <Button className="btn-primario" variant="contained" onClick={() => toggleEdicao(i)}>Renomear</Button>
                            <Button className="btn-secundario" variant="outlined" onClick={() => handleRemoveFile(i)}><DeleteIcon /></Button>
                          </div>
                        )}
                        <SelectCustom
                          placeholder={'Selecione o tipo do documento'}
                          items={[{value: 'Pessoal', valueKey: "0"},{value: 'Admissional', valueKey: "1"},{value: 'Demissional', valueKey: "2"},{value: 'Atestado', valueKey: "3"},{value: 'Advertência', valueKey: "4"},{value: 'Outro', valueKey: "5"}]}
                          selectedItem={tipos[i] || ''}
                          handleChange={(e:any) => handleTipoChange(i, e.target.value)}
                          name={''}                          
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )
            }
          </Box>
        <Notification message={notificationMessage} open={stateNotification} handleClose={handleClose}/>
        </Grid>
      </Grid>
    </div>
  );
}
