import React, { useEffect, useState, useCallback } from "react";
import { Box, Button, Grid, Tooltip } from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Loading from "../../components/LoadingTransparent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputCustom from "../../components/InputCustom";
import Tabs from "../../components/Tabs";
import Notification from "../../components/Notification";
import { getEmpresa, postEmpresa, putEmpresa } from "../../apis/apiEmpresas";
import UploadMultiplosArquivosEmpresas from "../../components/UploadMultiplosArquivosEmpresas";
import SearchIcon from '@mui/icons-material/Search';

function CadastrarEmpresa() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<string>("dados");
  const [stateNotification, setStateNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>("");

  const [empresaData, setEmpresaData] = useState<any>({
    razao_social: "",
    nome_fantasia: "",
    cnpj: "",
    inscricao_estadual: "",
    inscricao_municipal: "",
    cnae: "",
    capital_social: "",
    porte: "",
    natureza_juridica: "",
    atividade_principal: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
    cep: "",
    telefone: "",
    email: "",
    site: "",
    socios: [],
    ativo: true,
  });

  const isEditar = location.pathname.includes("/cadastrar/empresa/editar");
  const isNovo = location.pathname.includes("/cadastrar/empresa");
  const isVisualizar = location.pathname.includes("/visualizar");

  const handleClose = () => {
    setStateNotification(!stateNotification);
  };

  const handleInputsChange = (event: any) => {
    const { name, value } = event.target;
    setEmpresaData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleChangeTab = (event: React.SyntheticEvent, value: string) => {
    setSelectedTab(value);
  };

  // 🔎 Consulta API publica.cnpj.ws
  const handleBuscarCNPJ = async () => {
    if (!empresaData.cnpj) {
      setNotificationMessage("Informe um CNPJ para consulta.");
      setStateNotification(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://publica.cnpj.ws/cnpj/${empresaData.cnpj}`);
      if (!response.ok) throw new Error("Erro ao consultar CNPJ");

      const data = await response.json();
      console.log("CNPJ API:", data);

      setEmpresaData((prev: any) => ({
        ...prev,
        razao_social: data.razao_social,
        nome_fantasia: data.estabelecimento?.nome_fantasia,
        cnpj: data.estabelecimento?.cnpj,
        inscricao_estadual: data.estabelecimento?.inscricoes_estaduais?.[0]?.inscricao_estadual || "",
        inscricao_municipal: data.inscricao_municipal || "",
        cnae: data.estabelecimento?.atividade_principal?.subclasse,
        capital_social: data.capital_social,
        porte: data.porte?.descricao,
        natureza_juridica: data.natureza_juridica?.descricao,
        atividade_principal: data.estabelecimento?.atividade_principal?.descricao,
        endereco: `${data.estabelecimento?.tipo_logradouro} ${data.estabelecimento?.logradouro}`,
        numero: data.estabelecimento?.numero,
        complemento: data.estabelecimento?.complemento,
        bairro: data.estabelecimento?.bairro,
        cidade: data.estabelecimento?.cidade?.nome,
        uf: data.estabelecimento?.estado?.sigla,
        cep: data.estabelecimento?.cep,
        telefone: data.estabelecimento?.telefone1,
        email: data.estabelecimento?.email,
        site: data.site || "",
        socios: data.socios || [],
      }));

      setNotificationMessage("Dados preenchidos com sucesso via API CNPJ!");
      setStateNotification(true);
    } catch (err: any) {
      console.error(err);
      setNotificationMessage("Erro ao buscar dados do CNPJ.");
      setStateNotification(true);
    }
    setLoading(false);
  };

  const handleSalvar = useCallback(async () => {
    setLoading(true);

    let result;
    if (isEditar && id) {
      result = await putEmpresa(empresaData, id);
      if (result.status === 200 || result.status === 201) {
        setNotificationMessage("Empresa atualizada com sucesso!");
        setStateNotification(true);
      }
    } else if (isNovo) {
      result = await postEmpresa(empresaData);
      if (result.status === 200 || result.status === 201) {
        setNotificationMessage("Empresa cadastrada com sucesso!");
        setStateNotification(true);
      }
    }
    setLoading(false);
  }, [empresaData, id, isEditar, isNovo]);

  const handleGetEmpresa = useCallback(async () => {
    if (id) {
      setLoading(true);
      const result = await getEmpresa(id);
      if (result.status === 200) {
        setEmpresaData(result.data);
      }
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!isNovo) {
      handleGetEmpresa();
    }
  }, [id]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <div className="page-body">
          <span className="page-title">
            {`Cadastro de Empresas > ${
              id
                ? location.pathname.includes("editar")
                  ? "Editar Empresa"
                  : "Visualizar Empresa"
                : "Nova Empresa"
            } `}
          </span>
            <Grid container rowSpacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Grid container padding="22px" pr={0} mb={1}>
                  <Grid item xs={8} textAlign={"start"}>
                    <span className="page-title">{empresaData.razao_social}</span>
                  </Grid>
                  <Grid item xs={4} textAlign={"end"}>
                    <Button
                      onClick={() => navigate("/cadastros/empresas")}
                      className="btn-secundario btn-voltar"
                      variant="contained"
                    >
                      <ArrowBackIcon />
                      Voltar
                    </Button>
                    {!isVisualizar && (
                      <>
                        <Button
                          onClick={() => handleSalvar()}
                          className="btn-primario"
                          variant="contained"
                        >
                          Salvar
                        </Button>
                      </>
                    )}
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Tabs
                    handleChange={(e: any, v: React.SetStateAction<string>) => setSelectedTab(v)}
                    value={selectedTab}
                    labels={[
                      { label: "Dados Principais", name: "dados" },
                      { label: "Endereço", name: "endereco" },
                      { label: "Contato", name: "contato" },
                      { label: "Societário", name: "societario" },
                      { label: "Documentos", name: "documentos" },
                    ]}
                  />
                </Grid>

                <Box sx={{ width: "100%", backgroundColor: "#f7f7f7", borderRadius: "3px" }}>
                  {/* Aba Dados */}
                  {selectedTab === "dados" && (
                    <Grid container padding="22px" mt={4} rowSpacing={2} columnSpacing={2}>
                      <Grid item container xs={4}>
                        <Grid item xs={11.5} >
                          <span className="input-label">CNPJ:</span>
                          <InputCustom
                            placeholder=""
                            controlledValue={empresaData.cnpj}
                            name="cnpj"
                            handleChange={handleInputsChange}
                          />
                        </Grid>
                        <Grid item xs={0.5} sx={{alignSelf: "end !important"}} pb={"5px"} pl={1}>
                          <Tooltip title="Buscar CNPJ">
                              <SearchIcon className='pointer' onClick={() => handleBuscarCNPJ()} />
                          </Tooltip>
                        </Grid>
                      </Grid>
                      <Grid item xs={8}>
                        <span className="input-label">Razão Social:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.razao_social}
                          name="razao_social"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <span className="input-label">Nome Fantasia:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.nome_fantasia}
                          name="nome_fantasia"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <span className="input-label">Inscrição Estadual:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.inscricao_estadual}
                          name="inscricao_estadual"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <span className="input-label">Inscrição Municipal:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.inscricao_municipal}
                          name="inscricao_municipal"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <span className="input-label">CNAE:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.cnae}
                          name="cnae"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <span className="input-label">Atividade Principal:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.atividade_principal}
                          name="atividade_principal"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <span className="input-label">Capital Social:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.capital_social}
                          name="capital_social"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <span className="input-label">Natureza Jurídica:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.natureza_juridica}
                          name="natureza_juridica"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <span className="input-label">Porte:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.porte}
                          name="porte"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {/* Endereço */}
                  {selectedTab === "endereco" && (
                    <Grid container padding="22px" mt={4} rowSpacing={2} columnSpacing={2}>
                      <Grid item xs={6}>
                        <span className="input-label">Endereço:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.endereco}
                          name="endereco"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <span className="input-label">Número:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.numero}
                          name="numero"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <span className="input-label">Complemento:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.complemento}
                          name="complemento"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <span className="input-label">Bairro:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.bairro}
                          name="bairro"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <span className="input-label">Cidade:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.cidade}
                          name="cidade"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <span className="input-label">UF:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.uf}
                          name="uf"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <span className="input-label">CEP:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.cep}
                          name="cep"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {/* Contato */}
                  {selectedTab === "contato" && (
                    <Grid container padding="22px" mt={4} rowSpacing={2} columnSpacing={2}>
                      <Grid item xs={6}>
                        <span className="input-label">Telefone:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.telefone}
                          name="telefone"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <span className="input-label">E-mail:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.email}
                          name="email"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <span className="input-label">Site:</span>
                        <InputCustom
                          placeholder=""
                          controlledValue={empresaData.site}
                          name="site"
                          handleChange={handleInputsChange}
                        />
                      </Grid>
                    </Grid>
                  )}

                  {/* Societário */}
                  {selectedTab === "societario" && (
                    <Grid container padding="22px" mt={4} rowSpacing={2}>
                      {empresaData.socios && empresaData.socios.length > 0 ? (
                        empresaData.socios.map((socio: any, idx: number) => (
                          <Grid
                            key={idx}
                            item
                            xs={12}
                            sx={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}
                          >
                            <strong>{socio.nome}</strong> — {socio.qualificacao_socio?.descricao}
                          </Grid>
                        ))
                      ) : (
                        <Grid item xs={12}>Nenhum sócio cadastrado.</Grid>
                      )}
                    </Grid>
                  )}

                  {/* Documentos */}
                  {selectedTab === "documentos" && (
                    id ?
                      <Grid container padding="22px" rowGap={2}>
                        {
                          <UploadMultiplosArquivosEmpresas idEmpresa={id}/>
                        }
                      </Grid>
                      :
                      <Grid container padding="22px" mt={12} mb={12} rowGap={2} textAlign={"center"} justifyContent={"center"}>
                        <span>É necessário realizar um pré-cadastro da e,presa para habilitar a funcionalidade de enviar documentos</span>
                      </Grid>
                    )}
                </Box>
              </Grid>
              <Notification
                message={notificationMessage}
                open={stateNotification}
                handleClose={handleClose}
              />
            </Grid>
            { loading &&
              <Loading setHeight="85vh" />
            }
        </div>
      </Grid>
    </Grid>
  );
}

export default CadastrarEmpresa;
