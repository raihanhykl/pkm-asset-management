// // app/(dashboard)/dashboard/page.tsx
// "use client";

// import { useAuth } from "@/lib/hooks/use-auth";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ROLE_LABELS } from "@/lib/constants";
// import {
//   Package,
//   FileText,
//   Repeat,
//   Wrench,
//   TrendingUp,
//   TrendingDown,
//   AlertTriangle,
//   CheckCircle,
// } from "lucide-react";

// const stats = [
//   {
//     title: "Total Aset",
//     value: "1,234",
//     description: "+12% dari bulan lalu",
//     icon: Package,
//     trend: "up",
//   },
//   {
//     title: "Permohonan Pending",
//     value: "28",
//     description: "5 menunggu approval",
//     icon: FileText,
//     trend: "neutral",
//   },
//   {
//     title: "Aset Dipinjam",
//     value: "156",
//     description: "8 terlambat dikembalikan",
//     icon: Repeat,
//     trend: "down",
//   },
//   {
//     title: "Dalam Maintenance",
//     value: "23",
//     description: "3 selesai minggu ini",
//     icon: Wrench,
//     trend: "neutral",
//   },
// ];

// const recentActivities = [
//   {
//     id: 1,
//     action: "Aset baru diterima",
//     item: "Laptop Dell XPS 15",
//     time: "5 menit lalu",
//     type: "success",
//   },
//   {
//     id: 2,
//     action: "Peminjaman disetujui",
//     item: "Proyektor Epson",
//     time: "15 menit lalu",
//     type: "success",
//   },
//   {
//     id: 3,
//     action: "Maintenance dimulai",
//     item: "AC Ruang Lab",
//     time: "1 jam lalu",
//     type: "warning",
//   },
//   {
//     id: 4,
//     action: "Permohonan ditolak",
//     item: "Kursi Gaming",
//     time: "2 jam lalu",
//     type: "error",
//   },
//   {
//     id: 5,
//     action: "Aset dikembalikan",
//     item: "Kamera DSLR Canon",
//     time: "3 jam lalu",
//     type: "success",
//   },
// ];

// export default function DashboardPage() {
//   const { user } = useAuth();

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div>
//         <h1 className="text-2xl font-bold tracking-tight">
//           DASHBOARD Selamat datang, {user?.name}!
//         </h1>
//         <p className="text-muted-foreground">
//           Role: {user?.role && ROLE_LABELS[user.role]} — Berikut ringkasan aset
//           hari ini.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat) => {
//           const Icon = stat.icon;
//           return (
//             <Card key={stat.title}>
//               <CardHeader className="flex flex-row items-center justify-between pb-2">
//                 <CardTitle className="text-sm font-medium text-muted-foreground">
//                   {stat.title}
//                 </CardTitle>
//                 <Icon className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stat.value}</div>
//                 <p className="flex items-center gap-1 text-xs text-muted-foreground">
//                   {stat.trend === "up" && (
//                     <TrendingUp className="h-3 w-3 text-green-500" />
//                   )}
//                   {stat.trend === "down" && (
//                     <TrendingDown className="h-3 w-3 text-red-500" />
//                   )}
//                   {stat.description}
//                 </p>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Content Grid */}
//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Recent Activity */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Aktivitas Terbaru</CardTitle>
//             <CardDescription>Aktivitas terkini dalam sistem</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentActivities.map((activity) => (
//                 <div key={activity.id} className="flex items-start gap-3">
//                   <div className="mt-0.5">
//                     {activity.type === "success" && (
//                       <CheckCircle className="h-4 w-4 text-green-500" />
//                     )}
//                     {activity.type === "warning" && (
//                       <AlertTriangle className="h-4 w-4 text-yellow-500" />
//                     )}
//                     {activity.type === "error" && (
//                       <AlertTriangle className="h-4 w-4 text-red-500" />
//                     )}
//                   </div>
//                   <div className="flex-1 space-y-1">
//                     <p className="text-sm font-medium">{activity.action}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {activity.item}
//                     </p>
//                   </div>
//                   <span className="text-xs text-muted-foreground">
//                     {activity.time}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Quick Stats */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Status Aset</CardTitle>
//             <CardDescription>Ringkasan kondisi aset</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="h-3 w-3 rounded-full bg-green-500" />
//                   <span className="text-sm">Tersedia</span>
//                 </div>
//                 <span className="text-sm font-medium">856 (69%)</span>
//               </div>
//               <div className="h-2 rounded-full bg-secondary">
//                 <div className="h-full w-[69%] rounded-full bg-green-500" />
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="h-3 w-3 rounded-full bg-blue-500" />
//                   <span className="text-sm">Dipinjam</span>
//                 </div>
//                 <span className="text-sm font-medium">156 (13%)</span>
//               </div>
//               <div className="h-2 rounded-full bg-secondary">
//                 <div className="h-full w-[13%] rounded-full bg-blue-500" />
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="h-3 w-3 rounded-full bg-yellow-500" />
//                   <span className="text-sm">Maintenance</span>
//                 </div>
//                 <span className="text-sm font-medium">23 (2%)</span>
//               </div>
//               <div className="h-2 rounded-full bg-secondary">
//                 <div className="h-full w-[2%] rounded-full bg-yellow-500" />
//               </div>

