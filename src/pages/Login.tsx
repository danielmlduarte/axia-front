import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Button, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import InputCustom from '../components/InputCustom';
import { loginUsuario } from '../apis/apiUsuarios';
import Cookies from "js-cookie"; // biblioteca prática p/ lidar com cookies
import { jwtDecode } from "jwt-decode"; // p/ extrair o exp do JWT

type DecodedToken = {
  exp: number; // campo padrão de expiração do JWT em segundos
};

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams] = useSearchParams();
  const [ loginState, setLoginState ] = useState<string>("");
  const [ senhaState, setSenhaState ] = useState<string>("");

  useEffect(() => {
    setLoading(true)
    setLoading(false)
  }, [searchParams,]);

  const handleLogin = (event: any) => {
    const {
      target: { value },
    } = event;
    setLoginState(value)
  }

  const handleSenha = (event: any) => {
    const {
      target: { value },
    } = event;
    setSenhaState(value)
  }

  const handleTesteButton = () => {
    navigate("/disc");
  };

  const handleLoginButton = useCallback(async () => {
    if (!loginState || !senhaState) return;
    setLoading(true);
  
    try {
      const result = await loginUsuario({ login: loginState, senha: senhaState });
      console.log(result);
  
      if (result.status === 200) {
        const token = result.data.token;
  
        // decodifica para pegar o exp
        const decoded: DecodedToken = jwtDecode(token);
        const expiresInMs = decoded.exp * 1000 - Date.now();
  
        // seta o cookie com expiração baseada no token
        Cookies.set("token", token, {
          expires: new Date(Date.now() + expiresInMs),
          secure: true, // recomenda-se true em produção (HTTPS)
          sameSite: "Strict", // evita CSRF
        });
  
        navigate("/gerenciar/funcionarios");
      }
    } catch (error) {
      console.error("Erro no login:", error);
    } finally {
      setLoading(false);
    }
  }, [loginState, senhaState, navigate]);

  return (
    <Grid container justifyContent="center" height="100vh">
      { loading === false ?
        <Grid item container xs={4} justifyContent="center" alignItems="center">
            <div className="page-body">
              <span className="page-title">
                Login
              </span>
              <InputCustom
                placeholder={'Digite seu login'}
                controlledValue={loginState}
                name={'login'}
                handleChange={handleLogin}
                isValid={true}
                readOnly={false}
                autoComplete='on'
              />
              <InputCustom
                placeholder={'Digite sua senha'}
                controlledValue={senhaState}
                name={'senha'}
                handleChange={handleSenha}
                isValid={true}
                readOnly={false}
                autoComplete='on'
              />
              <Button onClick={handleLoginButton}>Entrar</Button>
              <Grid mt={8}>
                <Button onClick={handleTesteButton}>Fazer teste DISC</Button>
              </Grid>
            </div>
        </Grid>
        :
        <Loading />
      }
    </Grid>
  );
}

export default Login;