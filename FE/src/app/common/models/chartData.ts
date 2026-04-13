export interface chartDataSet {
    label: string;
    data: number[];
}

export interface chartData {
    labels: string[],
    datasets: chartDataSet[],
}