//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="h-3 w-3 rounded-full bg-red-500" />
//                   <span className="text-sm">Rusak</span>
//                 </div>
//                 <span className="text-sm font-medium">45 (4%)</span>
//               </div>
//               <div className="h-2 rounded-full bg-secondary">
//                 <div className="h-full w-[4%] rounded-full bg-red-500" />
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// ========== V2 =============

// app/(dashboard)/dashboard/page.tsx
// "use client";

// import { useAuth } from "@/lib/hooks/use-auth";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { ROLE_LABELS } from "@/lib/constants";
// import {
//   Package,
//   FileText,
//   Repeat,
//   Wrench,
//   TrendingUp,
//   TrendingDown,
//   AlertTriangle,
//   CheckCircle,
// } from "lucide-react";

// // TODO: Replace with actual API data
// const stats = [
//   {
//     title: "Total Aset",
//     value: "1,234",
//     description: "+12% dari bulan lalu",
//     icon: Package,
//     trend: "up",
//   },
//   {
//     title: "Permohonan Pending",
//     value: "28",
//     description: "5 menunggu approval",
//     icon: FileText,
//     trend: "neutral",
//   },
//   {
//     title: "Aset Dipinjam",
//     value: "156",
//     description: "8 terlambat dikembalikan",
//     icon: Repeat,
//     trend: "down",
//   },
//   {
//     title: "Dalam Maintenance",
//     value: "23",
//     description: "3 selesai minggu ini",
//     icon: Wrench,
//     trend: "neutral",
//   },
// ];

// const recentActivities = [
//   {
//     id: 1,
//     action: "Aset baru diterima",
//     item: "Laptop Dell XPS 15",
//     time: "5 menit lalu",
//     type: "success",
//   },
//   {
//     id: 2,
//     action: "Peminjaman disetujui",
//     item: "Proyektor Epson",
//     time: "15 menit lalu",
//     type: "success",
//   },
//   {
//     id: 3,
//     action: "Maintenance dimulai",
//     item: "AC Ruang Lab",
//     time: "1 jam lalu",
//     type: "warning",
//   },
//   {
//     id: 4,
//     action: "Permohonan ditolak",
//     item: "Kursi Gaming",
//     time: "2 jam lalu",
//     type: "error",
//   },
//   {
//     id: 5,
//     action: "Aset dikembalikan",
//     item: "Kamera DSLR Canon",
//     time: "3 jam lalu",
//     type: "success",
//   },
// ];

// // Asset status summary data
// const assetStatusData = [
//   { label: "Tersedia", value: 856, percentage: 69, color: "bg-green-500" },
//   { label: "Dipinjam", value: 156, percentage: 13, color: "bg-blue-500" },
//   { label: "Maintenance", value: 23, percentage: 2, color: "bg-yellow-500" },
//   { label: "Rusak", value: 45, percentage: 4, color: "bg-red-500" },
//   { label: "Hilang", value: 12, percentage: 1, color: "bg-gray-500" },
//   {
//     label: "Tidak Digunakan",
//     value: 142,
//     percentage: 11,
//     color: "bg-slate-500",
//   },
// ];

