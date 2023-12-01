import React from 'react';
import { Col, Row } from 'react-bootstrap';
import SpaceCards from './SpaceCards';
import SecurityMeasureInner from '../../assets/images/SecurityMeasureInner.js';
import ClimateControlInner from '../../assets/images/ClimateControlInner.js';
import AirConditionarInner from '../../assets/images/AirConditionarInner.js';
import TemperatureControlInner from '../../assets/images/TemperatureControlInner.js';
import PestControlInner from '../../assets/images/PestControlInner.js';
import SprinklerSystemInner from '../../assets/images/SprinklerSystemInner.js';
import DoorAlarmInner from '../../assets/images/DoorAlarmInner.js';
import DustFreeInner from '../../assets/images/DustFreeInner.js';
import FireAlarmInner from '../../assets/images/FireAlarmInner.js';
import SecurityStaffInner from '../../assets/images/SecurityStaffInner.js';
import PickUpServiceInner from '../../assets/images/PickUpServiceInner.js';
import BoxPackingInner from '../../assets/images/BoxPackingInner.js';
import PickAndDInner from '../../assets/images/PickAndDInner.js';
import LocksInner from '../../assets/images/LocksInner.js';
import SpaceStaff from './SpaceStaff';

const SpaceDetails = (singleSpace) => {
  const CardsFacilities = [
    {
      imageSrc: <SecurityMeasureInner />,
      label: 'Security Measure'
    },
    {
      imageSrc: <ClimateControlInner />,
      label: 'Climate Control'
    },
    {
      imageSrc: <AirConditionarInner />,
      label: 'Air Condition'
    },
    {
      imageSrc: <TemperatureControlInner />,
      label: 'Temperature Control'
    },
    {
      imageSrc: <PestControlInner />,
      label: 'Pest Control'
    },
    {
      imageSrc: <SprinklerSystemInner />,
      label: 'Sprinkler System'
    },
    {
      imageSrc: <DoorAlarmInner />,
      label: 'Door Alarm'
    },
    {
      imageSrc: <DustFreeInner />,
      label: 'Dust Free'
    },
    {
      imageSrc: <FireAlarmInner />,
      label: 'Fire Alarm'
    },
    {
      imageSrc: <SecurityStaffInner />,
      label: 'Security Staff'
    },
    {
      imageSrc: <SecurityMeasureInner />,
      label: 'CCTV'
    },
    {
      imageSrc: <SecurityMeasureInner />,
      label: 'Lifters'
    }
  ];
  const CardsServices = [
    { imageSrc: <PickUpServiceInner />, label: 'Pickup Services' },
    { imageSrc: <BoxPackingInner />, label: 'Box Packing' },
    { imageSrc: <PickAndDInner />, label: 'Pick & Delivery' },
    { imageSrc: <ClimateControlInner />, label: 'Climate Control' },
    {
      imageSrc: <LocksInner />,
      label: 'Locks'
    }
  ];
  const formSpaceCardsFacilities = [
    {
      imageSrc: <SecurityMeasureInner />,
      label: 'Security Measure'
    },
    {
      imageSrc: <AirConditionarInner />,
      label: 'Air Condition'
    },
    {
      imageSrc: <TemperatureControlInner />,
      label: 'Temperature Control'
    },
    {
      imageSrc: <PestControlInner />,
      label: 'Pest Control'
    },
    {
      imageSrc: <SprinklerSystemInner />,
      label: 'Sprinkler System'
    },
    {
      imageSrc: <DoorAlarmInner />,
      label: 'Door Alarm'
    },
    {
      imageSrc: <DustFreeInner />,
      label: 'Dust Free'
    }
  ];
  return (
    <>
      <div className="bg-white pb-4 px- radius-10 mt-4 row">
        <div className="font-24 font-weight-700 p-4 w-100 border-bottom">Space Details</div>
      </div>
      {singleSpace?.categoryId?.subcategories[0].name === 'Warehouse' ? (
        <Row className=" py-3 radius-10 mt-4">
          <Col md={6} className="px-0 pe-md-2 mb-md-0 mb-4">
            <div className="bg-white rounded-8px">
              <div className="font-24 font-weight-700 p-4 w-100 ">Facilities</div>
              <Row className="mx-0">
                <SpaceCards
                  Cards={CardsFacilities}
                  activeData={singleSpace?.singleSpace?.facilities}
                />
              </Row>
            </div>
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-between gap-4 px-0 ps-md-3">
            <div className="bg-white rounded-8px">
              <div className="font-24 font-weight-700 p-4 w-100 ">Services</div>
              <Row className="mx-0">
                <SpaceCards Cards={CardsServices} activeData={singleSpace?.singleSpace?.services} />
              </Row>
            </div>
            <SpaceStaff />
          </Col>
        </Row>
      ) : (
        <Row className=" py-3 radius-10 mt-4">
          <Col md={6} className="px-0 pe-md-2 mb-md-0 mb-4">
            <div className="bg-white rounded-8px">
              <div className="font-24 font-weight-700 p-4 w-100 ">Amenities and Services</div>
              <Row className="mx-0">
                <SpaceCards
                  Cards={formSpaceCardsFacilities}
                  activeData={singleSpace?.singleSpace?.facilities}
                />
              </Row>
            </div>
          </Col>
          <Col md={6} className="d-flex flex-column justify-content-between gap-4 px-0 ps-md-3">
            <SpaceStaff />
          </Col>
        </Row>
      )}
    </>
  );
};

export default SpaceDetails;
