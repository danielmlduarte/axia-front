import { GRID_CHECKBOX_SELECTION_COL_DEF, GridActionsCellItem, GridColumnHeaderParams, GridComparatorFn, GridRenderCellParams, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import dayjs from 'dayjs';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from '@mui/icons-material/Delete';
import { Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const getUrlParams = () => {
  const paramSearch = new URLSearchParams(document.location.search);
  const token =   paramSearch.get("token");
  return { token }
}

const dateComparator: GridComparatorFn<string> = (v1, v2) => {
  const date1Splitted = v1.split('/')
  const date2Splitted = v2.split('/')
  const date1 = date1Splitted[0] === '-' ? new Date() : new Date(parseInt(date1Splitted[2]), parseInt(date1Splitted[1]), parseInt(date1Splitted[0]))
  const date2 = date2Splitted[0] === '-' ? new Date() : new Date(parseInt(date2Splitted[2]), parseInt(date2Splitted[1]), parseInt(date2Splitted[0]))
  return date1.getTime() - date2.getTime()
}

const fieldsTables = (navigate?: any, handleDeleteRow?: any, handleUpdateRow?: any) => ({
  funcionariosCadastrados: [
    {
      field: 'foto',
      headerName: 'Foto',
      width: 80,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => {
        const src = params.value
          ? `${process.env.REACT_APP_API}/${params.row.foto}` // valor é caminho relativo, ex: 'uploads/avatar.jpg'
          : undefined;
  
        return (
          <Avatar
            src={src}
            alt="avatar"
            sx={{ width: 40, height: 40 }}
          />
        );
      },
    },
    {
      field: 'nome',
      headerName: "Nome",
      minWidth: 150,
      flex: 2,
      hideable: false
    },
    {
      field: 'nascimento',
      headerName: "Data de nascimento",
      minWidth: 100,
      flex: 1,
      type: 'date',
      valueGetter: (params: GridValueGetterParams) => {
        return new Date(new Date(params.row.nascimento).setUTCHours(12))
      }
    },
    {
      field: 'admissão',
      headerName: "Data de Adimissão",
      flex: 1,
      type: 'date',
      valueGetter: (params: GridValueGetterParams) => {
        return new Date(new Date(params.row.admissao).setUTCHours(12))
      }
    },
    {
      field: 'nome_profissao',
      headerName: "Cargo",
      minWidth: 150,
      flex: 2,
      hideable: false
    },
    {
      field: 'actions',
      headerName: "Ações",
      description: "Ações",
      minWidth: 30,
      type: 'actions',
      flex: 0.5,
      hideable: false,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
        label={params.row.ativo ? "Inativar" : "Ativar"}
        onClick={() => handleUpdateRow(params.row)}
        showInMenu
      />,
        <GridActionsCellItem
          label={"Visualizar"}
          onClick={() => navigate(`visualizar/${params.row.id_funcionario}`)}
          showInMenu
        />,
        <GridActionsCellItem
        label={"Editar"}
        onClick={() => navigate(`../../cadastrar/funcionario/editar/${params.row.id_funcionario}`)}
        showInMenu
        />,
        <GridActionsCellItem
          label={"Excluir"}
          onClick={() => handleDeleteRow(params.row.id_funcionario)}
          showInMenu
        />
      ]
    },
  ],  
  empresasCadastradas: [
    {
      field: 'razao_social',
      headerName: "Razão Social",
      minWidth: 200,
      flex: 2,
      hideable: false
    },
    {
      field: 'nome_fantasia',
      headerName: "Nome Fantasia",
      minWidth: 150,
      flex: 2,
      hideable: false
    },
    {
      field: 'cnpj',
      headerName: "CNPJ",
      minWidth: 150,
      flex: 1.5,
    },
    {
      field: 'telefone',
      headerName: "Telefone",
      minWidth: 120,
      flex: 1,
    },
    {
      field: 'email',
      headerName: "E-mail",
      minWidth: 180,
      flex: 2,
    },
    {
      field: 'ativo',
      headerName: "Status",
      minWidth: 100,
      flex: 1,
      renderCell: (params: GridRenderCellParams) => (
        <span>{params.row.ativo ? "Ativo" : "Inativo"}</span>
      )
    },
    {
      field: 'actions',
      headerName: "Ações",
      minWidth: 30,
      type: 'actions',
      flex: 0.5,
      hideable: false,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          label={params.row.ativo ? "Inativar" : "Ativar"}
          onClick={() => handleUpdateRow(params.row)}
          showInMenu
        />,
        <GridActionsCellItem
          label={"Visualizar"}
          onClick={() => navigate(`visualizar/${params.row.id_empresa}`)}
          showInMenu
        />,
        <GridActionsCellItem
          label={"Editar"}
          onClick={() => navigate(`../../cadastrar/empresa/editar/${params.row.id_empresa}`)}
          showInMenu
        />,
        <GridActionsCellItem
          label={"Excluir"}
          onClick={() => handleDeleteRow(params.row.id_empresa)}
          showInMenu
        />
      ]
    },
  ],
  usuariosCadastrados: [
    {
      field: 'id_usuario',
      headerName: 'ID',
      width: 70,
    },
    {
      field: 'nome_usuario',
      headerName: 'Nome',
      width: 200,
    },
    {
      field: 'login',
      headerName: 'Login',
      width: 150,
    },
    {
      field: 'actions',
      headerName: "Ações",
      minWidth: 30,
      type: 'actions',
      flex: 0.5,
      hideable: false,
      getActions: (params: GridRowParams) => [
        <GridActionsCellItem
          label={"Visualizar"}
          onClick={() => navigate(`visualizar/${params.row.id_usuario}`)}
          showInMenu
        />,
        <GridActionsCellItem
          label={"Editar"}
          onClick={() => navigate(`../../cadastrar/usuario/editar/${params.row.id_usuario}`)}
          showInMenu
        />,
        <GridActionsCellItem
          label={"Excluir"}
          onClick={() => handleDeleteRow(params.row.id_usuario)}
          showInMenu
        />
      ]
    },
  ],
})

export default fieldsTables
