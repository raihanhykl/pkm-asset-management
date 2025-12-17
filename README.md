# PKM Asset Management System

Sistem Manajemen Aset berbasis web untuk PKM Kampus, dibangun dengan Next.js 14 dan TypeScript.

## 🎯 Fitur Utama

### ✅ Master Data

- **Aset** - Kelola data aset dengan informasi lengkap (kategori, lokasi, vendor, kondisi, status)
- **Kategori** - Manajemen kategori aset
- **Lokasi** - Manajemen lokasi penyimpanan aset
- **Vendor** - Database vendor/supplier
- **Pengguna** - Manajemen user dengan role-based access

### ✅ Permohonan Aset

- Buat permohonan pengadaan aset baru
- Multiple items per permohonan
- Workflow approval (Submit → Approved/Rejected)
- Tracking status permohonan

### ✅ Peminjaman Aset

- Peminjaman aset dengan tracking lengkap
- Support peminjam siswa/guru
- Assignment guru penanggung jawab
- Ruang kelas destination
- Status tracking (Pending → Issued → Returned)

### ✅ Dashboard & Reporting

- Real-time statistics
- Visual charts (Pie, Bar, Line charts)
- Recent activities feed
- Asset status distribution

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Form Management**: React Hook Form + Zod
- **Charts**: Recharts
- **Icons**: Lucide React
- **Data Fetching**: TanStack Query (React Query)

## 📋 Prerequisites

- Node.js 18+
- npm/yarn/pnpm

## 🚀 Installation

1. Clone repository
   \`\`\`bash
   git clone <repository-url>
   cd pkm-asset-management
   \`\`\`

2. Install dependencies
   \`\`\`bash
   npm install
   \`\`\`

3. Setup environment variables
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`

Edit `.env.local`:
\`\`\`
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME="PKM Asset Management"
\`\`\`

4. Run development server
   \`\`\`bash
   npm run dev
   \`\`\`

5. Open browser
   \`\`\`
   http://localhost:3000
   \`\`\`

## 👤 Demo Accounts

**Admin:**

- Username: \`admin\`
- Password: \`password123\`

**Sarpras:**

- Username: \`sarpras01\`
- Password: \`password123\`

**Guru:**

- Username: \`guru01\`
- Password: \`password123\`

## 📁 Project Structure

\`\`\`
pkm-asset-management/
├── app/
│ ├── (auth)/ # Authentication pages
│ │ └── login/
│ ├── (dashboard)/ # Protected pages
│ │ ├── dashboard/ # Main dashboard
│ │ ├── master/ # Master data pages
│ │ │ ├── aset/
│ │ │ ├── kategori/
│ │ │ ├── lokasi/
│ │ │ ├── vendor/
│ │ │ └── pengguna/
│ │ ├── permohonan-aset/
│ │ └── peminjaman/
│ ├── layout.tsx
│ └── page.tsx
├── components/
│ ├── layout/ # Layout components
│ ├── shared/ # Reusable components
│ └── ui/ # Shadcn UI components
├── lib/
│ ├── api/ # API configuration
│ ├── hooks/ # Custom hooks
│ ├── schemas/ # Zod validation schemas
│ ├── utils/ # Utility functions
│ ├── constants.ts
│ └── dummy-data.ts # Demo data
└── types/
└── index.ts # TypeScript definitions
\`\`\`

## 🎨 UI Components

Menggunakan [Shadcn UI](https://ui.shadcn.com/) untuk konsistensi dan maintainability:

- Button, Input, Select, Textarea
- Card, Dialog, Sheet, Popover
- Table, DataTable (with sorting & filtering)
- Badge, Avatar, Separator
- Toast notifications
- Form components with validation

## 📊 Data Management

**Current State: MVP Demo Mode**

- Menggunakan dummy data (in-memory)
- CRUD operations functional di frontend
- Data persistence in browser session only

**Future: Backend Integration**

- Connect to REST API
- Replace dummy data dengan API calls
- Enable real-time data sync

## 🔐 Authentication

- JWT-based authentication (ready for backend)
- Role-based access control (RBAC)
- Protected routes dengan middleware
- Session management dengan cookies

## 📱 Responsive Design

- Mobile-first approach
- Sidebar collapsible
- Mobile navigation sheet
- Touch-friendly UI elements

## 🧪 Development

**Available Scripts:**

\`\`\`bash
npm run dev # Start development server
npm run build # Build for production
npm run start # Start production server
npm run lint # Run ESLint
\`\`\`

## 🚢 Deployment

**Recommended Platforms:**

- Vercel (easiest)
- Netlify
- AWS Amplify
- Docker

**Build command:**
\`\`\`bash
npm run build
\`\`\`

## 📝 Next Steps (Backend Integration)

1. Setup backend API endpoints matching:

   - \`/api/auth/\*\`
   - \`/api/assets/\*\`
   - \`/api/asset-categories/\*\`
   - \`/api/locations/\*\`
   - \`/api/vendors/\*\`
   - \`/api/users/\*\`
   - \`/api/asset-requests/\*\`
   - \`/api/asset-loans/\*\`

2. Update \`.env.local\` dengan backend URL

3. Remove dummy data imports dan gunakan hooks yang sudah ada

4. Test API integration

5. Deploy!

## 👥 User Roles

- **Admin**: Full access, user management
- **Sarpras**: Asset management, approvals
- **Bendahara**: Budget & finance
- **Guru**: Request assets, borrow items
- **Siswa**: Limited borrowing access

## 📄 License

MIT License - Feel free to use for educational purposes

## 🤝 Contributing

Contributions welcome! Please read contributing guidelines first.

## 📧 Support

For support, email: support@pkm.ac.id

---

**Built with ❤️ for PKM Campus**
