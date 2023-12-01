import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Button, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getOwnerManagers } from '../../store/storeIndex';
import { PaginationControl } from 'react-bootstrap-pagination-control';

function PaymentTable() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const token = useSelector((state) => state.user.token);
  const managers = useSelector((state) => state.user.managers);

  const pageHandler = (page) => {
    setPage(page);
    dispatch(getOwnerManagers(token, page));
  };

  const [currentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    dispatch(getOwnerManagers(token));
  }, [token]);

  const data =
    Object.keys(managers).length > 0 && managers?.managers.length > 0 ? managers.managers : [];

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber);
  // };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);

  return (
    <div className="bg-white rounded custom-table">
      <Table responsive hover className="mt-2" striped>
        <thead>
          <tr>
            <th>Customer Full Name</th>
            <th>Branch Location</th>
            <th>Contact Info</th>
            <th>From</th>
            <th>To</th>
            <th>Space Type</th>
            <th>Total Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentRecords.map((item, index) => (
            <tr key={index} className="pt-3">
              <td>
                <div className="d-flex align-items-center w-25 h-25">
                  <Image
                    src={`${process.env.REACT_APP_SERVER_URL}${item.photo}`}
                    className="table-pic-size"
                  />
                  <p className="p-0 m-0">{item.fullName}</p>
                </div>
              </td>
              <td>{item.branch.description}</td>
              <td>{item.phoneNo}</td>
              <td>{item.slot.from}</td>
              <td>{item.slot.to}</td>
              <td>{item.type}</td>
              <td>{item.amount}</td>
              <td>
                {item.status === 'Paid' ? (
                  <Button
                    className="custom-status bg-lightgreen paid rounded fw-bold "
                    variant="outline-success">
                    {item.status}
                  </Button>
                ) : (
                  <Button
                    className="custom-status bg-lightRed unpaid rounded fw-bold"
                    variant="outline-danger">
                    {item.status}
                  </Button>
                )}
              </td>
              <td className=" >!py-5 text-end">
                <a href="#" className="btn btn-sm btn-icon btn-active-color-primary ">
                  <Image src={item.threeDots} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {managers.totalRecords > 10 ? (
        <PaginationControl
          page={page}
          between={3}
          total={managers.totalRecords}
          limit={managers.limit}
          changePage={(page) => pageHandler(page)}
          ellipsis={2}
        />
      ) : (
        ''
      )}
    </div>
  );
}

export default PaymentTable;
