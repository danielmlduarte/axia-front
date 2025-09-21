import { Dayjs } from "dayjs";

export interface Funcionario {
  id?: string;
  nome: string;
  foto?: string;
  nascimento: string | Date | Dayjs;
  genero: string;
  cpf: string;
  rg: string;
  obs?: string;
  ativo: boolean;
  treinamento: boolean;

  // Dados profissionais
  cargo?: string;
  departamento?: string;
  admissao?: string | Date | Dayjs;
  salario?: string;

  // Endereço
  logradouro?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
  uf?: string;
  cep?: string;

  // Contato
  telefone?: string;
  celular?: string;
  email?: string;
}
