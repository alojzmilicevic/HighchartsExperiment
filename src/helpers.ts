import {
    ASSET_TYPES,
    ASSET_TYPES_NEW,
    DEBT_TYPES,
    EXPENSE_COMMENTS,
    EXPENSE_TYPES,
    INCOME_COMMENTS,
    INCOME_TYPES,
} from './constants';
import { RawFinancialData } from './interface';

export const getRandomInt = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export const generateYearlyData = (
    startYear: number,
    endYear: number,
    rangeMin = -40000,
    rangeMax = 40000
): [number, number][] => {
    const data: [number, number][] = [];
    for (let year = startYear; year <= endYear; year++) {
        const date = new Date(year, 0, 1).getTime();
        data.push([date, getRandomInt(rangeMin, rangeMax)]);
    }
    return data;
};

const getRandomData = (dataArray: string[]) =>
    dataArray[getRandomInt(0, dataArray.length - 1)];

export const generateIncomeData = (rawData: RawFinancialData): string[][] =>
    rawData.map(([date, value]) => [
        getRandomData(INCOME_TYPES),
        value.toString(),
        date.toString(),
        getRandomInt(1, 15).toString(),
        getRandomData(INCOME_COMMENTS),
    ]);

export const generateExpenseData = (rawData: RawFinancialData): string[][] =>
    rawData.map(([date, value]) => [
        getRandomData(EXPENSE_TYPES),
        value.toString(),
        date.toString(),
        getRandomInt(1, 15).toString(),
        getRandomData(EXPENSE_COMMENTS),
    ]);

export const generateAssetsData = (rawData: RawFinancialData): string[][] =>
    rawData.map(([date, value]) => [
        getRandomData(ASSET_TYPES),
        value.toString(),
        date.toString(),
    ]);

export const generateDebtData = (rawData: RawFinancialData): string[][] =>
    rawData.map(([date, value]) => [
        getRandomData(DEBT_TYPES),
        value.toString(),
        date.toString(),
        getRandomInt(1, 15).toString(),
    ]);

function generateFixedDateInLastDecade(
    year: number,
    index: number,
    totalEvents: number
): number {
    const step = 10 / totalEvents;
    const month = 0; // January
    const day = 1; // 1st of the month
    const eventYear = year - 10 + Math.floor(step * (index + 1));
    return Date.UTC(eventYear, month, day);
}

export function generateEvents(
    startYear: number,
    endYear: number,
    random: boolean = false
) {
    const events = [];
    const assetTypes = Object.values(ASSET_TYPES_NEW);
    const totalEvents = 5;

    for (let i = 0; i < totalEvents; i++) {
        const eventType = assetTypes[i % assetTypes.length];

        let date: number;
        if (random) {
            const randomYear = Math.floor(Math.random() * 10) + endYear - 9;
            const randomMonth = Math.floor(Math.random() * 12);
            const randomDay = Math.floor(Math.random() * 28) + 1;
            date = Date.UTC(randomYear, randomMonth, randomDay);
        } else {
            date = generateFixedDateInLastDecade(endYear, i, totalEvents);
        }

        events.push([eventType, date]);
    }

    return events;
}
