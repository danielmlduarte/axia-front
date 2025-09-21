import React, { useEffect, useState, useContext } from 'react';
import { Button, Grid } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import Loading from '../components/Loading';
import InputCustom from '../components/InputCustom';

function Home() {
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

  const handleLoginButton = () => {
    //if (loginState != "" && senhaState != "")

  }

  return (
    <Grid container justifyContent="center">
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
              />
              <InputCustom
                placeholder={'Digite sua senha'}
                controlledValue={senhaState}
                name={'senha'}
                handleChange={handleSenha}
                isValid={true}
                readOnly={false}
              />
              <Button onClick={handleLoginButton}>Entrar</Button>
            </div>
        </Grid>
        :
        <Loading />
      }
    </Grid>
  );
}

export default Home;