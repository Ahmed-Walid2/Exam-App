import NextAuthProvider from "./_components/next-auth.provider";
import ReactQueryProvider from "./_components/react-query.provider";

type ProvidersType = {
  children: React.ReactNode;
};
export default function Providers({ children }: ProvidersType) {
  return (
    <ReactQueryProvider>
      <NextAuthProvider>{children}</NextAuthProvider>
    </ReactQueryProvider>
  );
}
