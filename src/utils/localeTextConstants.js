import messages_pt from './messages_pt.json';

export const GRID_DEFAULT_LOCALE_TEXT = () => {
  const translations = messages_pt;
  return(
  {
  // Root
  noRowsLabel: translations["lbl.react.tabela.config.nenhum.resultado.filtro"],
  noResultsOverlayLabel: translations["lbl.react.tabela.config.nenhum.resultado"],

  // Density selector toolbar button text
  toolbarDensity: 'Density',
  toolbarDensityLabel: 'Density',
  toolbarDensityCompact: 'Compact',
  toolbarDensityStandard: 'Standard',
  toolbarDensityComfortable: 'Comfortable',

  // Columns selector toolbar button text
  toolbarColumns: 'Columns',
  toolbarColumnsLabel: 'Select columns',

  // Filters toolbar button text
  toolbarFilters: 'Filters',
  toolbarFiltersLabel: 'Show filters',
  toolbarFiltersTooltipHide: 'Hide filters',
  toolbarFiltersTooltipShow: 'Show filters',
  toolbarFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} active filters` : `${count} active filter`,

  // Quick filter toolbar field
  toolbarQuickFilterPlaceholder: 'Search…',
  toolbarQuickFilterLabel: 'Search',
  toolbarQuickFilterDeleteIconLabel: 'Clear',

  // Export selector toolbar button text
  toolbarExport: 'Export',
  toolbarExportLabel: 'Export',
  toolbarExportCSV: 'Download as CSV',
  toolbarExportPrint: 'Print',
  toolbarExportExcel: 'Download as Excel',

  // Columns panel text
  columnsPanelTextFieldLabel: translations["lbl.react.tabela.config.localizar.coluna"],
  columnsPanelTextFieldPlaceholder: translations["lbl.react.tabela.config.titulo.coluna"],
  columnsPanelDragIconLabel: translations["lbl.react.tabela.config.reorganizar.colunas"],
  columnsPanelShowAllButton: translations["lbl.react.tabela.config.mostrar.todas"],
  columnsPanelHideAllButton: translations["lbl.react.tabela.config.esconder.todas"],

  // Filter panel text
  filterPanelAddFilter: 'Add filter',
  filterPanelRemoveAll: 'Remove all',
  filterPanelDeleteIconLabel: 'Delete',
  filterPanelLogicOperator: 'Logic operator',
  filterPanelOperator: translations["lbl.react.tabela.config.operador"],
  filterPanelOperatorAnd: 'And',
  filterPanelOperatorOr: 'Or',
  filterPanelColumns: translations["lbl.react.tabela.config.coluna"],
  filterPanelInputLabel: translations["lbl.react.tabela.config.valor"],
  filterPanelInputPlaceholder: translations["lbl.react.tabela.config.valor.filtro"],

  // Filter operators text
  filterOperatorContains: translations["lbl.react.tabela.config.contem"],
  filterOperatorEquals: translations["lbl.react.tabela.config.igual.a"],
  filterOperatorStartsWith: translations["lbl.react.tabela.config.comeca.com"],
  filterOperatorEndsWith: translations["lbl.react.tabela.config.termina.com"],
  filterOperatorIs: translations["lbl.react.tabela.config.e"],
  filterOperatorNot: translations["lbl.react.tabela.config.nao.e"],
  filterOperatorAfter: 'is after',
  filterOperatorOnOrAfter: 'is on or after',
  filterOperatorBefore: 'is before',
  filterOperatorOnOrBefore: 'is on or before',
  filterOperatorIsEmpty: translations["lbl.react.tabela.config.e.vazio"],
  filterOperatorIsNotEmpty: translations["lbl.react.tabela.config.nao.vazio"],
  filterOperatorIsAnyOf: translations["lbl.react.tabela.config.e.qualquer.de"],

  // Filter values text
  filterValueAny: 'any',
  filterValueTrue: 'true',
  filterValueFalse: 'false',

  // Column menu text
  columnMenuLabel: translations["lbl.react.tabela.config.menu"],
  columnMenuShowColumns: translations["lbl.react.tabela.config.mostra.colunas"],
  columnMenuManageColumns: translations["lbl.react.tabela.config.gerenciar.colunas"],
  columnMenuFilter: translations["lbl.react.tabela.config.filtra"],
  columnMenuHideColumn: translations["lbl.react.tabela.config.esconder.colunas"],
  columnMenuUnsort: translations["lbl.react.tabela.config.normal"],
  columnMenuSortAsc: translations["lbl.react.tabela.config.ordenacao.crescente"],
  columnMenuSortDesc: translations["lbl.react.tabela.config.ordenacao.descrecente"],

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} active filters` : `${count} active filter`,
  columnHeaderFiltersLabel: 'Show filters',
  columnHeaderSortIconLabel: 'Sort',

  // Rows selected footer text
  footerRowSelected: (count) =>
    count !== 1
      ? `${count.toLocaleString()} ${translations["lbl.react.tabela.config.linhas.selecionada"]}`
      : `${count.toLocaleString()} ${translations["lbl.react.tabela.config.linha.selecionada"]}`,

  // Total row amount footer text
  footerTotalRows: translations["lbl.react.tabela.config.total.linhas"],

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) => `${visibleCount.toLocaleString()} de ${totalCount.toLocaleString()}`,

  // Checkbox selection text
  checkboxSelectionHeaderName: translations["lbl.react.tabela.config.secao.caixa.selecao"],
  checkboxSelectionSelectAllRows: 'Select all rows',
  checkboxSelectionUnselectAllRows: 'Unselect all rows',
  checkboxSelectionSelectRow: 'Select row',
  checkboxSelectionUnselectRow: 'Unselect row',

  // Boolean cell text
  booleanCellTrueLabel: 'yes',
  booleanCellFalseLabel: 'no',

  // Actions cell more text
  actionsCellMore: 'more',

  // Column pinning text
  pinToLeft: 'Pin to left',
  pinToRight: 'Pin to right',
  unpin: 'Unpin',

  // Tree Data
  treeDataGroupingHeaderName: 'Group',
  treeDataExpand: 'see children',
  treeDataCollapse: 'hide children',

  // Grouping columns
  groupingColumnHeaderName: 'Group',
  groupColumn: (name) => `Group by ${name}`,
  unGroupColumn: (name) => `Stop grouping by ${name}`,

  // Master/detail
  detailPanelToggle: 'Detail panel toggle',
  expandDetailPanel: 'Expand',
  collapseDetailPanel: 'Collapse',

  // Used core components translation keys
  MuiTablePagination: {},

  // Row reordering text
  rowReorderingHeaderName: 'Row reordering',

  // Aggregation
  aggregationMenuItemHeader: 'Aggregation',
  aggregationFunctionLabelSum: 'sum',
  aggregationFunctionLabelAvg: 'avg',
  aggregationFunctionLabelMin: 'min',
  aggregationFunctionLabelMax: 'max',
  aggregationFunctionLabelSize: 'size',

})};

// Rows per page translation
export const ROWS_PER_PAGE = (translations) => ({
  labelRowsPerPage: translations["lbl.react.tabela.config.linhas.por.pagina"]
})