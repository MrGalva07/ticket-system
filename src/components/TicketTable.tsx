import React from 'react';
import type { Ticket, Status } from '../types/ticket';

interface TicketTableProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
  onChangeStatus: (id: string, novoStatus: Status) => void;
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets, onTicketClick, onDelete, onChangeStatus }) => {
  return (
    <table className="w-full table-auto border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border px-4 py-2">Título</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Última Atualização</th>
          <th className="border px-4 py-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2 cursor-pointer" onClick={() => onTicketClick(ticket)}>
              {ticket.titulo}
            </td>
            <td className="border px-4 py-2">
              <select
                value={ticket.status}
                onChange={(e) => onChangeStatus(ticket.id, e.target.value as Status)}
                className="border rounded p-1"
              >
                <option value="aberto">Aberto</option>
                <option value="em progresso">Em Progresso</option>
                <option value="concluído">Concluído</option>
              </select>
            </td>
            <td className="border px-4 py-2">{ticket.ultimaAtualizacao}</td>
            <td className="border px-4 py-2">
              <button onClick={() => onDelete(ticket.id)} className="text-red-600 hover:underline">Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TicketTable;
