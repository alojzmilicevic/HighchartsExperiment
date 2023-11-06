import { generateAssetsData, generateDebtData, generateExpenseData, generateIncomeData, generateYearlyData } from "./helpers";
import { FinancialCategoryType, RawClientFinancialData } from "./interface";

export const startYear = 1989;
export const endYear = 2030;

export const clientFinancialDataMock: RawClientFinancialData = {
    income: {
        header: "Inkomst",
        type: FinancialCategoryType.Income,
        data: generateIncomeData(generateYearlyData(startYear, endYear)),
        subHeaders: ["Typ", "Summa", "Datum", "Utveckling", "Kommentar"]
    },
    expenses: {
        header: "Utgifter",
        type: FinancialCategoryType.Expenses,
        data: generateExpenseData(generateYearlyData(startYear, endYear)),
        subHeaders: ["Typ", "Summa", "Datum", "Utveckling", "Kommentar"]
    },
    assets: {
        header: "Tillgångar",
        type: FinancialCategoryType.Assets,
        data: generateAssetsData(generateYearlyData(startYear, endYear)),
        subHeaders: ["Typ", "Värde", "Datum"]
    },
    debt: {
        header: "Skulder",
        type: FinancialCategoryType.Debt,
        data: generateDebtData(generateYearlyData(startYear, endYear)),
        subHeaders: ["Typ", "Summa", "Datum", "Ränta"]
    },
};