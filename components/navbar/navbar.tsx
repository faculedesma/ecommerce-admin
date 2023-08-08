import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/navbar/main-nav";
import { StoreSwitcher } from "@/components/store-switcher/store-switcher";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  return (
    <div className="flex items-center justify-between border-b">
      <div className="flex h-16 items-center px-4"></div>
      <StoreSwitcher items={stores} />
      <MainNav />
      <div className="flex items-center space-x-4 ml-auto">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
