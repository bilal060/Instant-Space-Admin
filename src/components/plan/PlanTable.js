import { useEffect } from 'react';
import Table from 'react-bootstrap/Table';
// import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getPlan } from '../../store/storeIndex';
// import { PaginationControl } from 'react-bootstrap-pagination-control';
// import ImageDisplay from '../../shared/Image';

function PlanTable() {
  const dispatch = useDispatch();
  // const [page, setPage] = useState(1);
  const plans = useSelector((state) => state.plan.plans);
  console.log(plans);
  // const pageHandler = (page) => {
  //   setPage(page);
  //   dispatch(getPlan());
  // };

  useEffect(() => {
    dispatch(getPlan());
  }, []);

  return (
    <div>
      <div className="NewSpace custom-table">
        <Table responsive hover className="mt-2" striped>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {plans?.map((item, index) => {
              return (
                <tr key={index} className="pt-3">
                  <td>{item?.name}</td>
                  <td>{item?.description}</td>
                  <td>{item?.price}</td>
                  <td className={item.free === true ? 'text-danger' : ''}>
                    {item?.free === true ? 'Paid' : 'Free'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {/* {plans?.totalRecords > 10 ? (
        <div className="d-flex justify-content-between align-items-center gap-3 mt-4">
          <p className="mb-0 font-weight-500 font-16 text-grey fst-italic">{`Showing ${plans?.limit} of ${plans?.totalRecords}`}</p>
          <PaginationControl
            page={page}
            between={3}
            total={plans.totalRecords}
            limit={plans.limit}
            changePage={(page) => pageHandler(page)}
            ellipsis={2}
          />
        </div>
      ) : (
        ''
      )} */}
    </div>
  );
}

export default PlanTable;
