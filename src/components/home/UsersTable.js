import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/css/table.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { getAllUsers } from '../../store/user/actions/actionCreators';

const UsersTable = ({ filterBy, page, short, setPage }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const users = useSelector((state) => state.user.users);

  useEffect(() => {
    dispatch(getAllUsers(token, page, filterBy));
  }, []);

  const pageHandler = (page) => {
    setPage(page);
    dispatch(getAllUsers(token, page, filterBy));
  };

  return (
    <div className="my-2">
      {users?.users?.length > 0 ? (
        <div className="NewSpace custom-table rounded-8px">
          <Table responsive hover striped className="m-0 min-w-850px">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Contact Info</th>
                <th>Contact Info</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(users.users).length > 0 && users.users.length > 0 && (
                <>
                  {short
                    ? users.users.slice(0, 5).map((item, index) => {
                        return (
                          <tr key={index} className="pt-3">
                            <td>
                              <div className="d-flex align-items-center w-25 h-25">
                                <Image
                                  src={`${process.env.REACT_APP_SERVER_URL}${item?.photo}`}
                                  className="table-pic-size rounded-1"
                                />
                                <p className="ps-3 p-0 m-0 tb-data">{item?.fullName}</p>
                              </div>
                            </td>
                            <td>
                              <p style={{ maxWidth: '210px', margin: '0' }}>{item.phoneNo}</p>
                            </td>
                            <td>
                              <p className="m-0">{item.role}</p>
                            </td>
                            <td>
                              <p>{item.gender}</p>
                            </td>
                            <td>
                              <p>{item.email}</p>
                            </td>
                            <td>
                              <Button
                                className={`custom-status ${
                                  item.status === 'rejected'
                                    ? 'bg-lightRed'
                                    : item.status === 'pending'
                                      ? 'bg-lightYellow'
                                      : 'bg-lightgreen'
                                } unpaid rounded fw-bold text-capitalize`}
                                variant={`${
                                  item.status === 'rejected'
                                    ? 'outline-danger'
                                    : item.status === 'pending'
                                      ? 'outline-warning'
                                      : 'outline-success'
                                } `}>
                                {item.status}
                              </Button>
                            </td>
                          </tr>
                        );
                      })
                    : users.users.map((item, index) => {
                        const fromDate = new Date(item.from);
                        const toDate = new Date(item.to);

                        const options = {
                          hour: 'numeric',
                          minute: 'numeric',
                          hour12: true,
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        };
                        const formattedFromDate = fromDate.toLocaleString('en-US', options);
                        const formattedToDate = toDate.toLocaleString('en-US', options);
                        return (
                          <tr key={index} className="pt-3">
                            <td>
                              <div className="d-flex align-items-center w-25 h-25">
                                <Image
                                  src={`${process.env.REACT_APP_SERVER_URL}${item.userId.photo}`}
                                  className="table-pic-size rounded-1"
                                />
                                <p className="ps-3 p-0 m-0 tb-data">{item.userId.fullName}</p>
                              </div>
                            </td>
                            <td>
                              <p style={{ maxWidth: '210px', margin: '0' }}>
                                {item.serviceId.address}
                              </p>
                            </td>
                            <td>
                              <p className="m-0">{item.serviceId.contact}</p>
                            </td>
                            <td>
                              <p style={{ maxWidth: '120px', margin: '0' }}>{formattedFromDate}</p>
                            </td>
                            <td>
                              <p style={{ maxWidth: '120px', margin: '0' }}>{formattedToDate}</p>
                            </td>
                            <td>
                              <p>{item.category}</p>
                            </td>
                            <td>
                              <p>${item.price}</p>
                            </td>
                            <td>
                              <Button
                                className={`custom-status ${
                                  item.status === 'rejected'
                                    ? 'bg-lightRed'
                                    : item.status === 'pending'
                                      ? 'bg-lightYellow'
                                      : 'bg-lightgreen'
                                } unpaid rounded fw-bold text-capitalize`}
                                variant={`${
                                  item.status === 'rejected'
                                    ? 'outline-danger'
                                    : item.status === 'pending'
                                      ? 'outline-warning'
                                      : 'outline-success'
                                } `}>
                                {item.status}
                              </Button>
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
              You don’t have any Booking Yet
            </p>
          </div>
        </div>
      )}
      {!short && users.totalRecords > 10 ? (
        <PaginationControl
          page={page}
          between={3}
          total={users.totalRecords}
          limit={users.limit}
          changePage={(page) => pageHandler(page)}
          ellipsis={1}
        />
      ) : (
        ''
      )}
    </div>
  );
};
export default UsersTable;
