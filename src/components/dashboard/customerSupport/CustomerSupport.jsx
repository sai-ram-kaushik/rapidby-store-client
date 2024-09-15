import axios from "axios";
import React, { useEffect, useState } from "react";

const CustomerSupport = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [ticketCount, setTicketCount] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedTickets, setSelectedTickets] = useState([]); // For selected checkboxes

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/get-all-tickets`)
      .then((response) => {
        setTickets(response.data.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/get-ticket-count`
      )
      .then((response) => {
        setTicketCount(response.data.data);
      });
  }, []);

  const handleRowClick = (ticket) => {
    setSelectedTicket(ticket);
    setIsChatOpen(true);
  };

  const handleActionClick = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const updateTicketStatus = (ticketId, status) => {
    axios
      .put(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/update-ticket-status/${ticketId}`,
        {
          status: status,
        }
      )
      .then((response) => {
        setTickets((prevTickets) =>
          prevTickets.map((ticket) =>
            ticket._id === ticketId ? { ...ticket, status: status } : ticket
          )
        );
        setOpenDropdown(null);
      });
  };

  const sendReply = (ticketId) => {
    if (!replyMessage.trim()) return;

    axios
      .post(
        `${import.meta.env.VITE_API_ENDPOINT_URI}/api/store/${ticketId}/reply-to-ticket`,
        {
          message: replyMessage,
        }
      )
      .then((response) => {
        setSelectedTicket((prevTicket) => ({
          ...prevTicket,
          messages: [
            ...prevTicket.messages,
            { message: replyMessage, sender: "You", timestamp: new Date() },
          ],
        }));

        setReplyMessage("");
      })
      .catch((error) => {
        console.error("There was an error sending the reply!", error);
      });
  };

  const closeChatPanel = () => {
    setIsChatOpen(false);
    setSelectedTicket(null);
  };

  // Handle checkbox selection
  const handleCheckboxChange = (ticketId) => {
    if (selectedTickets.includes(ticketId)) {
      setSelectedTickets(selectedTickets.filter((id) => id !== ticketId));
    } else {
      setSelectedTickets([...selectedTickets, ticketId]);
    }
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="bg-white border-b border-gray-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center rounded-xl">
        <h2 className="text-lg font-semibold mb-2 sm:mb-0">Tickets</h2>
        <ul className="flex flex-wrap space-x-4">
          <li className="text-purple-600 font-semibold cursor-pointer">
            All({ticketCount.totalTickets})
          </li>
          <li className="cursor-pointer">Open({ticketCount.openTickets})</li>
          <li className="cursor-pointer">
            In Process({ticketCount.inProcessTickets})
          </li>
          <li className="cursor-pointer">
            Closed({ticketCount.closedTickets})
          </li>
        </ul>
      </div>

      <div
        className={`flex-grow flex ${selectedTicket ? "lg:flex-row" : "flex-col"}`}
      >
        <div
          className={`${selectedTicket ? "lg:w-3/5" : "w-full"} p-4 sm:p-6 bg-gray-50 rounded-xl`}
        >
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-100">
                <tr className="text-left text-sm font-semibold text-gray-600">
                  <th className="p-4">
                    {/* Checkbox column */}
                    <input
                      type="checkbox"
                      onChange={(e) => {
                        const isChecked = e.target.checked;
                        if (isChecked) {
                          setSelectedTickets(
                            tickets.map((ticket) => ticket._id)
                          );
                        } else {
                          setSelectedTickets([]);
                        }
                      }}
                      checked={
                        selectedTickets.length === tickets.length &&
                        tickets.length > 0
                      }
                    />
                  </th>
                  <th className="p-4">Ticket ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Order Date/Time</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket, index) => (
                  <tr
                    key={index}
                    className={`text-sm text-gray-700 border-b hover:bg-gray-50 cursor-pointer ${
                      selectedTicket && selectedTicket._id === ticket._id
                        ? "bg-gray-100"
                        : ""
                    }`}
                    onClick={() => handleRowClick(ticket)}
                  >
                    <td className="p-4">
                      {/* Individual checkbox for each ticket */}
                      <input
                        type="checkbox"
                        checked={selectedTickets.includes(ticket._id)} // Only check the box if the ticket is selected
                        onChange={(e) => {
                          e.stopPropagation(); // Prevent row click when checking the box
                          handleCheckboxChange(ticket._id);
                        }}
                      />
                    </td>
                    <td className="p-4">#{ticket._id.slice(18, 24)}</td>
                    <td className="p-4">{ticket.name}</td>
                    <td className="p-4">{ticket.subject}</td>
                    <td className="p-4">
                      <span
                        className={`py-1 px-2 rounded-full ${
                          ticket.status === "Open"
                            ? "bg-red-100 text-red-700"
                            : ticket.status === "In Process"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-4">{ticket.updatedAt}</td>
                    <td className="p-4 text-right relative">
                      <button
                        className="text-gray-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleActionClick(index);
                        }}
                      >
                        ...
                      </button>
                      {openDropdown === index && (
                        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                          <button
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() =>
                              updateTicketStatus(ticket._id, "In Process")
                            }
                          >
                            In Process
                          </button>
                          <button
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                            onClick={() =>
                              updateTicketStatus(ticket._id, "Closed")
                            }
                          >
                            Closed
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {selectedTicket && isChatOpen && (
          <div className="lg:w-2/5 p-4 sm:p-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200 flex flex-col justify-between h-full">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedTicket.name}</h3>
                <p className="text-sm text-gray-600">
                  Ticket ID: {selectedTicket._id.slice(18, 24)}
                </p>
              </div>
              <button className="text-gray-600" onClick={closeChatPanel}>
                X
              </button>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mb-4 flex-grow overflow-auto">
              <h4 className="font-semibold mb-2">{selectedTicket.subject}</h4>
              <div className="text-sm text-gray-700 space-y-2">
                {selectedTicket.messages.map((msg, idx) => (
                  <p
                    key={idx}
                    className={`p-2 rounded-lg ${
                      msg.sender === "You"
                        ? "bg-purple-600 text-white text-right"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <strong>{msg.sender}:</strong> {msg.message}
                  </p>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                {selectedTicket.orderDate}
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type here..."
                className="border p-2 rounded-lg flex-1"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
              />
              <button
                className="bg-purple-600 text-white p-2 rounded-lg"
                onClick={() => sendReply(selectedTicket._id)}
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerSupport;
