# StyleHub - Modern E-commerce Platform

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Docker and Docker Compose
- PostgreSQL

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/stylehub.git
cd stylehub
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following content:

```env
DATABASE_URL="postgres://myuser:mypassword@localhost:5432/mydatabase"
```

4. Start the development environment:

```bash
# Start the database
docker compose up -d

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Development

- `npm run dev` - Start development server
