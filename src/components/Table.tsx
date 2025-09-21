import { DataGrid, GridColDef, GridToolbarContainer, useGridApiContext } from '@mui/x-data-grid';
import { GRID_DEFAULT_LOCALE_TEXT, ROWS_PER_PAGE } from '../utils/localeTextConstants';
import { Box, Button, Grid } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import arrowIcon from '../assets/imgs/arrowDownCircleIcon.svg'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useContext, ReactNode, useEffect } from 'react';

interface TableProps {
  rows: any,
  columns: GridColDef[],
  idColumn: string | string[],
  sortColumn: string,
  tableTitle: ReactNode,
  tableSubTitle?: ReactNode,
  handleCloseTable?: any,
  name: string
  showColumns?: any,
  printButton?: boolean,
  hasCheckbox?: boolean,
  border?: boolean
  handleRowClick?: any
};

function CustomToolbar() {
  const apiRef = useGridApiContext();

  const handleDonwloadCSV = () => apiRef.current.exportDataAsCsv({utf8WithBom: true, delimiter: ';'});

  return (
    <GridToolbarContainer>
      <Button startIcon={<img src={arrowIcon} alt="download icon" />} className="btn-primario" variant="contained" onClick={handleDonwloadCSV}>Download CSV</Button>
    </GridToolbarContainer>
  );
}

function handlePageName() {
  const item = document.querySelector(".css-levciy-MuiTablePagination-displayedRows")
  if (item && item.textContent)  item.textContent = item?.textContent?.replace("of", "de")
}

export default function DataTable(props: TableProps) {
  const { rows, columns, idColumn, sortColumn, tableTitle, tableSubTitle, handleCloseTable, name, showColumns, printButton = true, hasCheckbox = true, border = true, handleRowClick } = props

  useEffect(() => {
    if (rows && columns) handlePageName();
  }, [rows, columns])

  function acessarObjeto(row: Reproduction, acessoArray: string[]) {
    return acessoArray.reduce((obj: Reproduction, key: string) => (obj && obj[key] !== 'undefined') ? obj[key] : undefined, row);
  }
  
  return (
    <Box className={`box-table ${border ? "" : 'without-border'}`}>
      <Grid item container p={border ? 2 : 0}>
        { border &&
          <Grid item container justifyContent='space-between' xs={12}>
            <Grid>
              <Grid item xs={12} px={2} mt={1} mb={0}>
                <span className="chart-title">
                  { tableTitle }
                </span>
              </Grid>
              { tableSubTitle &&
                <Grid item mb={2} mt={1} paddingX={2}>
                  <span className="c-b-cinza-icons chart-warning">{ tableSubTitle }</span>
                </Grid>
              }
            </Grid>
          </Grid>
        }
        <Grid item container xs={12} mt={2} border='none'>
          <div style={{ width: '100%' }}>
            {
              rows && columns &&
              <DataGrid
                onRowClick={(row) => handleRowClick(row.id)}
                processRowUpdate={handlePageName}
                rows={rows}
                columns={columns}
                autoHeight
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 50 },              
                  },
                  sorting: {
                    sortModel: [{ field: sortColumn, sort: 'asc' }],
                  },
                  columns: {
                    columnVisibilityModel: showColumns ? showColumns : {}
                  },
                }}
                getRowId={Array.isArray(idColumn) ? (row) => acessarObjeto(row, idColumn) : (row) => row[idColumn]}
                pageSizeOptions={[50, 100]}
                checkboxSelection={hasCheckbox}
                slots={{
                  toolbar: printButton ? CustomToolbar : null,
                  columnMenuIcon: KeyboardArrowDownIcon
                }}
              />
            }
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}