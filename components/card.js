import currency from 'currency.js';

import CardTitle from './cardTitle';
import { useState } from 'react';

export default ({ data, date }) => {
  const [showCardBody, setShowCardBody] = useState(true);

  const toggleShowBody = () => {
    setShowCardBody((showCardBody) => !showCardBody);
  };

  return (
    <div className="card">
      <CardTitle
        date={date}
        toggleShowBody={toggleShowBody}
        totalMonthly={data[data.length - 1].totalMonthly}
      />
      <div className={`card-body ${showCardBody ? '' : 'card-body--hidden'}`}>
        {data.map((dataItem, i) => (
          <div key={date + i}>
            {dataItem.chargeTitle && (
              <p>
                {dataItem.chargeTitle}
                {dataItem.amount && (
                  <span>: {currency(dataItem.amount).format()}</span>
                )}
              </p>
            )}

            {dataItem.totalMonthly && (
              <p>
                <b>Total: {currency(dataItem.totalMonthly).format()}</b>
              </p>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .card {
          padding: 0.5rem 1.5rem;
          max-width: 500px;
          border-top: 1px solid #7a7a7a;
          border-left: 1px solid #7a7a7a;
          border-bottom: 1px solid #d0c6c647;
          border-right: 1px solid #d0c6c647;
          border-radius: 3px;
          margin-bottom: 2.5rem;
        }
        .card-body {
          max-height: 1000px;
          overflow: hidden;
          -webkit-transition: max-height 0.5s ease-in-out;
          -o-transition: max-height 0.5s ease-in-out;
          transition: max-height 0.5s ease-in-out;
        }
        .card-body.card-body--hidden {
          max-height: 0;
        }
      `}</style>
    </div>
  );
};
