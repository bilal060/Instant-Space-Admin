import Table from 'react-bootstrap/Table';
import { Button, Dropdown, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import '../../assets/css/table.css';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import { UpdateUserStatus, getAllUsers } from '../../store/user/actions/actionCreators';
import threeDots from '../../assets/images/icons/threeDots.svg';
import ImageDisplay from '../../shared/Image';

const UsersTable = ({ filterBy, page, short, setPage }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const users = useSelector((state) => state.user.users);

  const pageHandler = (page) => {
    setPage(page);
    dispatch(getAllUsers(token, page, filterBy));
  };

  const UpdateUser = (userId, status) => {
    const data = {
      active: status
    };
    dispatch(UpdateUserStatus(userId, token, data, filterBy, page));
  };

  return (
    <div className="pt-4 px-0">
      {users?.data?.users?.length > 0 ? (
        <div className="NewSpace custom-table rounded-8px">
          <Table responsive hover striped className="m-0 min-w-850px rounded-8px">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Contact Info</th>
                <th>Role</th>
                {filterBy === 'Manager' && (
                  <>
                    <th>Slot</th>
                  </>
                )}
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(users.data.users).length > 0 && users.data.users.length > 0 && (
                <>
                  {short
                    ? users.data.users.slice(0, 5).map((item, index) => {
                        return (
                          <tr key={index} className="pt-3">
                            <td>
                              <div className="d-flex align-items-center">
                                <ImageDisplay
                                  src={`${process.env.REACT_APP_SERVER_URL}${item.photo}`}
                                  alt="user-image"
                                  loading="lazy"
                                  style={{ width: '40px', height: '40px', borderRadius: '6px' }}
                                />
                                <p className="ps-3 p-0 m-0 tb-data">
                                  {item?.fullName ||
                                    `${item.firstName} ${item.lastName}` ||
                                    item.companyName}
                                </p>
                              </div>
                            </td>
                            <td>
                              <p style={{ maxWidth: '210px', margin: '0' }}>
                                {item.phoneNo || item.email}
                              </p>
                            </td>
                            <td>
                              <p className="m-0">{item.role}</p>
                            </td>
                            {filterBy === 'Manager' && (
                              <td>{`${item.slot?.from} to ${item.slot?.to}`}</td>
                            )}
                            <td>
                              <Button
                                className={`custom-status ${
                                  item.active === false ? 'bg-lightRed' : 'bg-lightgreen'
                                } unpaid rounded fw-bold text-capitalize`}
                                variant={`${
                                  item.active === false ? 'outline-danger' : 'outline-success'
                                } `}>
                                {item.active ? 'Active' : 'InActive'}
                              </Button>
                            </td>
                            <td className="text-end">
                              <div className="threeDots-dropdown">
                                <Dropdown>
                                  <Dropdown.Toggle id="dropdown-basic" className="border-0">
                                    <Image alt="gallery" src={threeDots} className=" pe-3" />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => UpdateUser(item._id, true)}>
                                      Active
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => UpdateUser(item._id, false)}>
                                      InActive
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    : users.data.users.map((item, index) => {
                        return (
                          <tr key={index} className="pt-3">
                            <td>
                              <div className="d-flex align-items-center">
                                <ImageDisplay
                                  src={`${process.env.REACT_APP_SERVER_URL}${item.photo}`}
                                  alt="user-image"
                                  loading="lazy"
                                  style={{ width: '40px', height: '40px', borderRadius: '6px' }}
                                />
                                <p className="ps-3 p-0 m-0 tb-data">
                                  {item?.fullName ||
                                    `${item.firstName} ${item.lastName}` ||
                                    item.companyName}
                                </p>
                              </div>
                            </td>
                            <td>
                              <p style={{ maxWidth: '210px', margin: '0' }}>
                                {item.phoneNo || item.email}
                              </p>
                            </td>
                            <td>
                              <p className="m-0">{item.role}</p>
                            </td>
                            {filterBy === 'Manager' && (
                              <td>{`${item.slot?.from} to ${item.slot?.to}`}</td>
                            )}
                            <td>
                              <Button
                                className={`custom-status ${
                                  item.active === false ? 'bg-lightRed' : 'bg-lightgreen'
                                } unpaid rounded fw-bold text-capitalize`}
                                variant={`${
                                  item.active === false ? 'outline-danger' : 'outline-success'
                                } `}>
                                {item.active ? 'Active' : 'InActive'}
                              </Button>
                            </td>
                            <td className="text-end">
                              <div className="threeDots-dropdown">
                                <Dropdown>
                                  <Dropdown.Toggle id="dropdown-basic" className="border-0">
                                    <Image alt="gallery" src={threeDots} className=" pe-3" />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => UpdateUser(item._id, true)}>
                                      Active
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={() => UpdateUser(item._id, false)}>
                                      InActive
                                    </Dropdown.Item>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
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
        <div className="d-flex justify-content-between align-items-center gap-3 mt-4">
          <p className="mb-0 font-weight-500 font-16 text-grey fst-italic">{`Showing ${users.limit} of ${users.totalRecords}`}</p>
          <PaginationControl
            page={page}
            between={3}
            total={users.totalRecords}
            limit={users.limit}
            changePage={(page) => pageHandler(page)}
            ellipsis={1}
          />
        </div>
      ) : (
        ''
      )}
    </div>
  );
};
export default UsersTable;
