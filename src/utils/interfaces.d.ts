interface FiltersType {
  ageInMonth?: any,
  startDate?: Date | string,
  endDate?: Date | string,
  espCodigo?: string,
  racCodigo?: string,
  sexo?: string,
  lotCodigo?: string,
  catCodigo?: string,
  statusCria?: string,
  tipoBusca?: string,
  considerarDescartados?: boolean,
  cobTipo?:string,
  genericStatus?: string,
}

interface ApiFiltersType {
  proCodigo: string | null,
  dataIni?: Date | string,
  dataFim?: Date | string,
  espCodigo?: string,
  racCodigo?: string,
  sexo?: string,
  lotCodigo?: string,
  catCodigo?: string,
  statusCria?: string,
  cobTipo?:string
}

interface ApiPostCullingType {
  proCodigo: string | null,
  descartes: {
    aniCodigo: number,
    desDataIni: Date | string,
    desObsIni?: string
  }[]
}

interface ApiPutCullingType {
  proCodigo: string | null,
  descartes: {
    desCodigo: number,
    aniCodigo: number,
    desDataIni: Date | string,
    desObsIni?: string,
    desDataFim: Date | string,
    desObsFim?: string
  }[]
}

interface AnimalType { 
  proCodigo: string,
  dataInicial: string | Date,
  dataFinal: string | Date
}

interface Animal {
  aniCodigo?: number;
  idVisual: string ;
  idEletronico: string | null;
  dataNascimento: string;
  prevParto: string;
  idadeMeses: number;
  pesoNascimento: number;
  pesoAtual: number;
  aniSexo: string;
  aniNumeroCab: string;
  pesoDesmameKg?: number;
  pesoDesmameArroba?: number;
  lotCodigo?:number | string;
  categoria: {
      catCodigo: number;
      catNome: string;
  };
  raca: {
      espCodigo: number;
      espNome: string;
      racCodigo: number;
      racNome: string;
  };
}

interface Reproduction {
  cobCodigo?: number | null;
  cobData?: string | null;
  cobIndStatus?: number | null;
  semenIatf1?: string | null;
  cobDataToqueN2?: string | null;
  cobIndN2?: number | null;
  semenIatf2?: string | null;
  cobDataToqueN3?: string | null;
  cobIndN3?: number | null;
  semenIatf3?: string | null;
  cobDataRt?: string | null;
  cobIndRt?: number | null;
  cobDataToque?: string | null;
  cobIndToque?: number | null;
  cobPrenhezData?: string | null;
  animal: {
    aniCodigo: number;
    idVisual: string;
    idEletronico: string | null;
    dataNascimento: string;
    prevParto?: string;
    statusDescarte: boolean;
    idadeMeses?: number;
    pesoNascimento?: number;
    aniSexo: string;
    aniNumeroCab: string;
  },
  categoria: {
      catCodigo: number;
      catNome: string;
  };
  raca: {
      espCodigo: number;
      espNome: string;
      racCodigo: number;
      racNome: string;
  };
  [key: string]: any;
}

interface FemeaApta {
  aniCodigo: number;
  idVisual: string;
  status: string;
  idEletronico: string | null;
  reproducaoData: {
    cobCodigo?: number | null,
    cobData?: string | null,
    cobDataToque?: string | null,
    cobDataToqueN2?: string | null,
    cobDataToqueN3?: string | null,
    cobIndN2?: number | null,
    cobIndN3?: number | null,
    cobDataRt?: string | null,
    cobIndRt?: number | null,
    cobIndStatus?: number | null,
    cobIndToque?: number | null,
  }
  peso: number | null;
  lote: string | null;
  dataNascimento: string;
  statusDescarte: boolean;
  categoriaData: {
      catCodigo: number;
      catNome: string;
  };
  racaData: {
      espCodigo: number;
      espNome: string;
      racCodigo: number;
      racNome: string;
  };
}

interface BarChartData {
  "xData": string;
  "yData": number;
  "yData2"?: number;
  "name": string;
  "rawData": Array;
  "color": string;
};

interface BarChartVerticalData {
  "xData": number;
  "yData": string;
  "name": string;
  "rawData": Array;
  "color": string;
};

interface SeparateReturn {
  percentage: number;
  conceptionTotal: number;
  inseminationTotal: number;
  animals: Reproduction[];
}

interface Protocolo {
  proCodigo?: number | string;
  ptlAtivo: boolean;
  ptlCodigo?: number;
  ptlData: Date | string ;
  ptlFabricante: string;
  ptlNome: string;
  ptlObs: string;
  fases: ProtocoloFase[];
}

interface ProtocoloFase {
  faseCodigo?: number;
  faseD: number;
  faseNome: string;
  itens: ProtocoloItem[];
  proCodigo?: number;
  ptlCodigo?: number;
}

interface ProtocoloItem {
  faseCodigo?: number;
  itemCodigo?: number;
  itemDesc: string;
  itemQtd: number;
  itemTipo: string;
  proCodigo?: number;
  vacCodigo: string;
}

interface VacinaCombo {
  value: string;
  valueKey: string | number;
}

interface Vacina {
  vacAtivo: number;
  vacCodigo: number;
  vacDescricao: string;
  vacDose: number;
  vacEstoque: number;
  vacFabricante: string;
  vacMedida: string;
  vacPrincipioAtivo: string;
  vacTipo: string;
  vacVlrDose: number;
}

interface ApiUsoProtocolo{
  proCodigo: string | null,
  ptlCodigo?:number,
  aptlData: string,
  animais: Animal[],
  fases: FasesProtocoloPayload[]
}

interface FasesProtocoloPayload {
  faseD: number,
  faseCodigo?: number,
  aptlfDataPrevista: string
}

interface Funcionario {
  id?: number;
  foto?: string;
  nome: string;
  nascimento: Dayjs | null;
  cpf: number | string;
  rg: string ;
  genero: string;
  obs: string;
  ativo: boolean;
  treinamento: boolean;
}

interface Professional {
  id?: number;
  foto?: string;
  nome: string;
  nascimento: Dayjs | null;
  cpf: number | string;
  rg: string ;
  genero: string;
  obs: string;
  ativo: boolean;
  treinamento: boolean;
}

interface CBO {
  id_cbo: number;
  cbo: string | number;
  cbo_id: number;
  nome_profissao: string;
}

interface Departamento {
  id_departamento: number;
  departamento_id: number;
  departamento_pai_id: number | null;
  nome_departamento: string;
  descricao_departamento: string | null;
  email_departamento: string | null;
  ramal: string | null;
  sigla: string;
  responsavel_id: number | null;
  empresa_id: number;
}

interface Cargo extends CBO, Departamento {
  id_cargo: number;
  descricao_cargo: string;
  nivel_hierarquico: string;
  tipo_contratacao: string;

  salario_base: string; // ou number se preferir
  jornada_semanal: number;

  adicional_insalubridade: string;
  adicional_periculosidade: string;
  outros_beneficios: string | null;

  ativo: boolean;

  vale_refeicao: boolean;
  vale_transporte: boolean;
}

interface Empresa {
  id_empresa?: number;
  cliente_id: number;

  razao_social: string;
  nome_fantasia?: string | null;
  cnpj?: string | null;
  inscricao_estadual?: string | null;
  inscricao_municipal?: string | null;
  cnae?: string | null;

  endereco?: string | null;
  numero?: string | null;
  complemento?: string | null;
  bairro?: string | null;
  cidade?: string | null;
  uf?: string | null;
  cep?: string | null;

  telefone?: string | null;
  email?: string | null;
  site?: string | null;

  responsavel_id?: number | null;
  ativo: boolean;
}