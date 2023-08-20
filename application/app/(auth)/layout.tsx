import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";

export const metadata = {
  title: "Threads",
  description: "A Next.js 13 Meta Threads Full stack Application",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-dark-1`}>
          <div 
          className="w-full flex justify-center items-center min-h-screen"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1689439518196-f48a24b49fb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          >
            {children}
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
