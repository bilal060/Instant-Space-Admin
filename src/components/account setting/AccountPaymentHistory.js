import React, { useState } from 'react';
import PaymentHistoryTable from './PaymentHistoryTable.js';
import MyDropDown from '../../pages/MyDropDown.js';
import DatePicker from 'react-multi-date-picker';

const AccountPaymentHistory = () => {
  const [dayValue, setDayValue] = useState();
  const [page, setPage] = useState(1);
  const [filterState, setFilterState] = useState('all');

  const filterableCategories = [
    {
      value: 'upcoming',
      name: 'upcoming'
    },
    {
      value: 'pending',
      name: 'pending'
    }
  ];
  const filterSpaceHandler = (filterBy) => {
    setFilterState(filterBy);
  };
  return (
    <div>
      <div className="content-head d-flex flex-column align-items-start mt-5 mb-3 w-100 gap-lg-3 gap-2">
        <div className={`heading text-24 w-100`}>Payment History</div>
        <div className="content-head d-flex justify-content-between flex-sm-row flex-column align-items-end w-100 gap-lg-3 gap-2">
          <MyDropDown
            options={filterableCategories}
            selectedValue={filterState}
            onChange={filterSpaceHandler}
            labelName="Select"
            all={true}
          />

          <DatePicker
            value={dayValue}
            onChange={setDayValue}
            inputClass="calendar-input w-100 mb-0"
            placeholder="Select Day"
            minDate={new Date()}
            format="YYYY-MM-DD"
            range
            dateSeparator=" to "
          />
        </div>
      </div>

      <div className="pt-2">
        <PaymentHistoryTable
          short={false}
          dayValue={dayValue}
          page={page}
          setPage={setPage}
          filterState={filterState}
        />
      </div>
    </div>
  );
};

export default AccountPaymentHistory;
