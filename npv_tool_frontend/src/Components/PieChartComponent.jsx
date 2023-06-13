
import { PieChart, Pie, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, } from 'recharts';
const data01 = [
    {
        "name": "Group A",
        "value": 400
    },
    {
        "name": "Group B",
        "value": 300
    },
    {
        "name": "Group C",
        "value": 300
    },
    {
        "name": "Group D",
        "value": 200
    },
    {
        "name": "Group E",
        "value": 278
    },
    {
        "name": "Group F",
        "value": 189
    }
];
const data02 = [
    {
        "name": "Group A",
        "value": 2400
    },
    {
        "name": "Group B",
        "value": 4567
    },
    {
        "name": "Group C",
        "value": 1398
    },
    {
        "name": "Group D",
        "value": 9800
    },
    {
        "name": "Group E",
        "value": 3908
    },
    {
        "name": "Group F",
        "value": 4800
    }
];
const PieChartComponent = ({data}) => {
    return (
        <div>
            <PieChart width={730} height={250}>
                <Pie data={data} dataKey="result" nameKey="type" cx="50%" cy="50%" outerRadius={50} fill="#FFD700" />
                <Pie data={data} dataKey="result" nameKey="type" cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#9c27b0" label />
            </PieChart>
        </div>)
}
export default PieChartComponent