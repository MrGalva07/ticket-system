import { useState } from 'react';
import type { Ticket } from '../types/ticket';
import { v4 as uuidv4} from 'uuid';

interface TicketFormProps {
  onAdd: (ticket: Ticket) => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ onAdd }) => {
  const [form, setForm] = useState<Omit<Ticket, 'id' | 'ultimaAtualizacao'>>({
    titulo: '',
    status: 'aberto',
    descricao: '',
    criador: '',
    dataCriacao: '',
    comentarios: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const novoTicket: Ticket = {
      ...form,
      id: uuidv4(),
      ultimaAtualizacao: new Date().toISOString().split('T')[0],
    };
    onAdd(novoTicket);
    setForm({
      titulo: '',
      status: 'aberto',
      descricao: '',
      criador: '',
      dataCriacao: '',
      comentarios: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <div>
        <label className="block font-semibold">Título</label>
        <input
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Descrição</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Criador</label>
        <input
          name="criador"
          value={form.criador}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Data de Criação</label>
        <input
          name="dataCriacao"
          type="date"
          value={form.dataCriacao}
          onChange={handleChange}
          className="border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block font-semibold">Status</label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="border p-2 w-full"
        >
          <option value="aberto">Aberto</option>
          <option value="em progresso">Em Progresso</option>
          <option value="concluído">Concluído</option>
        </select>
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Criar Ticket
      </button>
    </form>
  );
};

export default TicketForm;
