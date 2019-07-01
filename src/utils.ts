import chalk from "chalk";

export const isStringEqualCaseInsensitive = (targetStr: string, str: string) => {
  return targetStr.toLowerCase() === str.toLowerCase();
};

export const isArrayIncludeElementCaseInsensitive = (targetArray: string[], str: string) => {
  const upperCaseTargetArray = targetArray.map((element: string) => {
    return element.toUpperCase();
  });
  return upperCaseTargetArray.includes(str.toUpperCase());
};

export type Partial<T> = {
  [P in keyof T]?: T[P];
};


export type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

export const splitArguments = (targetStr: string) => {
  const splitedArray = targetStr.split(',');
  return { field: splitedArray[0], value: splitedArray[1] };
};

// tslint:disable: no-console
export const printResult = (printTitle: string, printTarget: any) => {
  if (printTarget === undefined || printTarget.length === 0) {
    console.log(chalk.green.bold(`no search result for relavent ${printTitle}`));
    return;
  }
  console.log(chalk.green.bold(`search result for relavent ${printTitle}`));
  console.table(printTarget);
};

