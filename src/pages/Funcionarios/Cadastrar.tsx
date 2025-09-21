import React, { useEffect, useState, useCallback } from 'react';
import { Box, Button, Fade, Grid, Modal, Switch, Tooltip } from '@mui/material';
import { useNavigate, useSearchParams, useParams, useLocation } from 'react-router-dom';
import Loading from '../../components/Loading';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InputCustom from '../../components/InputCustom';
import dayjs from 'dayjs';
import Tabs from '../../components/Tabs';
import FotoPerfil from '../../components/FotoPerfil';
import MultilineTextFields from '../../components/MultilineTextFields';
import RadioCustom from '../../components/RadioCustom';
import { getFuncionario, postFotoFuncionario, postFuncionario, putFuncionario } from '../../apis/apiFuncionarios';
import DatePickerCustom from '../../components/DatePickerCustom';
import Notification from '../../components/Notification';
import UploadMultiplosArquivos from '../../components/UploadMultiplosArquivos';
import SelectCustom from '../../components/SelectCustom';
import { getCargos, postCargo } from '../../apis/apiCargos';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { buscaCep } from '../../apis/apiUteis';
import { motion, AnimatePresence } from "framer-motion";
import { getCbos } from '../../apis/apiCbos';


const initialPersonalData = {
  nome: "",
  foto: "",
  nascimento: dayjs('2000-04-17'),
  genero: "",
  cpf: "",
  rg: "",
  estadoCivil: 0,
  dependentes: "S",
  qtdDependentes: "",
  obs: "",
  ativo: true,
  treinamento: true
}

const initialProfessionalData = {
  cargo: 0,
  departamento: "",
  departamentoId: 0,
  admissao: dayjs('2000-04-17'),
  salario: ""
}

const initialAddressData = {
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  cidade: "",
  uf: "",
  cep: ""
}

const initialContact = {
  whatsapp: "",
  celular: "",
  email: "",
  outro: ""
}


