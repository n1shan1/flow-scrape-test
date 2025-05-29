import chromium from "chrome-aws-lambda";
import puppeteer from "puppeteer-core";

export const getBrowserConfig = () => {
  const isLocal = process.env.NODE_ENV === "development";
  const isVercel = process.env.VERCEL === "1";

  if (isLocal) {
    return {
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };
  }

  // For Vercel/production
  return {
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: chromium.executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  };
};

export const createBrowser = async () => {
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
