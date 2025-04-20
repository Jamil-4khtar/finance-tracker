# Finance Tracker

A modern web application for tracking personal finances, built with Next.js 13, MongoDB, and Tailwind CSS.

## Features

- 💰 Track income and expenses
- 📊 Visualize spending patterns with interactive charts
- 🎯 Set and monitor budgets by category
- 📱 Responsive design for all devices
- 🌙 Light/Dark mode support
- 🔄 Real-time updates

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) 13 (App Router)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB instance (local or Atlas)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/finance-tracker.git
cd finance-tracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a .env.local file:
```
MONGODB_URI=your_mongodb_connection_string
```

4. Seed the database (optional):
```bash
npm run seed
```

5. Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
finance-tracker/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   └── (routes)/       # App routes
├── components/         # React components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── models/            # Mongoose models
├── public/            # Static assets
└── scripts/           # Helper scripts
```

## API Routes

- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `GET /api/budgets` - Get all budgets
- `POST /api/budgets` - Create new budget
- `PUT /api/budgets/[id]` - Update budget
- `DELETE /api/budgets/[id]` - Delete budget

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run seed` - Seed the database with sample data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```

This README includes all the essential information about your project, including features, tech stack, setup instructions, project structure, API routes, and contribution guidelines. Feel free to customize it further based on your specific needs!This README includes all the essential information about your project, including features, tech stack, setup instructions, project structure, API routes, and contribution guidelines. Feel free to customize it further based on your specific needs!

