import React, { useEffect, useState, useCallback } from "react";
import { Button, Grid } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { getAllEmpresas } from "../../apis/apiEmpresas";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Table from "../../components/Table";
import fieldsTables from "../../utils/fieldsTables";
import showColumns from "../../utils/showColumns";

function ListarEmpresas() {
  const [loading, setLoading] = useState<boolean>(true);
  const [searchParams] = useSearchParams();
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const navigate = useNavigate();

  const handleGetAllEmpresas = useCallback(async () => {
    setLoading(true);
    const result = await getAllEmpresas("");
    if (result.status === 200) {
      console.log(result);
      setEmpresas(result.data);
    }
    setLoading(false);
  }, []);

  const handleRowClick = (id: string) => {
    navigate(`visualizar/${id}`);
  };

  useEffect(() => {
    handleGetAllEmpresas();
  }, [searchParams]);

  return (
    <Grid container justifyContent="center" width={"100%"} xs={12}>
      {loading === false ? (
        <Grid item xs={12}>
          <div className="page-body">
            <span className="page-title">Empresas</span>
            <Grid container rowSpacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Grid container p={0} mb={1}>
                  <Grid item xs={6} textAlign={"start"} flexDirection={"row"}>
                    <Button
                      onClick={() => navigate("/cadastrar/empresa")}
                      className="btn-primario btn-voltar"
                      variant="contained"
                    >
                      Cadastrar Nova Empresa
                    </Button>
                  </Grid>
                  <Grid item xs={6} textAlign={"end"} flexDirection={"row"}>
                    <Button
                      onClick={() => window.history.back()}
                      className="btn-secundario btn-voltar"
                      variant="contained"
                    >
                      <ArrowBackIcon />
                      Voltar
                    </Button>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container item xs={12} pb={2} mb={3}>
                    <Table
                      columns={fieldsTables(navigate).empresasCadastradas}
                      rows={empresas}
                      idColumn="id_empresa"
                      sortColumn="id_empresa"
                      hasCheckbox={false}
                      tableTitle={""}
                      tableSubTitle={""}
                      name="empresas"
                      printButton={false}
                      showColumns={showColumns.empresasCadastradas}
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

export default ListarEmpresas;
