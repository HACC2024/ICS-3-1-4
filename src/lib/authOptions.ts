import { compareSync } from 'bcrypt';
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { prisma } from '@/lib/prisma';

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Email and Password',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'john@foo.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Authorizing user with email:', credentials?.email);

        if (!credentials?.email || !credentials.password) {
          console.log('No credentials provided');
          return null;
        }

        // Retrieve user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user) {
          console.log('User not found');
          return null;
        }

        // Log the hashed password from the database for verification
        console.log('Stored hashed password:', user.password);
        console.log('Entered password (plain text):', credentials.password);

        // Manually compare the password using compareSync for debugging
        const isPasswordValid = compareSync(credentials.password, user.password);
        console.log('Password comparison result:', isPasswordValid);

        if (!isPasswordValid) {
          console.log('Password mismatch');
          return null;
        }
        console.log('User authenticated successfully');

        return {
          id: `${user.id}`,
          email: user.email,
          randomKey: user.role,
          persona: user.persona,
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.id,
        randomKey: token.randomKey,
        persona: token.persona, // Add persona to session
      },
    }),
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
          persona: u.persona, // Store persona in JWT token
        };
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
