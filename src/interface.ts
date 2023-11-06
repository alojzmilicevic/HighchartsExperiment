export enum FinancialCategoryType {
    Income = "income",
    Expenses = "expenses",
    Assets = "assets",
    Debt = "debt",
}

export type ClientFinancialItem = RawClientFinancialItem & {
    selected: boolean;
    color: string;
};

export type FinancialPost = "income" | "expenses" | "assets" | "debt";

export type ClientFinancialData = {
    income: ClientFinancialItem;
    expenses: ClientFinancialItem;
    assets: ClientFinancialItem;
    debt: ClientFinancialItem;
};

export type RawClientFinancialItem = {
    header: string;
    type: FinancialCategoryType;
    subHeaders: string[];
    data: string[][];
};

export type RawClientFinancialData = {
    income: RawClientFinancialItem;
    expenses: RawClientFinancialItem;
    assets: RawClientFinancialItem;
    debt: RawClientFinancialItem;
};

// This is the way HighCharts expects the data to be formatted
export type RawFinancialData = [number, number][];