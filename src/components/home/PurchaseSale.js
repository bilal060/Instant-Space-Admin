import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { Button, Image } from 'react-bootstrap';
import filterBlue from '../../assets/images/icons/filterBlue.svg';
import cancel from '../../assets/images/icons/cancel.svg';
import '../../assets/css/responsive.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEarning } from '../../store/storeIndex';

const PurchaseSale = () => {
  const dispatch = useDispatch();
  const Earnings = useSelector((state) => state.Earnings.userEarnings.ownerEarning);
  const token = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUserEarning(token));
  }, []);

  const options = {
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: '100%',
      width: '100%',
      toolbar: {
        show: false
      }
    },
    tooltip: {
      enabled: true,
      enabledOnSeries: undefined,
      shared: true,
      followCursor: false,
      intersect: false,
      inverseOrder: false,
      custom: undefined,
      fillSeriesColor: false,
      theme: false,
      style: {
        fontSize: '12px',
        fontFamily: undefined
      },
      onDatasetHover: {
        highlightDataSeries: false
      },
      x: {
        show: true,
        format: 'dd MMM',
        formatter: undefined
      },
      y: {
        formatter: undefined,
        title: {
          formatter: (seriesName) => seriesName
        }
      },
      z: {
        formatter: undefined,
        title: 'Size: '
      },
      marker: {
        show: true
      },
      items: {
        display: 'flex'
      },
      fixed: {
        enabled: true,
        position: 'top',
        offsetX: 0,
        offsetY: 0
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '80%'
      }
    },
    plugins: {
      legend: {
        position: 'bottom'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ],
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: true
      },
      labels: {
        style: {
          colors: '#171D25',
          fontSize: '14px',
          fontWeight: '500'
        }
      }
    },
    yaxis: {
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: true
      },
      labels: {
        style: {
          colors: '#171D25',
          fontSize: '14px',
          fontWeight: '500'
        }
      }
    },
    fill: {
      opacity: 1
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      hover: {
        filter: {
          type: 'none',
          value: 0
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0
        }
      }
    },

    colors: ['rgba(223, 82, 91, 0.4)', 'rgba(223, 82, 91, 0.4)'],
    grid: {
      borderColor: ' #E1E1FB',
      yaxis: {
        lines: {
          show: false
        }
      }
    }
  };

  const series = [
    {
      name: 'Net Profit',
      data: Earnings?.map((earning) => earning.totalEarning)
    }
  ];
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]);
  const [chartHeight, setchartHeight] = useState(430);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    if (windowSize[0] >= 1200) {
      setchartHeight(430);
    } else if (windowSize[0] <= 1200 && windowSize[0] > 767) {
      setchartHeight(350);
    } else if (windowSize[0] <= 767 && windowSize[0] > 576) {
      setchartHeight(200);
    } else if (windowSize[0] <= 576) {
      setchartHeight(170);
    }
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize]);
  return (
    <div className="h-100">
      <div className="heading text-24 mb-4">Transaction Statistics</div>
      {Earnings?.length > 0 ? (
        <div className="b-chart section-main border-0">
          <div className=" d-flex justify-content-between">
            <div className="card-label rounded-3 my-2 px-2 d-flex justify-content-center bg-light">
              <label className="">2002-2003</label>
              <Image alt="gallery" src={cancel} className=" ps-1 text-primary" />
            </div>
            <Button
              // className=" fw-bolder bg-lightBlue px-3 booking-btn gap-2"
              className="bg-grey fw-bolder d-flex align-items-center px-3 height-40px gap-2 bg-light border-0 text-dark py-0">
              <Image alt="gallery" src={filterBlue} className="text-primary " />
              Filter
            </Button>
          </div>
          <Chart options={options} series={series} type="bar" height={chartHeight} width="100%" />
        </div>
      ) : (
        <div className="NewSpace p-4 mb-4">
          <div className="d-flex justify-content-center align-items-center w-100 h-100 flex-column">
            <p className="mb-3 auth-special font-weight-700 font-24">opps!</p>
            <p className="mb-5 font-24 font-weight-500 text-center">
              You don’t have any Earning Yet
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PurchaseSale;
