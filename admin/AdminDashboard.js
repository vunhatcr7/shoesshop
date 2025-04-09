import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { FaUser, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import Logo from "../assets/img/logo1.png"
import Navbar from '../component/NavbarAdmin';
import SidebarAdmin from '../component/SideBarAdmin';
const data = [
  { name: 'Jan', sales: 120 },
  { name: 'Feb', sales: 300 },
  { name: 'Mar', sales: 180 },
  { name: 'Apr', sales: 250 },
  { name: 'May', sales: 140 },
  { name: 'Jun', sales: 160 },
  { name: 'Jul', sales: 220 },
  { name: 'Aug', sales: 100 },
  { name: 'Sep', sales: 180 },
  { name: 'Oct', sales: 300 },
  { name: 'Nov', sales: 220 },
  { name: 'Dec', sales: 90 },
];

const pieData = [
  { name: 'USA', value: 79 },
  { name: 'France', value: 21 },
];

const COLORS = ['#0088FE', '#00C49F'];

export default function Dashboard() {
  return (
    <div className='flex'>
        <SidebarAdmin/>
         <div className="flex-1 p-4">
         <Navbar/>  
    <div className="p-4 grid grid-cols-2 gap-4">
      {/* Tổng số khách hàng & đơn hàng */}
      <div className=" max-w-md bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
        <FaUser size={32} className="text-blue-500" />
        <div>
          <p className="text-gray-500">Customers</p>
          <h2 className="text-2xl font-bold">3,782</h2>
        </div>
      </div>
      <div className=" max-w-md bg-white p-4 rounded-xl shadow-md flex items-center justify-between">
        <FaShoppingCart size={32} className="text-green-500" />
        <div>
          <p className="text-gray-500">Orders</p>
          <h2 className="text-2xl font-bold">5,359</h2>
        </div>
      </div> 
     

      {/* Biểu đồ doanh số tháng */}
      <div className=" w-1/2 wcol-span-2 bg-white p-4 rounded-xl shadow-md">
        <h3 className="font-bold">Monthly Sales</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#007bff" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ hình tròn phân bổ khách hàng */}
      <div className="w-1/2 bg-white p-4 rounded-xl shadow-md">
        <h3 className="font-bold">Customers Demographic</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
    </div>
  );
}
