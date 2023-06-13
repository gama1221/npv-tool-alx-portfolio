import React from "react";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
const data01 = [
    { test: "Group A", value: 400 },
    { test: "Group B", value: 300 },
    { test: "Group C", value: 300 },
    { test: "Group D", value: 200 },
    { test: "Group E", value: 278 },
    { test: "Group F", value: 189 }
];

const data02 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 }
];
const SimplePieChartComponent = ({data}) => {
    return (
        <div>
            <PieChart width={1000} height={400}>
                <Pie
                    dataKey="result"
                    nameKey="type"
                    numOctaves="type"
                    isAnimationActive={false}
                    data={data}
                    cx={200}
                    cy={200}
                    outerRadius={80}
                    fill="#9c27b0"
                    label
                />
                <Tooltip />
            </PieChart>
        </div>
    );
}
export default SimplePieChartComponent