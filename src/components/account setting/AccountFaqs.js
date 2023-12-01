import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import searchIcon from '../../assets/images/icons/search.svg';

const faqs = [
  {
    id: 'heading1',
    collapse: 'collapse1',
    show: true,
    heading: 'Lorem ipsum dolor sit amet consr.?',
    detail:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.'
  },
  {
    id: 'heading2',
    collapse: 'collapse2',
    show: false,
    heading: 'Lorem ipsum dolor sit amet consr.?',
    detail:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.'
  },
  {
    id: 'heading3',
    collapse: 'collapse3',
    show: false,
    heading: 'Lorem ipsum dolor sit amet consr.?',
    detail:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.'
  },
  {
    id: 'heading4',
    collapse: 'collapse4',
    show: false,
    heading: 'Lorem ipsum dolor sit amet consr.?',
    detail:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.'
  },
  {
    id: 'heading5',
    collapse: 'collapse5',
    show: false,
    heading: 'Lorem ipsum dolor sit amet consr.?',
    detail:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.'
  },
  {
    id: 'heading6',
    collapse: 'collapse6',
    show: false,
    heading: 'Lorem ipsum dolor sit amet consr.?',
    detail:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.'
  },
  {
    id: 'heading7',
    collapse: 'collapse7',
    show: false,
    heading: 'Lorem ipsum dolor sit amet consr.?',
    detail:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.'
  },
  {
    id: 'heading8',
    collapse: 'collapse8',
    show: false,
    heading: 'Lorem ipsum dolor sit amet consr.?',
    detail:
      'Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec. Lorem ipsum dolor sit amet consectetur. Pretium lacus congue maec.Lorem ipsu consectetur. Pretium lacus congue maec.'
  }
];
const AccountFaqs = () => {
  return (
    <div>
      <h3 className="font-24 font-weight-800 mb-4 pb-3">Acceptance of the Privacy Policy</h3>
      <div className="search mb-4">
        <input
          type="text"
          placeholder="Search"
          className="border-0 outline-none h-100 w-100 bg-transparent text-[16px]"
        />
        <img src={searchIcon} alt="" />
      </div>
      <Accordion defaultActiveKey="0">
        {faqs.map((data, index) => {
          return (
            <Accordion.Item eventKey={data.id} key={index}>
              <Accordion.Header>{data.heading}</Accordion.Header>
              <Accordion.Body className="px-0">{data.detail}</Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>
    </div>
  );
};

export default AccountFaqs;
