import React, { useEffect, useState, useCallback } from 'react';
import { Box, Button, Grid } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import Table from '../../components/Table';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getAllUsuarios } from '../../apis/apiUsuarios'; // nova API
import fieldsTables from '../../utils/fieldsTables';
import showColumns from '../../utils/showColumns';

interface Usuario {
  id_usuario: number;
  nome_usuario: string;
  login: string;
}

function ListarUsuarios() {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const navigate = useNavigate();

  const handleGetAllUsuarios = useCallback(async () => {
    setLoading(true);
    const result = await getAllUsuarios();
    if (result.status === 200) {
      console.log(result);
      setUsuarios(result.data);
    }
    setLoading(false);
  }, []);

  const handleRowClick = (id: string | number) => {
    navigate(`visualizar/${id}`);
  };

  useEffect(() => {
    handleGetAllUsuarios();
  }, [searchParams, handleGetAllUsuarios]);

  return (
    <Grid container justifyContent="center" width={"100%"} xs={12}>
      {loading === false ? (
        <Grid item xs={12}>
          <div className="page-body">
            <span className="page-title">
              Usuários
            </span>
            <Grid container rowSpacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Grid container p={0} mb={1}>
                  <Grid item xs={6} textAlign={"start"} flexDirection={"row"}>
                    <Button
                      onClick={() => navigate('/cadastrar/usuario')}
                      className="btn-primario btn-voltar"
                      variant="contained"
                    >
                      Cadastrar Novo Usuário
                    </Button>
                  </Grid>
                  <Grid item xs={6} textAlign={"end"} flexDirection={"row"}>
                    <Button
                      onClick={() => window.history.back()}
                      className="btn-secundario btn-voltar"
                      variant="contained"
                    >
                      <ArrowBackIcon /> Voltar
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container item xs={12} pb={2} mb={3}>
                    <Table
                      columns={fieldsTables(navigate).usuariosCadastrados} // ajustar no utils/fieldsTables
                      rows={usuarios}
                      idColumn='id_usuario'
                      sortColumn='id_usuario'
                      hasCheckbox={false}
                      tableTitle={""}
                      tableSubTitle={""}
                      name="usuarios"
                      printButton={false}
                      showColumns={showColumns.usuariosCadastrados} // ajustar showColumns
                      handleCloseTable={() => {}}
                      handleRowClick={handleRowClick}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </div>
        </Grid>
      ) : (
        <Loading setHeight="85vh" />
      )}
    </Grid>
  );
}

export default ListarUsuarios;
