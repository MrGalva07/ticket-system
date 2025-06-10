import React, { useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { Status, Ticket } from '../types/ticket';
import { ConfirmationModal } from './ConfirmationModal';

interface TicketCardProps {
  ticket: Ticket;
  setTickets: Dispatch<SetStateAction<Ticket[]>>;
  onChangeStatus: (id: string, novoStatus: Status) => void;
  onTicketClick: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({
  ticket,
  onChangeStatus,
  onTicketClick,
  onDelete,
}) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status;
    onChangeStatus(ticket.id, newStatus);
  };

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 border border-gray-200 relative">
      <div className="flex justify-between items-center mb-2">
        <h2
          className="text-lg font-semibold text-blue-600 hover:text-blue-400 cursor-pointer"
          onClick={() => onTicketClick(ticket)}
        >
          {ticket.titulo}
        </h2>
        <select
          value={ticket.status}
          onChange={handleStatusChange}
          className="border border-gray-300 rounded px-2 py-1 text-sm ml-2"
        >
          <option value="aberto">Aberto</option>
          <option value="em progresso">Em progresso</option>
          <option value="concluído">Concluído</option>
        </select>
      </div>

      <p className="text-sm text-gray-600 mb-2">{ticket.descricao}</p>

      <div className="text-xs text-gray-500 space-y-1">
        <p>
          <strong>Criador:</strong> {ticket.criador}
        </p>
        <p>
          <strong>Criado em:</strong>{' '}
          {new Date(ticket.dataCriacao).toLocaleDateString()}
        </p>
        <p>
          <strong>Última atualização:</strong>{' '}
          {new Date(ticket.ultimaAtualizacao).toLocaleDateString()}
        </p>
        <p>
          <strong>Comentários:</strong> {ticket.comentarios.length}
        </p>
      </div>

      <button
        onClick={() => setShowConfirm(true)}
        className="mt-3 text-red-600 hover:text-red-800 text-sm font-medium transition"
      >
        Excluir Ticket
      </button>

      <ConfirmationModal
        isOpen={showConfirm}
        onConfirm={() => {
          onDelete(ticket.id);
          setShowConfirm(false);
        }}
        onCancel={() => setShowConfirm(false)}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir este ticket? Esta ação não pode ser desfeita."
      />
    </div>
  );
};