function NovoProtocolo() {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams] = useSearchParams();
  const [hasModified, setHasModified] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("personal");
  const [personalFoto, setPersonalFoto] = useState<FormData>(new FormData());
  const [avatarSrc, setAvatarSrc] = React.useState<string | undefined>(undefined);
  const [stateNotification, setStateNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [cargos, setCargos] = useState<Cargo[]>([])
  const [openCargoModal, setOpenCargoModal] = useState<boolean>(false);
  const [newCargoData, setNewCargoData] = useState<any>({
    descricao_cargo: "",
    departamento_id: "",
    salario_base: "",
    jornada_semanal: "",
    cbo_id: ""
  });
  const [cbos, setCBOs] = useState<any[]>([]);

  // Estados separados por sessão
  const [personalData, setPersonalData] = useState<any>(initialPersonalData);

  const [professionalData, setProfessionalData] = useState<any>(initialProfessionalData);

  const [addressData, setAddressData] = useState<any>(initialAddressData);

  const [contactData, setContactData] = useState<any>(initialContact);

  const [documentsData, setDocumentsData] = useState<any[]>([]);

  const isEditar = location.pathname.includes('/cadastrar/funcionario/editar');
  const isNovo = (location.pathname.includes('/cadastrar/funcionario') && !location.pathname.includes('editar'));
  const isVisualizar = location.pathname.includes('/visualizar');

  const handleClose = () => {
    setStateNotification(!stateNotification);
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setAvatarSrc(reader.result as string);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append('foto', file);

    setPersonalFoto(formData);
  };

  // Handlers
  const handlePersonalInputsChange = (event: any) => {
    const { name, value } = event.target;
    setPersonalData((prev: any) => ({ ...prev, [name]: value }));
    setHasModified(true);
  };

  const handleProfessionalInputsChange = (event: any) => {
    const { name, value } = event.target;
    setProfessionalData((prev: any) => ({ ...prev, [name]: value }));
    if (name === "cargo") {
      console.log(cargos, value, cargos.find((cargo: Cargo) => cargo.id_cargo === parseInt(value)))
      setProfessionalData((prev: any) => (
        { ...prev,
          departamento:  cargos.find((cargo: Cargo) => cargo.id_cargo === parseInt(value))!.nome_departamento,
          departamentoId: cargos.find((cargo: Cargo) => cargo.id_cargo === parseInt(value))!.departamento_id
        }));
    }
    setHasModified(true);
  };

  const handleAddressInputsChange = (event: any) => {
    const { name, value } = event.target;
    setAddressData((prev: any) => ({ ...prev, [name]: value }));
    setHasModified(true);
    if (name === "cep" && value.length > 7) {
      handleEndereco(value)
    }
  };

  const handleContactInputsChange = (event: any) => {
    const { name, value } = event.target;
    setContactData((prev: any) => ({ ...prev, [name]: value }));
    setHasModified(true);
  };

  const handleDocumentsChange = (files: any[]) => {
    setDocumentsData(files);
    setHasModified(true);
  };

  const handlePersonalSwitchChange = () => {
    setPersonalData((prev: any) => ({ ...prev, ativo: !prev.ativo }));
    setHasModified(true);
  };

  const datePickerHandleChangeSingle = (date: Date) => {
    setPersonalData((prev: any) => ({ ...prev, nascimento: date }));
    setHasModified(true);
  };

  const handleChangeTab = (event: React.SyntheticEvent, value: string) => {
    setSelectedTab(value);
  };

  const handleOpenCargoModal = () => {
    handleGetCBOs()
    setOpenCargoModal(true);
  }

  const handleCloseCargoModal = () => {
    setOpenCargoModal(false);
    setNewCargoData({
      descricao_cargo: "",
      departamento_id: "",
      salario_base: "",
      jornada_semanal: "",
    });
  };

  const handleGetCBOs = useCallback(async () => {
    setLoading(true);
    const result = await getCbos();
    setCBOs(result.data);
    console.log(result.data)
    setLoading(false);
  }, []);

  const handleNewCargoChange = (event: any) => {
    const { name, value } = event.target;
    setNewCargoData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSaveNewCargo = async () => {
    try {
      setLoading(true);
      const result = await postCargo(newCargoData); // API para criar cargo
      if (result.status === 201) {
        setNotificationMessage("Cargo cadastrado com sucesso!");
        setStateNotification(true);
        handleCloseCargoModal();
        handleGetCargos(); // Atualiza lista de cargos
      }
    } catch (error) {
      setNotificationMessage("Erro ao cadastrar cargo!");
      setStateNotification(true);
    } finally {
      setLoading(false);
    }
  };

  // Salvar unindo todos os states
  const handleSalvar = useCallback(async () => {
    setLoading(true);
    const payload = {
      ...personalData,
      ...professionalData,
      ...addressData,
      ...contactData
    };

    let result;
    if (isEditar && id) {
      console.log(payload)
      result = await putFuncionario(payload, id);

      if (result.status == 201) {
        setNotificationMessage("Dados alterados com sucesso!");
        setStateNotification(true);
        if (!avatarSrc?.includes("http")) {
          const resultFoto = await postFotoFuncionario(personalFoto, id);
          if (resultFoto?.status == 201) setAvatarSrc(`${process.env.REACT_APP_API}/${resultFoto.data.path}`);
        }
      }
    } else if (isNovo) {
      result = await postFuncionario(payload);
      if (result.status == 201) {
        if (avatarSrc?.length) {
          const resultFoto = await postFotoFuncionario(personalFoto, result.data.id);
          if (resultFoto?.status == 201) setAvatarSrc(`${process.env.REACT_APP_API}/${resultFoto.data.path}`);
        }
        setNotificationMessage("Dados salvos com sucesso!");
        setStateNotification(true);
        navigate(`/cadastrar/funcionario/editar/${result.data.id}`)
      }
    }
    setLoading(false);
  }, [personalData, professionalData, addressData, contactData, documentsData, personalFoto, avatarSrc]);

  const handleGetFuncionario = useCallback(async () => {
    setLoading(true);
    if (id) {
      const result = await getFuncionario(id);
      if (result.status == 200) {
        console.log(result)
        const data = result.data;
        setPersonalData({
          nome: data.nome,
          foto: data.foto,
          nascimento: data.nascimento,
          genero: data.genero,
          cpf: data.cpf,
          rg: data.rg,
          estadoCivil: data.estado_civil,
          dependentes: data.dependentes,
          qtdDependentes: data.qtd_dependentes,
          obs: data.obs,
          ativo: data.ativo,
          treinamento: data.treinamento
        });
        setProfessionalData({
          cargo: data.cargo_id || "",
          departamento: data.nome_departamento,
          departamentoId: data.departamento_id,
          admissao: data.admissao,
          salario: data.salario
        });
        setAddressData({
          logradouro: data.logradouro,
          numero: data.numero,
          complemento: data.complemento,
          bairro: data.bairro,
          cidade: data.cidade,
          uf: data.uf,
          cep: data.cep
        });
        setContactData({
          whatsapp: data.whatsapp,
          celular: data.celular,
          email: data.email,
          outro: data.outro
        });
        if (data.foto) {
          setAvatarSrc(`${process.env.REACT_APP_API}/${data.foto}`);
        }
      }
    }
    setLoading(false);
  }, [id]);

  const handleClearAllFields = () => {
    setPersonalData(initialPersonalData)
    setAddressData(initialAddressData)
    setContactData(initialContact)
    setProfessionalData(initialProfessionalData)
    setDocumentsData([])
    setAvatarSrc("")
  }

  const handleGetCargos = useCallback(async () => {
    setLoading(true);
      const result = await getCargos();
      console.log(result)
      setCargos(result.data)
    setLoading(false);
  }, []);

  const handleEndereco= useCallback(async (cep: string) => {
    const result = await buscaCep(cep);
    setAddressData((prev: any) => (
      { 
        ...prev, 
        logradouro: result.logradouro,
        bairro: result.bairro,
        cidade: result.localidade,
        uf: result.uf
      }
    ));    
  }, []);

  useEffect(() => {
    handleGetCargos()
    if (!isNovo) {
      handleGetFuncionario();
    }
  }, [searchParams]);

  useEffect(() => {
    if (location.pathname.includes('/cadastrar/funcionario') && !location.pathname.includes('editar')) {
      handleClearAllFields()
    }
  }, [location])

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <div className="page-body">
          <span className="page-title">
            {`Cadastros de Funcionários > ${id ? (location.pathname.includes("editar") ? 'Editar Funcionário' : 'Visualizar Funcionário') : 'Novo Funcionário'} `}
          </span>
          { loading === false ?
            <Grid container rowSpacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Grid container padding="22px" pr={0} mb={1}>
                  <Grid item  container xs={8} textAlign={"start"} alignItems={"center"}>
                    <AnimatePresence>
                      {selectedTab !== "personal" && (
                        <motion.div
                          key="avatar-preview"
                          initial={{ opacity: 0, x: -15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.4 }}
                          style={{ marginRight: "16px" }}
                        >
                          <FotoPerfil
                            handleAvatarChange={handleAvatarChange}
                            avatarSrc={avatarSrc}
                            readonly={true}
                            size={80}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <span className="page-title">{personalData.nome}</span>
                  </Grid>
                  <Grid item xs={4} textAlign={"end"}>
                    <Button onClick={() => navigate('/gerenciar/funcionarios')} className="btn-secundario btn-voltar" variant="contained"><ArrowBackIcon />Voltar</Button>
                    { !isVisualizar &&
                      <Button onClick={() => handleSalvar()} className="btn-primario" variant="contained">Salvar</Button>
                    }
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Tabs
                    handleChange={handleChangeTab}
                    value={selectedTab}
                    labels={[
                      { label: "Dados Pessoais", name: "personal" },
                      { label: "Dados Profissionais", name: "profissional" },
                      { label: "Endereço", name: "address" },
                      { label: "Contatos", name: "contact" },
                      { label: "Documentos", name: "documents" }
                    ]}
                  />
                </Grid>
                <Box sx={{ width: "100%", backgroundColor: "#f7f7f7", border: "1px solid #f7f7f7", borderRadius: "3px"}}>
                    {selectedTab === "personal" && (
                <AnimatePresence>
                      <motion.div
                        key="tab-preview"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                      >
                    <Grid container padding="22px" mt={4}>
                      <Grid item container xs={3}>
                        <FotoPerfil handleAvatarChange={handleAvatarChange} avatarSrc={avatarSrc}/>
                      </Grid>
                      <Grid item container xs={9} rowSpacing={2} columnSpacing={2}>
                        <Grid item xs={8}>
                          <span className="input-label">Nome do funcionário:</span>
                          <InputCustom placeholder={''} controlledValue={personalData.nome} name="nome" handleChange={handlePersonalInputsChange} isValid={true} readOnly={false} />
                        </Grid>
                        <Grid item xs={4}>
                          <span className="input-label">Data de nascimento:</span>
                          <DatePickerCustom placeholder='dd/mm/aaaa' handleChange={datePickerHandleChangeSingle} controlledValue={personalData.nascimento} name="nascimento" isValid={true} readOnly={false} />
                        </Grid>
                        <Grid item xs={4}>
                          <span className="input-label">CPF:</span>
                          <InputCustom placeholder={''} controlledValue={personalData.cpf} name="cpf" handleChange={handlePersonalInputsChange} isValid={true} readOnly={false} />
                        </Grid>
                        <Grid item xs={4}>
                          <span className="input-label">RG:</span>
                          <InputCustom placeholder={''} controlledValue={personalData.rg} name="rg" handleChange={handlePersonalInputsChange} isValid={true} readOnly={false} />
                        </Grid>
                        <Grid item xs={4}>
                          <span className="input-label">Gênero:</span>
                          <RadioCustom placeholder={''} items={[{ value: "Feminino", valueKey: "F" }, { value: "Masculino", valueKey: "M" }]} selectedItem={personalData.genero} name="genero" handleChange={handlePersonalInputsChange} />
                        </Grid>
                        <Grid item xs={4}>
                          <span className="input-label">Estado civil:</span>
                          {/* <InputCustom placeholder={''} controlledValue={personalData.estadoCivil} name="estadoCivil" handleChange={handlePersonalInputsChange} isValid={true} readOnly={false} /> */}
                          <SelectCustom
                          placeholder={'Selecione o estado civil do funcionário'}
                          items={[{value: 'Solteiro', valueKey: "0"},{value: 'Casado', valueKey: "1"},{value: 'Divorciado', valueKey: "2"},{value: 'Viúvo', valueKey: "3"},{value: 'Separado Judicialmente', valueKey: "4"}]}
                          selectedItem={personalData.estadoCivil}
                          handleChange={handlePersonalInputsChange}
                          name={'estadoCivil'}                          
                        />
                        </Grid>
                        <Grid item xs={4}>
                          <span className="input-label">Possui dependentes?</span>
                          <RadioCustom placeholder={''} items={[{ value: "Sim", valueKey: "S" }, { value: "Não", valueKey: "N" }]} selectedItem={personalData.dependentes} name="dependentes" handleChange={handlePersonalInputsChange} />
                        </Grid>
                        <Grid item xs={4} display={`${personalData.dependentes === 'N' && 'none'}`}>
                          <span className="input-label">Total de dependentes:</span>
                          <InputCustom placeholder={''} controlledValue={personalData.qtdDependentes} name="qtdDependentes" handleChange={handlePersonalInputsChange} isValid={true} readOnly={false} />
                        </Grid>
                        <Grid item xs={12}>
                          <span className="input-label">Observações:</span>
                          <MultilineTextFields controlledValue={personalData.obs} name="obs" handleChange={handlePersonalInputsChange} width="100%" maxRows={10} />
                        </Grid>
                      </Grid>
                      <Grid item xs={12} mt={1}>
                        <Switch className="switch-protocolo" checked={personalData.ativo} onChange={handlePersonalSwitchChange} name="ativo" />
                        <span className="input-label">Ativar / Inativar Funcionário</span>
                      </Grid>
                    </Grid>
                    </motion.div>
                  </AnimatePresence>
                    )}
                    {selectedTab === "profissional" && (
                  <AnimatePresence>
                      <motion.div
                        key="tab-preview"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                      >
                    <Grid container padding="22px" rowSpacing={2} columnSpacing={2}>
                      <Grid item xs={4} container>
                        <Grid item xs={11} >
                          <span className="input-label">Cargo:</span>
                          {/* <InputCustom placeholder={''} controlledValue={professionalData.cargo} name="cargo" handleChange={handleProfessionalInputsChange} isValid={true} readOnly={false} /> */}
                          <SelectCustom
                            placeholder={'Selecione o cargo do funcionário'}
                            items={cargos.map((value: any) => ({ value: value.nome_profissao, valueKey: value.id_cargo.toString() }))}
                            selectedItem={professionalData.cargo}
                            handleChange={handleProfessionalInputsChange}
                            name={'cargo'}                          
                          />
                        </Grid>
                        <Grid item xs={1} sx={{alignSelf: "end !important"}} pb={"5px"} pl={1}>
                          <Tooltip title="Adicionar novo cargo">
                            <AddCircleIcon className='pointer' onClick={handleOpenCargoModal} />
                          </Tooltip>
                        </Grid>
                      </Grid>
                      <Grid item xs={4}>
                        <span className="input-label">Departamento:</span>
                        <InputCustom placeholder={''} controlledValue={professionalData.departamento} name="departamento" handleChange={handleProfessionalInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                      <Grid item xs={4}>
                        <span className="input-label">Data de Admissão:</span>
                        <DatePickerCustom placeholder='dd/mm/aaaa' handleChange={(date: Date) => setProfessionalData((prev: any) => ({ ...prev, admissao: date }))} controlledValue={professionalData.admissao} name="admissao" isValid={true} readOnly={false} />
                      </Grid>
                      <Grid item xs={6}>
                        <span className="input-label">Salário:</span>
                        <InputCustom placeholder={''} controlledValue={professionalData.salario} name="salario" handleChange={handleProfessionalInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                    </Grid>
                    </motion.div>
                  </AnimatePresence>
                    )}

                    {selectedTab === "address" && (
                  <AnimatePresence>
                      <motion.div
                        key="tab-preview"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                      >
                    <Grid container padding="22px" rowSpacing={2} columnSpacing={2}>
                      <Grid item xs={2}>
                        <span className="input-label">CEP:</span>
                        <InputCustom placeholder={''} controlledValue={addressData.cep} name="cep" handleChange={handleAddressInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                      <Grid item xs={5}>
                        <span className="input-label">Logradouro:</span>
                        <InputCustom placeholder={''} controlledValue={addressData.logradouro} name="logradouro" handleChange={handleAddressInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                      <Grid item xs={2}>
                        <span className="input-label">Número:</span>
                        <InputCustom placeholder={''} controlledValue={addressData.numero} name="numero" handleChange={handleAddressInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                      <Grid item xs={2}>
                        <span className="input-label">Complemento:</span>
                        <InputCustom placeholder={''} controlledValue={addressData.complemento} name="complemento" handleChange={handleAddressInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                      <Grid item xs={4}>
                        <span className="input-label">Bairro:</span>
                        <InputCustom placeholder={''} controlledValue={addressData.bairro} name="bairro" handleChange={handleAddressInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                      <Grid item xs={4}>
                        <span className="input-label">Cidade:</span>
                        <InputCustom placeholder={''} controlledValue={addressData.cidade} name="cidade" handleChange={handleAddressInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                      <Grid item xs={2}>
                        <span className="input-label">UF:</span>
                        <InputCustom placeholder={''} controlledValue={addressData.uf} name="uf" handleChange={handleAddressInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                    </Grid>
                    </motion.div>
                  </AnimatePresence>
                    )}
                  {selectedTab === "contact" && (
                    <AnimatePresence>
                    
                      <motion.div
                        key="tab-preview"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                      >
                    <Grid container padding="22px" rowSpacing={2} columnSpacing={2}>
                      <Grid item xs={6}>
                        <span className="input-label">Celular:</span>
                        <InputCustom placeholder={''} controlledValue={contactData.celular} name="celular" handleChange={handleContactInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                      <Grid item xs={6}>
                        <span className="input-label">WhatsApp:</span>
                        <InputCustom placeholder={''} controlledValue={contactData.whatsapp} name="whatsapp" handleChange={handleContactInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                      <Grid item xs={12}>
                        <span className="input-label">E-mail:</span>
                        <InputCustom placeholder={''} controlledValue={contactData.email} name="email" handleChange={handleContactInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                      <Grid item xs={12}>
                        <span className="input-label">Outro:</span>
                        <InputCustom placeholder={''} controlledValue={contactData.outro} name="outro" handleChange={handleContactInputsChange} isValid={true} readOnly={false} />
                      </Grid>
                    </Grid>
                    </motion.div>
                  </AnimatePresence>
                    )}

                    {selectedTab === "documents" && (
                  <AnimatePresence>
                      <motion.div
                        key="tab-preview"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                      >
                    { id ?
                      <Grid container padding="22px" rowGap={2}>
                        {
                          <UploadMultiplosArquivos idFuncionario={id}/>
                        }
                      </Grid>
                      :
                      <Grid container padding="22px" mt={12} mb={12} rowGap={2} textAlign={"center"} justifyContent={"center"}>
                        <span>É necessário realizar um pré-cadastro do funcionário para habilitar a funcionalidade de enviar documentos</span>
                      </Grid>
                    }
                    </motion.div>
                  </AnimatePresence>
                    )}
                </Box>
              </Grid>
              <Notification message={notificationMessage} open={stateNotification} handleClose={handleClose}/>
            </Grid>
            :
            <Loading setHeight="85vh"/>
          }
        </div>
      </Grid>
      <Modal
        open={openCargoModal}
        onClose={handleCloseCargoModal}
        closeAfterTransition
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={openCargoModal}>
          <Box sx={{
            position: 'absolute' as 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            borderRadius: 2
          }}>
            <h2>Cadastrar Novo Cargo</h2>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <span className="input-label">Descrição do Cargo:</span>
                <InputCustom
                  placeholder="Digite o nome do cargo"
                  controlledValue={newCargoData.descricao_cargo}
                  name="descricao_cargo"
                  handleChange={handleNewCargoChange}
                />
              </Grid>
              <Grid item xs={6}>
                <span className="input-label">Departamento:</span>
                <InputCustom
                  placeholder="Digite o ID do departamento"
                  controlledValue={newCargoData.departamento_id}
                  name="departamento_id"
                  handleChange={handleNewCargoChange}
                />
              </Grid>
              <Grid item xs={6}>
                <span className="input-label">Salário Base:</span>
                <InputCustom
                  placeholder="Digite o salário base"
                  controlledValue={newCargoData.salario_base}
                  name="salario_base"
                  handleChange={handleNewCargoChange}
                />
              </Grid>
              <Grid item xs={6}>
                <span className="input-label">Jornada Semanal:</span>
                <InputCustom
                  placeholder="Digite a jornada semanal"
                  controlledValue={newCargoData.jornada_semanal}
                  name="jornada_semanal"
                  handleChange={handleNewCargoChange}
                />
              </Grid>
              <Grid item xs={6}>
                <span className="input-label">CBO:</span>
                <SelectCustom
                  placeholder="Selecione o CBO"
                  items={cbos.map(cbo => ({
                    value: `${cbo.cbo} - ${cbo.nome_profissao}`,
                    valueKey: cbo.id_cbo.toString()
                  }))}
                  selectedItem={newCargoData.cbo_id}
                  handleChange={(e: any) => setNewCargoData((prev: any) => ({ ...prev, cbo_id: e.target.value }))}
                  name="cbo_id"
                />
              </Grid>
              <Grid item xs={12} textAlign="right">
                <Button onClick={handleCloseCargoModal} variant="outlined" sx={{ mr: 1 }}>Cancelar</Button>
                <Button onClick={handleSaveNewCargo} variant="contained">Salvar Cargo</Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </Grid>
  );
}

export default NovoProtocolo;

