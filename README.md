```markdown
# Job Application Tracker

A full-stack job application tracking system built with Next.js, featuring a Kanban board interface for managing your job search.

## 🎥 Tutorial

This project accompanies a YouTube tutorial series where you'll learn how to build a complete job application tracker with authentication, drag-and-drop functionality, and real-time updates.

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 16 | Framework (App Router) |
| TypeScript | Language |
| React 19 | UI Library |
| Tailwind CSS 4 | Styling |
| MongoDB + Mongoose | Database |
| Better Auth | Authentication |
| dnd-kit | Drag & Drop |
| Radix UI | UI Components |
| Lucide React | Icons |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd job-application-tracker
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env.local` file

```env
MONGODB_URI=your_mongodb_connection_string
```

4. Run the development server

```bash
npm run dev
```

5. Open http://localhost:3000 in your browser

## 📚 Tutorial: Building the Application

### 1. Database Setup (`lib/db.ts`)

The database connection uses a caching pattern to prevent multiple connections in development.

```typescript
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };
```

### 2. Data Models (`lib/models/`)

The application uses three main models:

| Model | Description |
|-------|-------------|
| Board | Represents a user's job hunt board (one per user) |
| Column | Represents Kanban columns (Wish List, Applied, Interviewing, etc.) |
| JobApplication | Stores individual job application data |

**Relationship Structure:**

```
Board (1) → (many) Columns → (many) JobApplications
```

### 3. Authentication (`lib/auth/auth.ts`)

Better Auth is configured with MongoDB adapter. When a user signs up, a board is automatically created for them.

```typescript
export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          await initializeUserBoard(user.id);
        },
      },
    },
  },
});
```

### 4. Server Actions (`lib/actions/job-applications.ts`)

Server actions handle all data mutations:

| Action | Purpose |
|--------|---------|
| `createJobApplication` | Add new job application |
| `updateJobApplication` | Move or reorder jobs |
| `deleteJobApplication` | Remove job application |

**Key Pattern:** All actions check authentication, verify ownership, and revalidate cache.

### 5. Drag & Drop Implementation (`components/kanban-board.tsx`)

The Kanban board uses `@dnd-kit` with these components:

| Component | Purpose |
|-----------|---------|
| `DndContext` | Main drag and drop context |
| `DroppableColumn` | Columns that accept dropped items |
| `SortableJobCard` | Individual draggable job cards |
| `SortableContext` | Manages sortable items within columns |

**Drag Flow:**

1. User starts dragging → `handleDragStart` sets active item
2. User drops → `handleDragEnd` calculates new position
3. `moveJob` hook updates database

### 6. Client State Management (`lib/hooks/useBoards.ts`)

Custom hook that maintains local state synchronized with the server and provides mutation functions like `moveJob` for drag operations with optimistic updates.

### 7. Dashboard Page (`app/dashboard/page.tsx`)

Server component that:
- Fetches user session
- Loads board data with populated relationships
- Uses React Suspense for loading states
- Redirects unauthenticated users

### 8. Seeding the Database (`scripts/seed.ts`)

**Important Performance Note:** Use batch insert instead of creating jobs one by one.

**Recommended Approach:**

```typescript
const applicationsToCreate = [];

for (const [columnName, jobs] of Object.entries(jobsByColumn)) {
  for (let i = 0; i < jobs.length; i++) {
    applicationsToCreate.push({
      company: jobs[i].company,
      position: jobs[i].position,
      columnId: columnMap[columnName],
      boardId: board._id,
      userId: USER_ID,
      order: i,
    });
  }
}

await JobApplication.insertMany(applicationsToCreate);
```

### 9. User Board Initialization (`lib/init-user-board.ts`)

When a user signs up, a default board is created with predefined columns:

- Wish List
- Applied
- Interviewing
- Offer
- Rejected

## 🎯 Key Learning Points

| Topic | Description |
|-------|-------------|
| Server Components vs Client Components | Understanding when to use each |
| Server Actions | Type-safe mutations without API routes |
| Database Relationships | Mongoose populate for efficient queries |
| Drag & Drop | Implementing complex interactions with dnd-kit |
| Authentication | Better Auth integration with database hooks |
| State Management | Combining server state with client state |
| Performance | Batch operations for database efficiency |

## 📝 Available Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run seed:jobs` | Seed database with sample jobs |

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `MONGODB_URI` | MongoDB connection string |

## 📖 Project Structure

```
job-application-tracker/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── dashboard/         # Main dashboard page
│   └── sign-in/           # Authentication pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── kanban-board.tsx  # Main Kanban component
├── lib/
│   ├── actions/          # Server actions
│   ├── auth/             # Authentication setup
│   ├── hooks/            # Custom React hooks
│   ├── models/           # Mongoose models
│   └── db.ts             # Database connection
└── scripts/              # Utility scripts
    └── seed.ts           # Database seeding
```

## 🎓 Next Steps

After completing this tutorial, consider:

- Adding job application status history
- Implementing search and filtering
- Adding email notifications for status changes
- Creating multiple boards per user
- Adding job application notes/attachments
- Implementing analytics dashboard

## 📄 License

ASM Shad
```