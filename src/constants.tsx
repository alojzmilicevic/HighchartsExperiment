import * as Highcharts from 'highcharts';
import { FinancialCategoryType } from './interface';
import HouseIcon from '@mui/icons-material/House';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import DiamondIcon from '@mui/icons-material/Diamond';
import RequestPageIcon from '@mui/icons-material/RequestPage';

type SetExtremesEvent = Highcharts.AxisSetExtremesEventObject;

export const Y_MIN = -40000;
export const Y_MAX = 40000;
export const LINE_WIDTH = 3;

export const TICK_INTERVAL = 1;
export const DISPLAY_RANGE = 5;
export const FinancialCategoryColors = {
    [FinancialCategoryType.Income]: '#4CAF50',
    [FinancialCategoryType.Expenses]: '#F44336',
    [FinancialCategoryType.Assets]: '#2196F3',
    [FinancialCategoryType.Debt]: '#FF9800',
};

export const yearsToMillis = (years: number) =>
    years * 365 * 24 * 60 * 60 * 1000;

export const STATIC_OPTIONS = (
    onSetExtremes: (e: SetExtremesEvent) => void
): Highcharts.Options => ({
    xAxis: {
        type: 'datetime',
        tickInterval: yearsToMillis(TICK_INTERVAL),
        labels: {
            format: '{value:%Y-%m-%d}',
        },
        range: yearsToMillis(DISPLAY_RANGE),
        opposite: true,
        events: {
            setExtremes: (e: SetExtremesEvent) => {
                onSetExtremes(e);
            },
        },
    },
    yAxis: {
        min: Y_MIN,
        max: Y_MAX,
    },
    navigator: {
        enabled: false,
    },
    rangeSelector: {
        enabled: false,
    },
});

export const INCOME_TYPES: string[] = [
    'Salary',
    'Inheritance',
    'Freelance',
    'Dividends',
    'Rental Income',
    'Royalties',
    'Business Income',
    'Pension',
    'Gift',
    'Loan',
    'Prize Money',
    'Grant',
    'Sale of Property',
    'Interest Income',
    'Other',
];

export const ASSET_TYPES_NEW = {
    RealEstate: 'Real Estate',
    Stocks: 'Stocks',
    Bonds: 'Bonds',
    Gold: 'Gold',
};

export const ASSET_ICONS = {
    [ASSET_TYPES_NEW.RealEstate]: <HouseIcon />,
    [ASSET_TYPES_NEW.Stocks]: <ShowChartIcon />,
    [ASSET_TYPES_NEW.Bonds]: <RequestPageIcon />,
    [ASSET_TYPES_NEW.Gold]: <DiamondIcon />,
};

export const INCOME_COMMENTS: string[] = [
    'Monthly salary from primary job.',
    'Received an inheritance from a relative.',
    'Income from freelance projects this month.',
    'Quarterly dividends from stock investments.',
    'Income from rented apartment.',
    'Royalties from a book I wrote.',
    'Profit from business venture.',
    'Monthly pension collection.',
    'Gifted money for my birthday.',
    'Obtained a personal loan.',
    'Won a prize in a competition.',
    'Received a grant for research.',
    'Sale of a property in downtown.',
    'Interest earned from bank savings.',
    'Miscellaneous income.',
    '', // Empty comment to represent no comment at times
];

export const EXPENSE_TYPES = [
    'Utilities',
    'Rent',
    'Groceries',
    'Transportation',
    'Entertainment',
];

export const EXPENSE_COMMENTS = [
    'Monthly electricity and water bills.',
    'Monthly rental for the apartment.',
    'Weekly grocery shopping.',
    'Fuel and maintenance expenses.',
    'Movie and dinner outings.',
];

export const DEBT_TYPES = [
    'Mortgage',
    'Car Loan',
    'Credit Card',
    'Student Loan',
];
export const ASSET_TYPES = ['Real Estate', 'Stocks', 'Bonds', 'Gold'];
