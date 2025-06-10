import React, { useState } from 'react';
import type { Ticket, Status } from '../types/ticket';
import { GoTrash } from 'react-icons/go';
import { ConfirmationModal } from './ConfirmationModal'; 

interface TicketTableProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, novoStatus: Status) => void;
}

const TicketTable: React.FC<TicketTableProps> = ({ 
  tickets, 
  onTicketClick, 
  onDelete, 
  onChangeStatus 
}) => {
  const [ticketToDelete, setTicketToDelete] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = (id: string) => {
    setTicketToDelete(id);
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    if (ticketToDelete) {
      onDelete(ticketToDelete);
    }
    setShowConfirm(false);
    setTicketToDelete(null);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
    setTicketToDelete(null);
  };

  return (
    <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200 w-full">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        {/* Cabeçalho da tabela  */}
        <thead className="bg-blue-950 text-white uppercase text-xs font-semibold">
          <tr>
            <th className="px-4 py-3 text-left">ID</th>
            <th className="px-4 py-3 text-left">Título</th>
            <th className="px-4 py-3 text-left">Status</th>
            <th className="px-4 py-3 text-left">Última Atualização</th>
            <th className="px-6 py-3 text-left"><GoTrash className='size-5' /></th>
          </tr>
        </thead>

        {/* Corpo da tabela */}
        <tbody className="text-gray-700">
          {tickets.map((ticket) => (
            <tr key={ticket.id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 truncate max-w-[150px] text-xs text-gray-500">{ticket.id}</td>
              <td
                className="px-4 py-2 font-medium text-blue-600 hover:text-blue-400 cursor-pointer hover:underline"
                onClick={() => onTicketClick(ticket)}
              >
                {ticket.titulo}
              </td>
              <td className="px-4 py-2">
                <select
                  value={ticket.status}
                  onChange={(e) => onChangeStatus(ticket.id, e.target.value as Status)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="aberto">Aberto</option>
                  <option value="em progresso">Em Progresso</option>
                  <option value="concluído">Concluído</option>
                </select>
              </td>
              <td className="px-4 py-2 text-sm">{ticket.ultimaAtualizacao}</td>
              <td className="px-4 py-2">
                <button
                  onClick={() => handleDeleteClick(ticket.id)}
                  className="text-red-600 hover:text-red-800 text-sm font-medium transition"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de Confirmação */}
      <ConfirmationModal
        isOpen={showConfirm}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        title="Confirmar exclusão"
        message="Tem certeza que deseja excluir este ticket? Esta ação não pode ser desfeita."
      />
    </div>
  );
};

export default TicketTable;