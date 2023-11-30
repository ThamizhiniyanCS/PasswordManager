import React from "react";
import EditPasswordForm from "@/components/EditPasswordForm";
import { getPassword } from "@/lib/fetchData";
import { passwordType } from "@/lib/typeDefinitions";
import { notFound } from "next/navigation";

type Props = {
  searchParams: {
    id: string;
  };
};

const page = async ({ searchParams }: Props) => {
  const currentPassword: passwordType = await getPassword(searchParams.id);

  if (!currentPassword) {
    notFound();
  }

  return (
    <EditPasswordForm
      currentPassword={currentPassword}
      id={currentPassword && searchParams.id}
    />
  );
};

export default page;
