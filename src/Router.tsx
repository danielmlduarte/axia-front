import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Layout from './layout/MainLayout';
import ProtectedRoute from './utils/ProtectedRoute'; // ou onde estiver o seu arquivo
import Listar from './pages/Funcionarios/Listar';
import Cadastrar from './pages/Funcionarios/Cadastrar';
import CadastrarEmpresa from './pages/Empresas/Cadastrar';
import ListarEmpresas from './pages/Empresas/Listar';
import CadastrarUsuario from './pages/Usuarios/Cadastrar';
import ListarUsuarios from './pages/Usuarios/Listar';
import Disc from './pages/TestesAxia/Disc';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/disc',
    element: <Disc />,
  },
  {
    path: '/',
    element: <ProtectedRoute />, // Proteção começa aqui
    children: [
      {
        path: '/',
        element: <Layout />, // layout com menu e <Outlet />
        children: [
          {
            path: 'home',
            element: <Home />,
          },
          {
            path: 'cadastrar',
            children: [
              {
                path: 'funcionario',
                children: [
                  {
                    path: '',
                    element: <Cadastrar />,
                  },
                  {
                    path: 'editar/:id',
                    element: <Cadastrar />,
                  },
                ],
              },
              {
                path: 'empresa',
                children: [
                  {
                    path: '',
                    element: <CadastrarEmpresa />,
                  },
                  {
                    path: 'editar/:id',
                    element: <CadastrarEmpresa />,
                  },
                ],
              },
              {
                path: 'usuario',
                children: [
                  {
                    path: '',
                    element: <CadastrarUsuario />,
                  },
                  {
                    path: 'editar/:id',
                    element: <CadastrarUsuario />,
                  },
                ],
              },
            ],
          },
          {
            path: 'gerenciar',
            children: [
              {
                path: 'funcionarios',
                children: [
                  {
                    path: '',
                    element: <Listar />,
                  },
                  {
                    path: 'visualizar/:id',
                    element: <Cadastrar />,
                  },
                ],
              },
              {
                path: 'empresas',
                children: [
                  {
                    path: '',
                    element: <ListarEmpresas />,
                  },
                  {
                    path: 'visualizar/:id',
                    element: <CadastrarEmpresa />,
                  },
                ],
              },
              {
                path: 'usuarios',
                children: [
                  {
                    path: '',
                    element: <ListarUsuarios />,
                  },
                  {
                    path: 'visualizar/:id',
                    element: <CadastrarUsuario />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <Login />,
  },
]);

export default routes;
