import React from 'react';
import type { Ticket } from '../types/ticket';

interface TicketTableProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets, onTicketClick, onDelete }) => {
  return (
    <table className="w-full table-auto border border-collapse border-gray-300">
      <thead>
        <tr>
          <th className="border p-2">Título</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Última Atualização</th>
          <th className="border p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id} className="border-t">
            <td
              className="border p-2 text-blue-600 hover:underline cursor-pointer"
              onClick={() => onTicketClick(ticket)}
            >
              {ticket.titulo}
            </td>
            <td className="border p-2">{ticket.status}</td>
            <td className="border p-2">{ticket.ultimaAtualizacao}</td>
            <td className="border p-2">
              <button
                onClick={() => onDelete(ticket.id)}
                className="text-red-600 hover:underline"
              >
                Excluir
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketTable;
