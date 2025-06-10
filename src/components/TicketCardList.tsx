import type { Ticket } from '../types/ticket';
import { TicketCard } from './TicketCard';
import type { Dispatch, SetStateAction } from 'react';

interface Props {
  tickets: Ticket[];
  setTickets: Dispatch<SetStateAction<Ticket[]>>;
  onChangeStatus: (id: string, novoStatus: Ticket['status']) => void;
  onTicketClick: (ticket: Ticket) => void;
  onDelete: (id: string) => void;
}

export const TicketCardList = ({
  tickets,
  setTickets,
  onChangeStatus,
  onTicketClick,
  onDelete,
}: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          setTickets={setTickets}
          onChangeStatus={onChangeStatus}
          onTicketClick={onTicketClick}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};