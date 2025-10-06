// Root layout now only provides global CSS; locale-specific layout in /app/[lang]/layout
import './globals.css';

export default function Root({ children }: { children: React.ReactNode }) {
  return <>{children}</>; // Immediately handled by middleware redirecting to /en or /lt
}
