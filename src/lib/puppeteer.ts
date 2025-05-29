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
    executablePath:
      process.env.CHROME_EXECUTABLE_PATH || chromium.executablePath,
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

  try {
    const executablePath =
      process.env.CHROME_EXECUTABLE_PATH || (await chromium.executablePath);

    if (!executablePath) {
      throw new Error("Chrome executable path not found");
    }

    return await puppeteer.launch({
      args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });
  } catch (error) {
    console.error("Error launching browser:", error);
    throw error;
  }
};
