import fs from "fs";

let logger = (req, res, next) => {
  let today = new Date();

  let year = today.getFullYear();
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let hr = today.getHours();
  let min = today.getMinutes();
  let sec = today.getSeconds();

  let start = Date.now();

  const logToFile = (message) => {
    fs.appendFile("log.txt", message + "\n", (err) => {
      if (err) {
        console.error("Failed to write log to file:", err);
      }
    });
  };

  res.on("finish", () => {
    let end = Date.now();
    let logMessage = `[${year}-${month}-${date}T${hr}-${min}-${sec}]:${
      req.method
    } ${req.originalURL} ${req.ip} ${res.statusCode} ${end - start}ms`;

    console.log(logMessage);
    logToFile(logMessage);
  });

  next();
};

export default logger;
