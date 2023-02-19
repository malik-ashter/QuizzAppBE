const { format, createLogger, transports, winston } = require("winston");
const { combine, timestamp, label, printf } = format;
require("winston-daily-rotate-file");

//Label
const CATEGORY = "Log Rotation";

//DailyRotateFile func()
const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/rotate-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

//Using the printf format.
const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

// Define different colors for each level.
// Colors make the log message more visible,
// adding the ability to focus or ignore messages.
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
}

// Tell winston that you want to link the colors
// defined above to the severity levels.
// winston.addColors(colors)

const logger = createLogger({
  level: "debug",
  format: combine(label({ label: CATEGORY }), timestamp(), customFormat),
  transports: [fileRotateTransport, new transports.Console()],
});

module.exports = logger;