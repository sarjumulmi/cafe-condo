import { useState } from 'react';
import currency from 'currency.js';

export default ({ date, toggleShowBody, totalMonthly, isOpen: cardIsOpen }) => {
  const [isOpen, setIsOpen] = useState(cardIsOpen);

  const toggleOpen = () => {
    setIsOpen((isOpen) => {
      return !isOpen;
    });
    toggleShowBody();
  };

  return (
    <>
      <div className={`card-title ${isOpen ? '' : 'card-title--open'}`}>
        <h2>
          Month: {date} {!isOpen && `(${currency(totalMonthly).format()})`}
        </h2>
        <div
          className={`card-title-button ${
            isOpen ? '' : 'card-title-button--open'
          }`}
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
          border-bottom: 1px solid #555;
        }
        .card-title h2 {
          margin-bottom: 8px;
        }
        .card-title.card-title--open {
          border-bottom: none;
        }
        .card-title-button--open {
          transform: rotate(135deg);
        }
        .card-title-button {
          -webkit-transition: -webkit-transform 0.3s ease-in-out;
          transition: -webkit-transform 0.3s ease-in-out;
          -o-transition: transform 0.3s ease-in-out;
          transition: transform 0.3s ease-in-out;
          transition: transform 0.3s ease-in-out,
            -webkit-transform 0.3s ease-in-out;
          height: fit-content;
        }
      `}</style>
    </>
  );
};
