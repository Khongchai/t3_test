import { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="w-full border-x border-slate-400 border-x-white md:max-w-2xl ">
        {props.children}
      </div>
    </main>
  );
};
