// TicketCardList.tsx
import type { Ticket } from '../types/ticket';
import TicketCard from './TicketCard';


interface Props {
  tickets: Ticket[];
  setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
  onChangeStatus: (id: string, novoStatus: Ticket['status']) => void;
  onTicketClick: (ticket: Ticket) => void; 
}

const TicketCardList = ({ tickets, setTickets, onChangeStatus, onTicketClick }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      {tickets.map(ticket => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          setTickets={setTickets}
          onChangeStatus={onChangeStatus}
          onTicketClick={onTicketClick} 
        />
      ))}
    </div>
  );
};

export default TicketCardList;
