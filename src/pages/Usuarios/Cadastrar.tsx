import React, { useState, useCallback } from 'react';
import { Grid, Button } from '@mui/material';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import Loading from '../../components/Loading';
import InputCustom from '../../components/InputCustom';
import Notification from '../../components/Notification';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { postUsuario, putUsuario } from '../../apis/apiUsuarios';

const initialUserData = {
  nome_usuario: '',
  login: '',
  senha: ''
};

function CadastrarUsuario() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const [loading, setLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(initialUserData);
  const [stateNotification, setStateNotification] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');

  const isEditar = location.pathname.includes('/usuarios/editar');

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setUserData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCloseNotification = () => {
    setStateNotification(false);
  };

  const handleSalvar = useCallback(async () => {
    setLoading(true);
    try {
      let result;
      if (isEditar) {
        // Caso queira implementar edição futura
        result = await putUsuario(id!, userData);
      } else {
        result = await postUsuario(userData);
      }

      if (result.status === 201) {
        setNotificationMessage('Usuário cadastrado com sucesso!');
        setStateNotification(true);
        setUserData(initialUserData);
        navigate('/gerenciar/usuarios');
      } else {
        setNotificationMessage(`Erro ao salvar: ${result.data}`);
        setStateNotification(true);
      }
    } catch (err: any) {
      console.error(err);
      setNotificationMessage('Erro ao salvar usuário.');
      setStateNotification(true);
    }
    setLoading(false);
  }, [userData]);

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <div className="page-body">
          <span className="page-title">
            {isEditar ? 'Editar Usuário' : 'Novo Usuário'}
          </span>
          {loading ? (
            <Loading setHeight="85vh" />
          ) : (
            <Grid container rowSpacing={2} justifyContent="center" padding="22px">
              <Grid item xs={12} container justifyContent="space-between" mb={2}>
                <Button
                  onClick={() => navigate('/gerenciar/usuarios')}
                  className="btn-secundario btn-voltar"
                  variant="contained"
                >
                  <ArrowBackIcon /> Voltar
                </Button>
                <Button
                  onClick={handleSalvar}
                  className="btn-primario"
                  variant="contained"
                >
                  Salvar
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Grid item xs={3}>
                  <span className="input-label">Nome do usuário:</span>
                  <InputCustom
                    placeholder=""
                    controlledValue={userData.nome_usuario}
                    name="nome_usuario"
                    handleChange={handleChange}
                    isValid={true}
                    readOnly={false}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={3}>
                  <span className="input-label">Login:</span>
                  <InputCustom
                    placeholder=""
                    controlledValue={userData.login}
                    name="login"
                    handleChange={handleChange}
                    isValid={true}
                    readOnly={false}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={3}>
                  <span className="input-label">Senha:</span>
                  <InputCustom
                    placeholder=""
                    controlledValue={userData.senha}
                    name="senha"
                    type="password"
                    handleChange={handleChange}
                    isValid={true}
                    readOnly={false}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
          <Notification
            message={notificationMessage}
            open={stateNotification}
            handleClose={handleCloseNotification}
          />
        </div>
      </Grid>
    </Grid>
  );
}

export default CadastrarUsuario;
