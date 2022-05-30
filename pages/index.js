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

export async function getStaticProps(context) {
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
  return {
    props: { paymentData }, // will be passed to the page component as props
  };
}
