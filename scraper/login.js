exports.login = function (browser, loginUrl, email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const page = await browser.newPage();
      await page.goto(loginUrl);
      await page.type('#Username', email);
      await page.waitForTimeout(1000);
      await page.type('#Password', password);
      await page.waitForTimeout(1000);

      await page.click('#SignIn');
      await page.waitForSelector('#ResServicesContent ul li:first-child a', {
        timeout: 4 * 60 * 1000
      });

      return resolve(page);
    } catch (error) {
      return reject(error);
    }
  });
};
