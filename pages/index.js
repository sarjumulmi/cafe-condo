import { Card, Title, Layout } from '../components';
import Error from './_error';

const Index = ({ paymentData }) => {
  const renderData = (paymentData) => {
    if (paymentData.error) {
      return (
        <div className="error-container">
          <Error statusCode={500} title={paymentData.error} />
          <style jsx>{`
            .error-container {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
          `}</style>
        </div>
      );
    } else {
      return Object.keys(paymentData).map((date, i) => (
        <div key={i}>
          <Card
            data={paymentData[date]}
            date={date}
            isOpen={i === 0 ? true : false}
          />
        </div>
      ));
    }
  };
  return (
    <Layout>
      <Title />
      <div className="container">
        {renderData(paymentData)}
        <style jsx>{`
          .container {
            padding: 0 1rem 1rem 1rem;
          }
        `}</style>
      </div>
    </Layout>
  );
};

export default Index;

const { getInvoiceData } = require('../handler');
const db = require('../db/models');
const { getNormalizedPaymentData } = require('../scraper');
const _ = require('lodash');

export const getStaticProps = async () => {
  try {
    const data = await getInvoiceData(db);
    return {
      props: {
        paymentData: getNormalizedPaymentData(data)
      }
    };
  } catch (error) {
    return {
      props: {
        paymentData: { error: error.message }
      }
    };
  }
};
