import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: '822513270208-9grjmgbnhs4hhdcr9lae7fm68tv5n5st.apps.googleusercontent.com',
      clientSecret: "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",
      // authorization: {
      //   url: "https://example.com/oauth/authorization",
      //   params: { scope: "email"}
      // }
    }),
    // Providers.Twitter({})
  ],
  secret: 'secret',
  // todo 本番ランダム
});