// export default function DashboardPage() {
//   const { user } = useAuth();

//   return (
//     <div className="space-y-6">
//       {/* Welcome Section */}
//       <div>
//         <h1 className="text-2xl font-bold tracking-tight">
//           Selamat datang, {user?.full_name || user?.username}!
//         </h1>
//         <p className="text-muted-foreground">
//           Role: {user?.role?.name && ROLE_LABELS[user.role.name]} — Berikut
//           ringkasan aset hari ini.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat) => {
//           const Icon = stat.icon;
//           return (
//             <Card key={stat.title}>
//               <CardHeader className="flex flex-row items-center justify-between pb-2">
//                 <CardTitle className="text-sm font-medium text-muted-foreground">
//                   {stat.title}
//                 </CardTitle>
//                 <Icon className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stat.value}</div>
//                 <p className="flex items-center gap-1 text-xs text-muted-foreground">
//                   {stat.trend === "up" && (
//                     <TrendingUp className="h-3 w-3 text-green-500" />
//                   )}
//                   {stat.trend === "down" && (
//                     <TrendingDown className="h-3 w-3 text-red-500" />
//                   )}
//                   {stat.description}
//                 </p>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Content Grid */}
//       <div className="grid gap-6 lg:grid-cols-2">
//         {/* Recent Activity */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Aktivitas Terbaru</CardTitle>
//             <CardDescription>Aktivitas terkini dalam sistem</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentActivities.map((activity) => (
//                 <div key={activity.id} className="flex items-start gap-3">
//                   <div className="mt-0.5">
//                     {activity.type === "success" && (
//                       <CheckCircle className="h-4 w-4 text-green-500" />
//                     )}
//                     {activity.type === "warning" && (
//                       <AlertTriangle className="h-4 w-4 text-yellow-500" />
//                     )}
//                     {activity.type === "error" && (
//                       <AlertTriangle className="h-4 w-4 text-red-500" />
//                     )}
//                   </div>
//                   <div className="flex-1 space-y-1">
//                     <p className="text-sm font-medium">{activity.action}</p>
//                     <p className="text-xs text-muted-foreground">
//                       {activity.item}
//                     </p>
//                   </div>
//                   <span className="text-xs text-muted-foreground">
//                     {activity.time}
//                   </span>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Asset Status Summary */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Status Aset</CardTitle>
//             <CardDescription>
//               Ringkasan kondisi aset berdasarkan status
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {assetStatusData.map((status) => (
//                 <div key={status.label}>
//                   <div className="flex items-center justify-between mb-2">
//                     <div className="flex items-center gap-2">
//                       <div className={`h-3 w-3 rounded-full ${status.color}`} />
//                       <span className="text-sm">{status.label}</span>
//                     </div>
//                     <span className="text-sm font-medium">
//                       {status.value} ({status.percentage}%)
//                     </span>
//                   </div>
//                   <div className="h-2 rounded-full bg-secondary">
//                     <div
//                       className={`h-full rounded-full ${status.color}`}
//                       style={{ width: `${status.percentage}%` }}
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// ========== V3 =============
// app/(dashboard)/dashboard/page.tsx
"use client";

import { useAuth } from "@/lib/hooks/use-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ROLE_LABELS } from "@/lib/constants";
import {
  Package,
  FileText,
  Repeat,
  Wrench,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  Clock,
} from "lucide-react";
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { dummyAssets, dummyAssetRequests } from "@/lib/dummy-data";

export default function DashboardPage() {
  const { user } = useAuth();

  // Calculate stats from dummy data
  const totalAssets = dummyAssets.length;
  const pendingRequests = dummyAssetRequests.filter(
    (r) => r.status === "submitted"
  ).length;
  const borrowedAssets = dummyAssets.filter(
    (a) => a.status === "borrowed"
  ).length;
  const maintenanceAssets = dummyAssets.filter(
    (a) => a.status === "maintenance"
  ).length;

  const stats = [
    {
      title: "Total Aset",
      value: totalAssets.toString(),
      description: "Terdaftar dalam sistem",
      icon: Package,
      trend: "up",
    },
    {
      title: "Permohonan Pending",
      value: pendingRequests.toString(),
      description: "Menunggu approval",
      icon: FileText,
      trend: "neutral",
    },
    {
      title: "Aset Dipinjam",
      value: borrowedAssets.toString(),
      description: "Sedang dipinjam",
      icon: Repeat,
      trend: "neutral",
    },
    {
      title: "Dalam Maintenance",
      value: maintenanceAssets.toString(),
      description: "Sedang diperbaiki",
      icon: Wrench,
      trend: "neutral",
    },
  ];

  // Asset status data for pie chart
  const assetStatusData = [
    {
      name: "Tersedia",
      value: dummyAssets.filter((a) => a.status === "available").length,
      color: "#22c55e",
    },
    {
      name: "Dipinjam",
      value: dummyAssets.filter((a) => a.status === "borrowed").length,
      color: "#3b82f6",
    },
    {
      name: "Maintenance",
      value: dummyAssets.filter((a) => a.status === "maintenance").length,
      color: "#eab308",
    },
    {
      name: "Rusak",
      value: dummyAssets.filter((a) => a.status === "damaged").length,
      color: "#ef4444",
    },
  ].filter((item) => item.value > 0);

  // Asset by category for bar chart
  const categoryData = [
    { name: "Elektronik", count: 5 },
    { name: "Furniture", count: 3 },
    { name: "Komputer", count: 8 },
    { name: "Lab", count: 4 },
  ];

  // Monthly requests trend
  const monthlyData = [
    { month: "Jul", permohonan: 12, peminjaman: 28 },
    { month: "Agt", permohonan: 18, peminjaman: 35 },
    { month: "Sep", permohonan: 15, peminjaman: 42 },
    { month: "Okt", permohonan: 22, peminjaman: 38 },
    { month: "Nov", permohonan: 20, peminjaman: 45 },
    { month: "Des", permohonan: 25, peminjaman: 50 },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "Aset baru ditambahkan",
      item: "Laptop Dell XPS 15",
      time: "5 menit lalu",
      type: "success",
      icon: CheckCircle,
    },
    {
      id: 2,
      action: "Peminjaman disetujui",
      item: "Proyektor Epson",
      time: "15 menit lalu",
      type: "success",
      icon: CheckCircle,
    },
    {
      id: 3,
      action: "Maintenance dimulai",
      item: "AC Ruang Lab",
      time: "1 jam lalu",
      type: "warning",
      icon: Wrench,
    },
    {
      id: 4,
      action: "Permohonan pending",
      item: "Laptop untuk Lab",
      time: "2 jam lalu",
      type: "pending",
      icon: Clock,
    },
    {
      id: 5,
      action: "Aset dikembalikan",
      item: "Kamera DSLR Canon",
      time: "3 jam lalu",
      type: "success",
      icon: CheckCircle,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          Selamat datang, {user?.full_name || user?.username}!
        </h1>
        <p className="text-muted-foreground">
          {user?.role?.name && ROLE_LABELS[user.role.name]} — Berikut ringkasan
          aset hari ini.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  {stat.trend === "up" && (
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  )}
                  {stat.trend === "down" && (
                    <TrendingDown className="h-3 w-3 text-red-500" />
                  )}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Status Aset</CardTitle>
            <CardDescription>Distribusi status aset saat ini</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={assetStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {assetStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Aset per Kategori</CardTitle>
            <CardDescription>Jumlah aset berdasarkan kategori</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Trend Line Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Tren Aktivitas</CardTitle>
          <CardDescription>
            Permohonan dan peminjaman 6 bulan terakhir
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="permohonan"
                stroke="#8b5cf6"
                strokeWidth={2}
                name="Permohonan"
              />
              <Line
                type="monotone"
                dataKey="peminjaman"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Peminjaman"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
          <CardDescription>Aktivitas terkini dalam sistem</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex items-start gap-3">
                  <div className="mt-0.5">
                    <Icon
                      className={`h-4 w-4 ${
                        activity.type === "success"
                          ? "text-green-500"
                          : activity.type === "warning"
                          ? "text-yellow-500"
                          : activity.type === "pending"
                          ? "text-blue-500"
                          : "text-red-500"
                      }`}
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.item}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
