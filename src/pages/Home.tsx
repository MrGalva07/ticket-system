import { useState } from 'react';
import type { Ticket } from '../types/ticket';
import TicketTable from '../components/TicketTable';
import TicketModal from '../components/TicketModal';
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

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTicket((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const now = new Date().toISOString().split('T')[0];
  const ticketCompletado = {
    ...newTicket,
    id: uuidv4(),  // gera ID único string
    dataCriacao: now,
    ultimaAtualizacao: now,
  };
  setTickets([...tickets, ticketCompletado]);
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
};
const handleDeleteTicket = (id: string) => {
  setTickets(prevTickets => prevTickets.filter(ticket => ticket.id !== id));
    if (selectedTicket?.id === id) {
    setSelectedTicket(null);
  }

};
  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sistema de Tickets</h1>

      {!isFormVisible && (
        <button
          onClick={() => setIsFormVisible(true)}
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Criar Novo Ticket
        </button>
      )}

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
              Adicionar
            </button>
            <button type="button" onClick={() => setIsFormVisible(false)} className="px-4 py-2 bg-red-600 text-white rounded">
              Cancelar
            </button>
          </div>
        </form>
      )}

      <TicketTable tickets={tickets} onTicketClick={handleTicketClick} onDelete={handleDeleteTicket} />
      {selectedTicket && (
        <TicketModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}
    </div>
  );
};

export default Home;
