import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import InputCustom from '../../components/InputCustom';
import { getAll } from '../../apis/apiFuncionarios';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Table from '../../components/Table';
import fieldsTables from '../../utils/fieldsTables';
import showColumns from '../../utils/showColumns';

function Listar() {
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams] = useSearchParams();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([])
  const navigate = useNavigate();

  const handleGetAllFuncionarios = useCallback(async () => {
    setLoading(true)
    const result = await getAll("");
    if (result.status == 200) {
      console.log(result)
      setFuncionarios(result.data)
    }
    setLoading(false)
  }, []);

  const handleRowClick = (id: string) => {
    navigate(`visualizar/${id}`)
  }


  useEffect(() => {
    handleGetAllFuncionarios()
  }, [searchParams,]);

  return (
    <Grid container justifyContent="center" width={"100%"} xs={12}>
    { loading === false ?
      <Grid item xs={12}>
        <div className="page-body">
          <span className="page-title">
            Funcionários
          </span>
            <Grid container rowSpacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Grid container p={0} mb={1}>
                  <Grid item xs={6} textAlign={"start"} flexDirection={"row"}>
                    <Button onClick={() => navigate('/cadastrar/funcionario')} className="btn-primario btn-voltar" variant="contained">Cadastrar Novo Funcionário</Button>
                  </Grid>
                  <Grid item xs={6} textAlign={"end"} flexDirection={"row"}>
                    <Button onClick={() => window.history.back()} className="btn-secundario btn-voltar" variant="contained"><ArrowBackIcon />Voltar</Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                </Grid>
                <Grid item xs={12}>
                  <Grid container item xs={12} pb={2} mb={3}>
                    <Table
                      columns={fieldsTables(navigate).funcionariosCadastrados}
                      rows={funcionarios}
                      idColumn='id_funcionario'
                      sortColumn='id_funcionario'
                      hasCheckbox={false}
                      tableTitle={""}
                      tableSubTitle={""}
                      name="protocolos"
                      printButton={false}
                      showColumns={showColumns.protocolosCadastrados}
                      handleCloseTable={() => {}}
                      handleRowClick={handleRowClick}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
        </div>
      </Grid>
      :
      <Loading setHeight="85vh"/>
    }
    </Grid>
  );
}

export default Listar;