// This legacy page now just redirects to the localized version.
import { redirect } from 'next/navigation';

export default function LegacyNeonRedirect() {
  redirect('/lt/neon');
}
