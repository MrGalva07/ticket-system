import React, { useState } from 'react';
import type { Ticket } from '../types/ticket';

export interface TicketModalProps {
  ticket: Ticket;
  onClose: () => void;
  onEdit: (ticket: Ticket) => void;
  onAddComment: (ticketId: string, comment: string) => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ ticket, onClose, onEdit, onAddComment }) => {
  const [novoComentario, setNovoComentario] = useState('');

  const adicionarComentario = () => {
    if (!novoComentario.trim()) return;

    onAddComment(ticket.id, novoComentario); 
    setNovoComentario('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow max-w-lg w-full relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">X</button>

        <h2 className="text-xl font-bold mb-2">{ticket.titulo}</h2>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Criador:</strong> {ticket.criador}</p>
        <p><strong>Data de Criação:</strong> {ticket.dataCriacao}</p>
        <p className="mt-2"><strong>Descrição:</strong>{ticket.descricao}</p>

        <h3 className="text-lg font-semibold mt-4">Comentários</h3>
        <ul className="list-disc list-inside mb-2 max-h-40 overflow-y-auto">
          {ticket.comentarios.map((comentario, idx) => (
            <li key={idx}>{comentario}</li>
          ))}
        </ul>

        <div className="flex gap-2">
          <input
            type="text"
            value={novoComentario}
            onChange={(e) => setNovoComentario(e.target.value)}
            placeholder="Adicionar comentário..."
            className="flex-1 border p-2 rounded"
          />
          <button
            onClick={adicionarComentario}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Adicionar
          </button>
        </div>

        <div className="mt-4 text-right">
          <button
            onClick={() => onEdit(ticket)}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
