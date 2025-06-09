export type Status = 'aberto' | 'em progresso' | 'concluído';

export interface Ticket {
  id: string;
  titulo: string;
  status: Status;
  ultimaAtualizacao: string;
  descricao: string;
  criador: string;
  dataCriacao: string;
  comentarios: string[];
}
