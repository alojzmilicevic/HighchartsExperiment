import HighchartsReact from 'highcharts-react-official';
import Highstock from 'highcharts/highstock'; // Import Highstock
import { LifeEvent, useChart } from './hooks/useChart';
import { ASSET_ICONS } from '../../constants';

const Chart = () => {
    const { chartOptions, chartRef, lifeEvents } = useChart();

    return (
        <div style={{ position: 'relative' }}>
            {lifeEvents.map((lifeEvent: LifeEvent) => {
                return (
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 390,
                            left: lifeEvent.date,
                            zIndex: 1000,
                        }}
                    >
                        {ASSET_ICONS[lifeEvent.type]}
                    </div>
                );
            })}

            <HighchartsReact
                highcharts={Highstock}
                options={chartOptions}
                constructorType={'stockChart'}
                ref={chartRef}
            />
        </div>
    );
};

export { Chart };
