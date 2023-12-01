import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerManagers } from '../../store/storeIndex';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { getAllBookings } from '../../store/booking/actions/actionCreators';

function PaymentHistoryTable({ dayValue, page, short, filterState, setPage }) {
  const pageHandler = (page) => {
    setPage(page);
    dispatch(getOwnerManagers(token, page));
  };
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const userId = useSelector((state) => state.user.user._id);
  const bookings = useSelector((state) => state.booking.bookings);
  const userRole = useSelector((state) => state.user.user.role);

  useEffect(() => {
    dispatch(getAllBookings(userId, token, userRole, page, filterState, dayValue));
  }, []);

  // const [currentPage] = useState(1);
  // const recordsPerPage = 10;

  // useEffect(() => {
  //   dispatch(getOwnerManagers(token));
  // }, [token]);

  // const data =
  //   Object.keys(managers).length > 0 && managers?.managers.length > 0 ? managers.managers : [];

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  // const indexOfLastRecord = currentPage * recordsPerPage;
  // const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="bg-white rounded custom-table">
      {bookings?.bookings?.length > 0 ? (
        <div className="NewSpace custom-table">
          <Table responsive hover striped className="m-0 min-w-850px">
            <thead>
              <tr>
                <th>Date of Payment</th>
                <th>Total Amount</th>
                <th>Space Type</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(bookings.bookings).length > 0 && bookings.bookings.length > 0 && (
                <>
                  {bookings.bookings.map((item, index) => {
                    const fromDate = new Date(item.createdAt);

                    const options = {
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    };
                    const formattedFromDate = fromDate.toLocaleString('en-US', options);
                    return (
                      <tr key={index} className="pt-3">
                        <td>
                          <p style={{ maxWidth: '120px', margin: '0' }}>{formattedFromDate}</p>
                        </td>
                        <td>
                          <p>${item.price}</p>
                        </td>
                        <td>
                          <p>{item.category}</p>
                        </td>
                      </tr>
                    );
                  })}
                </>
              )}
            </tbody>
          </Table>
        </div>
      ) : (
        <div className="NewSpace p-4">
          <div className="d-flex justify-content-center align-items-center pt-5 pb-3 w-100 flex-column">
            <p className="mb-3 auth-special font-weight-700 font-24">opps!</p>
            <p className="mb-5 font-24 font-weight-500 text-center">
              You don’t have any Payment Yet
            </p>
          </div>
        </div>
      )}
      {!short && bookings.totalRecords > 10 ? (
        <PaginationControl
          page={page}
          between={3}
          total={bookings.totalRecords}
          limit={bookings.limit}
          changePage={(page) => pageHandler(page)}
          ellipsis={1}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default PaymentHistoryTable;
