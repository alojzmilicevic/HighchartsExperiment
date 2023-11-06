import { useCallback, useEffect, useRef, useState } from 'react';
import { ClientFinancialData } from '../../../interface';
import { clientFinancialDataMock, endYear, startYear } from '../../../mock';
import {
    FinancialCategoryColors,
    LINE_WIDTH,
    STATIC_OPTIONS,
} from '../../../constants';
import HighchartsReact from 'highcharts-react-official';
import { generateEvents } from '../../../helpers';

export const initialStateFinancialState: ClientFinancialData = {
    income: {
        ...clientFinancialDataMock.income,
        selected: true,
        color: FinancialCategoryColors[clientFinancialDataMock.income.type],
    },
    expenses: {
        ...clientFinancialDataMock.expenses,
        selected: true,
        color: FinancialCategoryColors[clientFinancialDataMock.expenses.type],
    },
    assets: {
        ...clientFinancialDataMock.assets,
        selected: true,
        color: FinancialCategoryColors[clientFinancialDataMock.assets.type],
    },
    debt: {
        ...clientFinancialDataMock.debt,
        selected: true,
        color: FinancialCategoryColors[clientFinancialDataMock.debt.type],
    },
};

const extract = (data: string[][]) =>
    data.map((inner) => [parseInt(inner[2]), parseInt(inner[1])]);

export type LifeEvent = {
    type: string;
    date: number | undefined;
};

type UseChartType = {
    chartRef: React.RefObject<HighchartsReact.RefObject>;
    chartOptions: Highcharts.Options;
    lifeEvents: LifeEvent[];
};

export function useChart(): UseChartType {
    const chartRef = useRef<HighchartsReact.RefObject>(null);
    const [lifeEvents, setLifeEvents] = useState<LifeEvent[]>([]);
    const lifeEventsRaw = generateEvents(startYear, endYear);

    const [financialData] = useState<ClientFinancialData>(
        initialStateFinancialState
    );

    const isXWithinComponent = (x: number) => {
        if (chartRef.current && chartRef.current.container.current) {
            const rect = chartRef.current.container.current.getBoundingClientRect();

            // rect.left gives the left position relative to the viewport
            // rect.right gives the right position relative to the viewport
            return x >= rect.left && x <= rect.right;
        }
        return false;
    };

    const updateLifeEvents = useCallback(() => {
        const chart = chartRef.current?.chart;
        const xAxis = chart?.xAxis[0];

        const lifeEvents = lifeEventsRaw.reduce((acc: LifeEvent[], lifeEvent): LifeEvent[] => {
            const x = xAxis?.toPixels(lifeEvent[1] as number, false);
            
            if (x && isXWithinComponent(x)) {
              acc.push({
                type: lifeEvent[0] as string,
                date: x,
              });
            }
            return acc;
          }, []);

        setLifeEvents(lifeEvents);
    }, [lifeEventsRaw]);

    useEffect(() => {
        updateLifeEvents();
    }, []);

    const chartOptions: Highcharts.Options = {
        ...STATIC_OPTIONS(() => {
            updateLifeEvents();
        }),
        series: Object.values(financialData)
            .filter((s) => s.selected)
            .map(({ data, color, header }) => ({
                name: header,
                color,
                lineWidth: LINE_WIDTH,
                data: extract(data),
                type: 'line',
            })),
    };

    return { chartRef, chartOptions, lifeEvents };
}
