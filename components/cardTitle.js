import { useState } from 'react';
import currency from 'currency.js';

export default ({ date, toggleShowBody, totalMonthly }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen((isOpen) => {
      return !isOpen;
    });
    toggleShowBody();
  };

  return (
    <>
      <div className="card-title">
        <h2>
          Month: {date} ({currency(totalMonthly).format()})
        </h2>
        <div
          className={`${isOpen ? 'card-close' : 'card-open'}`}
          onClick={toggleOpen}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
          </svg>
        </div>
      </div>
      <style jsx>{`
        .card-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .card-open {
          transform: rotate(135deg);
        }
        .card-close {
          transform: rotate(0deg);
        }
        .card-open,
        .card-close {
          transition: transform 0.3s ease-out;
          height: fit-content;
        }
      `}</style>
    </>
  );
};
