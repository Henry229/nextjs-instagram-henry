import { NextAuthOptions } from 'next-auth';
import prisma from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GoogleProvider from 'next-auth/providers/google';
import { Adapter } from 'next-auth/adapters';

export const config = {
  pages: {
    signIn: '/login',
  },
  adapter: PrismaAdapter(prisma) as unknown as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.username = token.username;
      }

      return session;
    },
    async jwt({ token, user }) {
      const prismaUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (!prismaUser) {
        token.id = user.id;
        return token;
      }
      if (!prismaUser.username) {
        await prisma.user.update({
          where: {
            id: prismaUser.id,
          },
          data: {
            username: prismaUser.name?.split(' ').join('').toLowerCase(),
          },
        });
      }

      return {
        id: prismaUser.id,
        name: prismaUser.name,
        email: prismaUser.email,
        username: prismaUser.username,
        picture: prismaUser.image,
      };
    },
  },
} satisfies NextAuthOptions;
