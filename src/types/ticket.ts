export interface Ticket {
  id: string;
  titulo: string;
  status: 'aberto' | 'em progresso' | 'concluído';
  ultimaAtualizacao: string;
  descricao: string;
  criador: string;
  dataCriacao: string;
  comentarios: string[];
}
