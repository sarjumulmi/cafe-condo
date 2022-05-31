import { Card, Title } from '../components';

const Index = ({ paymentData }) => {
  return (
    <div className="container">
      <Title />
      <div className="content">
        {Object.keys(paymentData).map((date, i) => (
          <div key={i}>
            <Card data={paymentData[date]} date={date} />
          </div>
        ))}
      </div>
      <style jsx>{`
        .container {
          padding: 0 1rem 1rem 1rem;
        }
      `}</style>
    </div>
  );
};

export default Index;

// require('dotenv').config();
const puppeteer = require('puppeteer');
const { login, getPaymentData } = require('../scraper');

// let expirestAt = Date.now();
// let paymentData;

export async function getServersideProps({ req, res }) {
  res.setHeaders(
    'Cache-Control',
    'public, s-max-age=86400, stale-while-revalidate=60',
  );

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
  const paymentData = await getPaymentData(page);

  // todo: if caching doesn't work, make a local cache
  // now = Date.now();
  // if (!paymentData || expirestAt.getTime() <= now) {
  //   const puppeteerConfig = {
  //     headless: true,
  //     args: ['--disable-setuid-sandbox'],
  //     ignoreHTTPSErrors: true,
  //   };

  //   if (process.env.NODE_ENV === 'production') {
  //     puppeteerConfig.executablePath = '/usr/bin/chromium-browser';
  //   }
  //   const browser = await puppeteer.launch(puppeteerConfig);
  //   const page = await login(
  //     browser,
  //     process.env.BASE_URL,
  //     process.env.EMAIL,
  //     process.env.PASSWORD,
  //   );
  //   paymentData = await getPaymentData(page);
  //   expirestAt = new Date(now + 24 * 60 * 60 * 1000);
  // }

  return {
    props: { paymentData }, // will be passed to the page component as props
  };
}
