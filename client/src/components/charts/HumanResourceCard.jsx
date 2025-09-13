// src/components/charts/HumanResourceCard.jsx
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { hrData } from "../../data/hrData";

export default function HumanResourceCard() {
  return (
    <div className="bg-white dark:bg-gray-800 backdrop-blur-md rounded-xl shadow">
      <div className="bg-green-600 text-white px-4 py-2 rounded-t-xl flex justify-between">
        <h3 className="font-semibold">Human Resource</h3> 
      </div>
      <div className="p-4">
        <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
          Employees
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Combined employees per barangay with male/female breakdown
        </p>

        {/* Stacked Bar Chart for employees */}
        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={hrData}
              margin={{ top: 2, right: 2, left: 2, bottom: 2 }}
              barCategoryGap="30%"
            >
              <XAxis
                dataKey="barangay"
                interval={0}
                angle={-45}
                textAnchor="end"
                height={90}
                tick={{ fontSize: 11 }}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              {/* ✅ Male = dark green, Female = light green */}
              <Bar dataKey="male" stackId="a" fill="#065F46" name="Male" />     {/* dark green */}
              <Bar dataKey="female" stackId="a" fill="#34D399" name="Female" /> {/* light green */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
