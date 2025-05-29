import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export const createBrowserForVercel = async () => {
  const isLocal = process.env.NODE_ENV === "development";

  if (isLocal) {
    return await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
  }

  return await puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless,
  });
};
