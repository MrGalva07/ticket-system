import { useState } from 'react';
import type { Ticket } from '../types/ticket';
import TicketTable from '../components/TicketTable';
import TicketModal from '../components/TicketModal';
import TicketCardList from '../components/TicketCardList'; // novo
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: uuidv4(),
      titulo: 'Erro no login',
      status: 'aberto',
      ultimaAtualizacao: '2025-06-06',
      descricao: 'Usuário não consegue fazer login.',
      criador: 'João',
      dataCriacao: '2025-06-01',
      comentarios: ['Verifiquei o backend', 'Reiniciei o servidor']
    },
    {
      id: uuidv4(),
      titulo: 'Página travando',
      status: 'em progresso',
      ultimaAtualizacao: '2025-06-05',
      descricao: 'A página de cadastro está travando.',
      criador: 'Maria',
      dataCriacao: '2025-06-02',
      comentarios: ['Ajustando a validação']
    }
  ]);

  const [newTicket, setNewTicket] = useState<Ticket>({
    id: '',
    titulo: '',
    status: 'aberto',
    ultimaAtualizacao: '',
    descricao: '',
    criador: '',
    dataCriacao: '',
    comentarios: []
  });

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'aberto' | 'em progresso' | 'concluído'>('todos');

  const ticketsFiltrados = filtroStatus === 'todos' ? tickets : tickets.filter(t => t.status === filtroStatus);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleEdit = (ticket: Ticket) => {
    setNewTicket(ticket);
    setIsFormVisible(true);
    setIsEditing(true);
    setSelectedTicket(null);
  };

  const handleDeleteTicket = (id: string) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
    if (selectedTicket?.id === id) setSelectedTicket(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const getHoje = () => new Date().toLocaleDateString('pt-BR');

    if (isEditing) {
      const updatedTickets = tickets.map((t) =>
        t.id === newTicket.id
          ? { ...newTicket, ultimaAtualizacao: getHoje() }
          : t
      );
      setTickets(updatedTickets);
    } else {
      const novoTicket = {
        ...newTicket,
        id: uuidv4(),
        dataCriacao: getHoje(),
        ultimaAtualizacao: getHoje(),
      };
      setTickets([...tickets, novoTicket]);
    }

    setNewTicket({
      id: '',
      titulo: '',
      status: 'aberto',
      ultimaAtualizacao: '',
      descricao: '',
      criador: '',
      dataCriacao: '',
      comentarios: []
    });
    setIsFormVisible(false);
    setIsEditing(false);
  };

  const handleChangeStatus = (id: string, novoStatus: 'aberto' | 'em progresso' | 'concluído') => {
    const getHoje = () => new Date().toLocaleDateString('pt-BR');
    setTickets(prevTickets =>
      prevTickets.map(ticket =>
        ticket.id === id
          ? { ...ticket, status: novoStatus, ultimaAtualizacao: getHoje() }
          : ticket
      )
    );
  };

  const handleAddComment = (ticketId: string, comment: string) => {
    const getHoje = () => new Date().toLocaleDateString('pt-BR');
    setTickets(prev =>
      prev.map(t =>
        t.id === ticketId
          ? {
              ...t,
              comentarios: [...t.comentarios, comment],
              ultimaAtualizacao: getHoje()
            }
          : t
      )
    );

    if (selectedTicket?.id === ticketId) {
      setSelectedTicket(prev => prev && {
        ...prev,
        comentarios: [...prev.comentarios, comment],
        ultimaAtualizacao: getHoje()
      });
    }
  };

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-center">-Sistema de Tickets-</h1>

      {/* Filtro e botão responsivo */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        {!isFormVisible && (
         <button
  onClick={() => setIsFormVisible(true)}
  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors duration-200"
>
  Criar Novo Ticket
</button>
        )}
        <div>
          <label htmlFor="filtroStatus" className="mr-2 font-semibold">Filtrar por status:</label>
          <select
            id="filtroStatus"
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value as any)}
            className="border p-2 rounded text-sm"
          >
            <option value="todos">Todos</option>
            <option value="aberto">Aberto</option>
            <option value="em progresso">Em Progresso</option>
            <option value="concluído">Concluído</option>
          </select>
        </div>
      </div>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="mb-4 p-4 border border-gray-300 rounded">
          <div className="mb-2">
            <label htmlFor="titulo">Título</label>
            <input
              type="text"
              name="titulo"
              value={newTicket.titulo}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="descricao">Descrição</label>
            <textarea
              name="descricao"
              value={newTicket.descricao}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="criador">Criador</label>
            <input
              type="text"
              name="criador"
              value={newTicket.criador}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
              {isEditing ? 'Salvar Edição' : 'Adicionar'}
            </button>
            <button
              type="button"
              onClick={() => { setIsFormVisible(false); setIsEditing(false); }}
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {/* Renderiza responsivo: Tabela em desktop, Card em mobile */}
      <div className="hidden sm:block">
        <TicketTable
          tickets={ticketsFiltrados}
          onTicketClick={handleTicketClick}
          onDelete={handleDeleteTicket}
          onChangeStatus={handleChangeStatus}
        />
      </div>

      <div className="block sm:hidden">
        <TicketCardList
          tickets={ticketsFiltrados}
          setTickets={setTickets}
          onChangeStatus={handleChangeStatus}
          onTicketClick={handleTicketClick}
        />
      </div>

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onEdit={handleEdit}
          onAddComment={handleAddComment}
        />
      )}

      
    </div>
  );
};

export default Home;
