function login(browser, loginUrl, email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const page = await browser.newPage();
      await page.goto(loginUrl);
      await page.type('#Username', email);
      await page.type('#Password', password);
      await page.click('#SignIn');
      await page.waitForSelector('#ResServicesContent ul li:first-child a');

      return resolve(page);
    } catch (error) {
      return reject(error);
    }
  });
}

module.exports = login;
