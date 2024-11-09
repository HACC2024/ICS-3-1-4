// src/types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      id?: string | null;
      randomKey?: string | null;
      persona?: string | null; // Ensure persona is added here
    };
  }
  interface JWT {
    id?: string;
    randomKey?: string;
    persona?: string; // Ensure persona is added here too
  }
}
