import { default as chalk } from 'npm:chalk';

export default class Logger {
  public static info(args: string | undefined | any): void {
    return console.log(chalk.blue(`[${new Date().toLocaleString()}] [INFO]`),
      typeof args === 'string' ? chalk.blueBright(args) : args);
  }

  public static warning(args: string | undefined): void {
    return console.log(chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`),
      typeof args === 'string' ? chalk.yellowBright(args) : args);
  }

  public static error(args: string | undefined): void {
    return console.log(chalk.red(`[${new Date().toLocaleString()}] [ERROR]`),
      typeof args === 'string' ? chalk.redBright(args) : args);
  }

  public static log(args: string | undefined): void {
    return console.log(chalk.white(`[${new Date().toLocaleString()}] [LOG]`),
      typeof args === 'string' ? chalk.whiteBright(args) : args);
  }
}