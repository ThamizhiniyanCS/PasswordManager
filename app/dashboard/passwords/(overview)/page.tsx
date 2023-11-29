import Password from "@/components/Password";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getPasswords } from "@/lib/fetchData";
import { extendedPasswordType } from "@/lib/typeDefinitions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import PasswordDetails from "@/components/PasswordDetails";
import { Suspense } from "react";
import PasswordsSkeleton from "@/components/skeletons/PasswordsSkeleton";

type Props = {
  searchParams: {
    id: string;
  };
};

const page = async ({ searchParams }: Props) => {
  const PASSWORDS: extendedPasswordType[] = await getPasswords();

  const details: "" | extendedPasswordType | undefined =
    searchParams.id &&
    PASSWORDS.find((password) => password._id === searchParams.id);

  return (
    <div className="w-full h-full flex justify-between">
      <Suspense fallback={<PasswordsSkeleton />}>
        <ScrollArea className="h-full w-full rounded-xl border p-2 lg:w-[49%]">
          {PASSWORDS.map((password) => (
            <Password
              key={password._id}
              _id={password._id}
              account_description={password.account_description}
              user_id={password.user_id}
              username={password.username}
              password={password.password}
              password_score={password.password_score}
              url={password.url}
              createdAt={password.createdAt}
              updatedAt={password.updatedAt}
            />
          ))}
        </ScrollArea>
      </Suspense>

      {details ? (
        <PasswordDetails details={details as extendedPasswordType} />
      ) : (
        <div className="hidden h-full w-full rounded-xl border p-2 lg:flex justify-center items-center lg:w-[49%]">
          <p>Select a Password to display its Details.</p>
        </div>
      )}
      <Link href="/dashboard/passwords/create">
        <Button className="absolute w-16 h-16 flex justify-centre items-center bg-primary right-10 bottom-24 rounded-full border border-white">
          <span className="material-symbols-outlined text-6xl text-white">
            add
          </span>
        </Button>
      </Link>
    </div>
  );
};

export default page;
