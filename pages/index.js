// const puppeteer = require('puppeteer');

const Index = ({ paymentData }) => {
  return (
    <div>
      <code>
        {Object.keys(paymentData).map((date, i) => (
          <div key={i}>
            <p>Date: {date} </p>
            {paymentData[date].map((data, j) => (
              <p key={i + j}>
                {data.chargeTitle && <p>Title: {data.chargeTitle}</p>}
                {data.amount && <p>Amount: {data.amount}</p>}
                {data.totalMonthly && (
                  <p>
                    <b>Total: {data.totalMonthly}</b>
                  </p>
                )}
              </p>
            ))}
            <p>*****************************************</p>
          </div>
        ))}
      </code>
    </div>
  );
};

export default Index;

const puppeteer = require('puppeteer');
const { login, getPaymentData } = require('../scraper');

export async function getStaticProps(context) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--disable-setuid-sandbox'],
    ignoreHTTPSErrors: true,
  });
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
