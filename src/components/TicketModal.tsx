import React from 'react';
import type { Ticket } from '../types/ticket';

interface TicketModalProps {
  ticket: Ticket | null;
  onClose: () => void;
}

const TicketModal: React.FC<TicketModalProps> = ({ ticket, onClose }) => {
  if (!ticket) return null; // Não renderiza nada se não tiver ticket

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">{ticket.titulo}</h2>
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Descrição:</strong> {ticket.descricao}</p>
        <p><strong>Criador:</strong> {ticket.criador}</p>
        <p><strong>Data de Criação:</strong> {ticket.dataCriacao}</p>
        <p><strong>Última Atualização:</strong> {ticket.ultimaAtualizacao}</p>
        <div className="mt-4">
          <strong>Comentários:</strong>
          <ul className="list-disc list-inside">
            {ticket.comentarios.map((comentario, index) => (
              <li key={index}>{comentario}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TicketModal;
