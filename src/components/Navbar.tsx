import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PrimarySearchAppBar from './AppBar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Collapse, CssBaseline, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }: { open: boolean }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }: { open: boolean }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

export default function MiniDrawer() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [openState, setOpenState] = React.useState(true);
  const [openCadastros, setOpenCadastros] = React.useState(false);
  const [openGerenciamentos, setOpenGerenciamentos] = React.useState(false);

  const handleDrawer = () => {
    setOpenState(!openState);
  };
  //const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }} width={"100%"}>
      <CssBaseline />
      <PrimarySearchAppBar drawerOpen={handleDrawer}/>
      <Drawer variant="permanent" open={openState}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Gerenciamentos'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={() => setOpenGerenciamentos(!openGerenciamentos)}>
                <ListItemIcon>
                  <RecentActorsIcon />
                </ListItemIcon>
                <ListItemText primary="Gerenciamentos" />
                {openGerenciamentos ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openGerenciamentos} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/gerenciar/funcionarios')}>
                    <ListItemIcon>
                      <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Funcionários" />
                  </ListItemButton>
                </List>
              </Collapse>
              <Collapse in={openGerenciamentos} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/gerenciar/empresas')}>
                    <ListItemIcon>
                      <ApartmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Empresas" />
                  </ListItemButton>
                </List>
              </Collapse>
              <Collapse in={openGerenciamentos} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/gerenciar/usuarios')}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Usuários" />
                  </ListItemButton>
                </List>
              </Collapse>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Cadastros'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton onClick={() => setOpenCadastros(!openCadastros)}>
                <ListItemIcon>
                  <RecentActorsIcon />
                </ListItemIcon>
                <ListItemText primary="Cadastros" />
                {openCadastros ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openCadastros} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/cadastrar/funcionario')}>
                    <ListItemIcon>
                      <PeopleAltIcon />
                    </ListItemIcon>
                    <ListItemText primary="Novo funcionário" />
                  </ListItemButton>
                </List>
              </Collapse>
              <Collapse in={openCadastros} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/cadastrar/empresa')}>
                    <ListItemIcon>
                      <ApartmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Empresas" />
                  </ListItemButton>
                </List>
              </Collapse>
              <Collapse in={openCadastros} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }} onClick={() => navigate('/cadastrar/usuario')}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText primary="Usuários" />
                  </ListItemButton>
                </List>
              </Collapse>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    minHeight: 48,
                    px: 2.5,
                  },
                  openState
                    ? {
                        justifyContent: 'initial',
                      }
                    : {
                        justifyContent: 'center',
                      },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    openState
                      ? {
                          mr: 3,
                        }
                      : {
                          mr: 'auto',
                        },
                  ]}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text}
                  sx={[
                    openState
                      ? {
                          opacity: 1,
                        }
                      : {
                          opacity: 0,
                        },
                  ]}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#f9f9f9' }} width={"100%"}>
        <DrawerHeader />
        <Outlet />        
      </Box>
    </Box>
  );
}