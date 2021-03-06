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
          <Card data={paymentData[date]} date={date} />
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

// require('dotenv').config();
const puppeteer = require('puppeteer');
const { login, getPaymentData } = require('../scraper');
const _ = require('lodash');

let expirestAt = new Date(Date.now());
let paymentData;

export async function getServerSideProps({ req, res }) {
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=60',
  );

  // const puppeteerConfig = {
  //   headless: true,
  //   args: ['--disable-setuid-sandbox'],
  //   ignoreHTTPSErrors: true,
  // };

  // if (process.env.NODE_ENV === 'production') {
  //   puppeteerConfig.executablePath = '/usr/bin/chromium-browser';
  // }
  // const browser = await puppeteer.launch(puppeteerConfig);
  // const page = await login(
  //   browser,
  //   process.env.BASE_URL,
  //   process.env.EMAIL,
  //   process.env.PASSWORD,
  // );
  // const paymentData = await getPaymentData(page);

  //if cache control doesn't work, make a local cache
  try {
    const now = Date.now();
    if (!paymentData || _.isEmpty(paymentData) || expirestAt.getTime() <= now) {
      const puppeteerConfig = {
        headless: true,
        args: ['--disable-setuid-sandbox'],
        ignoreHTTPSErrors: true,
      };

      if (process.env.NODE_ENV === 'production') {
        puppeteerConfig.executablePath = '/usr/bin/chromium-browser';
      }

      const browser = await puppeteer.launch(puppeteerConfig);
      const page = await login(
        browser,
        process.env.BASE_URL,
        process.env.EMAIL,
        process.env.PASSWORD,
      );
      paymentData = await getPaymentData(page);
      expirestAt = new Date(now + 24 * 60 * 60 * 1000);
    }
  } catch (error) {
    console.error('error: ', error);
    paymentData = { error: error.message };
    expirestAt = new Date(Date.now());
  } finally {
    console.log('expiration ', expirestAt);
    console.log('data ', paymentData);
    return {
      props: { paymentData }, // will be passed to the page component as props
    };
  }
}
