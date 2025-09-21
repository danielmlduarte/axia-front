const showFilters = {
  partos: {
    espCodigo: true,
    racCodigo: true,
    sexo: false,
    lotCodigo: true,
    catCodigo: true,
    statusCria: false,
    tipoBusca: false,
    considerarDescartados: false,
    ageInMonthCombo: false,
    tipoPrenhez: false,
    genericStatus: false
  },
  nascimentos: {
    espCodigo: true,
    racCodigo: true,
    sexo: true,
    lotCodigo: true,
    catCodigo: true,
    statusCria: true,
    tipoBusca: false, 
    considerarDescartados: false,
    ageInMonthCombo: false,
    tipoPrenhez: false,
    genericStatus: false
  },
  prenhez: {
    espCodigo: true,
    racCodigo: true,
    sexo: false,
    lotCodigo: true,
    catCodigo: true,
    statusCria: true,
    tipoBusca: false,
    considerarDescartados: true,
    ageInMonthCombo: false,
    tipoPrenhez: false,
    genericStatus: false
  },
  prenhas: {
    espCodigo: true,
    racCodigo: true,
    sexo: false,
    lotCodigo: true,
    catCodigo: true,
    statusCria: true,
    considerarDescartados: false,
    ageInMonthCombo: false,
    tipoPrenhez: true,
    genericStatus: false
  },
  previsao_desmama: {
    espCodigo: true,
    racCodigo: true,
    sexo: true,
    lotCodigo: true,
    catCodigo: true,
    statusCria: true,
    tipoBusca: true,
    considerarDescartados: false,
    ageInMonthCombo: false,
    tipoPrenhez: false,
    genericStatus: false
  },
  desmames_ocorridos: {
    espCodigo: true,
    racCodigo: true,
    sexo: true,
    lotCodigo: true,
    catCodigo: true,
    statusCria: true,
    tipoBusca: true,
    considerarDescartados: false,
    ageInMonthCombo: true,
    tipoPrenhez: false,
    genericStatus: false
  },
  listar_protocolos: {
    espCodigo: false,
    racCodigo: false,
    sexo: false,
    lotCodigo: true,
    catCodigo: false,
    statusCria: false,
    tipoBusca: false,
    considerarDescartados: false,
    ageInMonthCombo: false,
    tipoPrenhez: false,
    genericStatus: true
  },
  desmamados_por_semen: {
    espCodigo: true,
    racCodigo: true,
    sexo: true,
    lotCodigo: true,
    catCodigo: true,
    statusCria: true,
    tipoBusca: false,
    considerarDescartados: false,
    ageInMonthCombo: true,
    tipoPrenhez: false,
    genericStatus: false
  },
  general_overview: {
    espCodigo: true,
    racCodigo: true,
    catCodigo: true,
    lotCodigo: true,
    statusCria: true,
    sexo: false,
    tipoBusca: false,
    considerarDescartados: false,
    ageInMonthCombo: false,
    tipoPrenhez: false,
    genericStatus: false
  }
}

const filterItems = (translations: any) => ({
  tipoBusca: {
    previsao_desmame: [{value: translations["lbl.react.data.nascimento"], valueKey: "0"}, {value: translations["lbl.react.data.previsao"], valueKey: "1"}],
    desmames_ocorridos: [{value: translations["lbl.react.data.nascimento"], valueKey: "0"}, {value: translations["lbl.react.data.de.desmame"], valueKey: "1"}]
  },
  genericStatus: [
    {
      tabName: 'listar_protocolos',
      placeholder: 'Status',
      values: [{value: translations["lbl.react.protocolo.ativo"], valueKey: "1"}, {value: translations["lbl.react.protocolo.inativo"], valueKey: "0"}]
    }
  ]
})

export { showFilters, filterItems }
