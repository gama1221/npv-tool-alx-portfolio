import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, } from 'recharts';

const Chart = ({ data }) => {
    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <Bar dataKey="type" fill="#756300" barSize={30} className='npv-type' />
                    <Bar dataKey="result" fill="#800080" className='npv-result' barSize={30} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}
export default Chart