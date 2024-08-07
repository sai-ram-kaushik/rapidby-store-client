import React, { useState } from "react";

const sampleTickets = Array(10)
  .fill()
  .map((_, index) => ({
    id: `#Z58SJL${index + 1}`,
    name: "Samuel Badri",
    subject: `Item not shipped ${index + 1}`,
    status:
      index % 3 === 0 ? "Open" : index % 3 === 1 ? "In Process" : "Closed",
    orderDate: `Jan 12, 12:23 pm`,
    details: `Dear customer service, I recently purchased a mouse from your website on 11th Jan, but I have yet to receive a delivery. Could you please provide an update on the status of my order? Thank you.`,
    response: `Sorry for the inconvenience faced by you! We are looking into the matter and will get back to you soon. Thank you for the patience.`,
  }));

const CustomerSupport = () => {
  const [selectedTicket, setSelectedTicket] = useState(sampleTickets[0]);

  const handleRowClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-white border-b border-gray-200 p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-lg font-semibold mb-2 sm:mb-0">Tickets</h2>
        <ul className="flex flex-wrap space-x-4">
          <li className="text-purple-600 font-semibold cursor-pointer">
            All(170)
          </li>
          <li className="cursor-pointer">Open(60)</li>
          <li className="cursor-pointer">In Process(60)</li>
          <li className="cursor-pointer">Closed(50)</li>
        </ul>
      </div>

      <div className="flex-grow flex flex-col lg:flex-row">
        <div className="lg:w-3/5 p-4 sm:p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <input
                type="text"
                placeholder="Search"
                className="border p-2 rounded-lg w-full sm:w-80"
              />
              <button className="bg-gray-200 text-sm text-gray-700 p-2 rounded-lg">
                Sort By
              </button>
            </div>
            <button className="bg-purple-600 text-white p-2 rounded-lg">
              Resolve
            </button>
          </div>
          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full min-w-max">
              <thead className="bg-gray-100">
                <tr className="text-left text-sm font-semibold text-gray-600">
                  <th className="p-4">Ticket ID</th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Subject</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Order Date/Time</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {sampleTickets.map((ticket, index) => (
                  <tr
                    key={index}
                    className={`text-sm text-gray-700 border-b hover:bg-gray-50 cursor-pointer ${
                      selectedTicket.id === ticket.id ? "bg-gray-100" : ""
                    }`}
                    onClick={() => handleRowClick(ticket)}
                  >
                    <td className="p-4">{ticket.id}</td>
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
                    <td className="p-4">{ticket.orderDate}</td>
                    <td className="p-4 text-right">
                      <button className="text-gray-600">...</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 bg-gray-100">
              <p className="text-sm text-gray-600 mb-2 sm:mb-0">
                Page 1 of 3 (Showing 1-10)
              </p>
              <div className="flex space-x-2">
                <button className="text-gray-600 text-sm">Previous</button>
                <button className="text-gray-600 text-sm">Next</button>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:w-2/5 p-4 sm:p-6 bg-white border-t lg:border-t-0 lg:border-l border-gray-200">
          {selectedTicket ? (
            <>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{selectedTicket.name}</h3>
                <p className="text-sm text-gray-600">
                  Ticket ID: {selectedTicket.id}
                </p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg mb-4">
                <h4 className="font-semibold mb-2">{selectedTicket.subject}</h4>
                <p className="text-sm text-gray-700">
                  {selectedTicket.details}
                </p>
                <p className="text-xs text-gray-500 mt-4">
                  {selectedTicket.orderDate}
                </p>
              </div>

              <div className="bg-blue-500 text-white p-4 rounded-lg mb-4">
                <p className="text-sm">{selectedTicket.response}</p>
                <p className="text-xs text-gray-200 mt-4">
                  {selectedTicket.orderDate}
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type here..."
                  className="border p-2 rounded-lg flex-1"
                />
                <button className="bg-purple-600 text-white p-2 rounded-lg">
                  Send
                </button>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-600">
              Select a ticket to view details
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
