import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from '../../store/storeIndex';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import ImageDisplay from '../../shared/Image';

function PaymentTable() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const token = useSelector((state) => state.user.token);
  const transactions = useSelector((state) => state.booking.transactions);
  const pageHandler = (page) => {
    setPage(page);
    dispatch(getAllTransactions(token, page));
  };

  useEffect(() => {
    dispatch(getAllTransactions(token, page));
  }, [token]);

  return (
    <div>
      <div className="NewSpace custom-table">
        <Table responsive hover className="mt-2" striped>
          <thead>
            <tr>
              <th>Customer Full Name</th>
              <th>Booking Category</th>
              <th>Booking Date</th>
              <th>Duration</th>
              <th>Total Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions?.earning.map((item, index) => {
              const bookingDate = new Date(item.createdAt);
              const options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              };
              const formattedBookingDate = bookingDate.toLocaleString('en-US', options);
              return (
                <tr key={index} className="pt-3">
                  <td>
                    <div className="d-flex align-items-center w-25 h-25 gap-2">
                      <ImageDisplay
                        src={`${process.env.REACT_APP_SERVER_URL}${item?.userId?.photo}`}
                        alt="user-image"
                        loading="lazy"
                        style={{ width: '40px', height: '40px', borderRadius: '6px' }}
                      />
                      <p className="p-0 m-0">{item.userId.fullName}</p>
                    </div>
                  </td>
                  <td>{item.bookingId.category} </td>
                  <td>
                    <p style={{ maxWidth: '120px', margin: '0' }}>{formattedBookingDate}</p>
                  </td>
                  <td>{item.bookingId.totalDuration}</td>
                  <td>{item.totalEarning}</td>
                  <td>
                    <Button
                      className={`custom-status ${
                        item.bookingId.status === 'rejected'
                          ? 'bg-lightRed'
                          : item.bookingId.status === 'pending'
                            ? 'bg-lightYellow'
                            : 'bg-lightgreen'
                      } unpaid rounded fw-bold text-capitalize`}
                      variant={`${
                        item.bookingId.status === 'rejected'
                          ? 'outline-danger'
                          : item.bookingId.status === 'pending'
                            ? 'outline-warning'
                            : 'outline-success'
                      } `}>
                      {item.bookingId.status}
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {transactions?.totalRecords > 10 ? (
        <div className="d-flex justify-content-between align-items-center gap-3 mt-4">
          <p className="mb-0 font-weight-500 font-16 text-grey fst-italic">{`Showing ${transactions?.limit} of ${transactions?.totalRecords}`}</p>
          <PaginationControl
            page={page}
            between={3}
            total={transactions.totalRecords}
            limit={transactions.limit}
            changePage={(page) => pageHandler(page)}
            ellipsis={2}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default PaymentTable;
