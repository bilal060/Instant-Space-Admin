import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Dropdown, Image, Modal } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { deleteManager, getOwnerManagers } from '../../store/storeIndex';
import { PaginationControl } from 'react-bootstrap-pagination-control';
import threeDots from '../../assets/images/icons/threeDots.svg';
import '../../assets/css/loading.css';
import ImageDisplay from '../../shared/Image';
function ManagerTable(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [deleteManagerId, setDeleteManagerId] = useState('');
  const userId = useSelector((state) => state.user.user._id);
  const managers = useSelector((state) => state.user.managers);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const deleteSpaceHandler = (id) => {
    setDeleteManagerId(id);
    handleShow();
  };
  const confirmDeleteHandler = () => {
    dispatch(deleteManager(userId, deleteManagerId, handleClose));
  };
  const pageHandler = (page) => {
    setPage(page);
    dispatch(getOwnerManagers(page));
  };
  useEffect(() => {
    dispatch(getOwnerManagers());
  }, [dispatch]);

  return (
    <div className="bg-white rounded custom-table">
      {Object.keys(managers).length > 0 && managers.managers.length ? (
        <Table responsive hover className="mt-2" striped>
          <thead>
            <tr>
              <th>Manager Full Name</th>
              <th>Branch Location</th>
              <th>Shift Time Slot</th>
              <th>Contact Info</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(managers).length > 0 &&
              managers.managers.length > 0 &&
              managers.managers.map((item, index) => (
                <tr key={index} className="pt-3">
                  <td>
                    <div className="d-flex align-items-center w-25 h-25">
                      <ImageDisplay
                        src={`${process.env.REACT_APP_SERVER_URL}${item.photo}`}
                        alt="user-image"
                        loading="lazy"
                        style={{ width: '40px', height: '40px', borderRadius: '6px' }}
                      />
                      <p className="p-0 ms-2">{item.firstName}</p>
                    </div>
                  </td>
                  <td>{item?.branch?.address}</td>
                  <td>{`${item.slot.from} to ${item.slot.to}`}</td>
                  <td>{item.phoneNo}</td>
                  <td>
                    {item.isTrue ? (
                      <Button
                        className="custom-status bg-lightgreen paid rounded fw-bold "
                        variant="outline-success">
                        {`Active`}
                      </Button>
                    ) : (
                      <Button
                        className="custom-status bg-secondary1 unpaid rounded fw-bold"
                        variant="outline-danger">
                        {`Unavailable`}
                      </Button>
                    )}
                  </td>
                  <td className=" >!py-5 text-end">
                    <div className="threeDots-dropdown">
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">
                          <Image alt="gallery" src={threeDots} className=" pe-2" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => deleteSpaceHandler(props.id)}>
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                      <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        className="delete-modal">
                        <Modal.Header closeButton>
                          <Modal.Title>
                            <div className="fw-bold">Delete Space</div>
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <div className="fs-4">Are you sure you want to delete the space?</div>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Cancel
                          </Button>
                          <Button variant="danger" onClick={confirmDeleteHandler}>
                            Confirm
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      ) : (
        <div className="NewSpace p-4">
          <div className="d-flex justify-content-center align-items-center pt-5 pb-3 w-100 flex-column">
            <p className="mb-3 auth-special font-weight-700 font-24">opps!</p>
            <p className="mb-5 font-24 font-weight-500 text-center">{props.emptyDataMsg}</p>
          </div>
        </div>
      )}
      {managers.totalRecords > 10 ? (
        <div className="d-flex justify-content-between align-items-center gap-3">
          <p className="mb-0 font-weight-500 font-16 text-grey fst-italic">{`Showing ${managers.limit} of ${managers.totalRecords}`}</p>
          <PaginationControl
            page={page}
            between={3}
            total={managers.totalRecords}
            limit={managers.limit}
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

export default ManagerTable;
