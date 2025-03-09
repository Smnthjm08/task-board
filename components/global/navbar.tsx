import Link from "next/link";
import Logo from "../logo";
import { Button } from "../ui/button";
// import { ThemeToggle } from "./theme-toogle";

export const NavBar = () => {
  return (
    <div className="fixed top-0 w-full h-14 px-8 border-b shadow-sm bg-white flex items-center">
      <div className="md:max-w-screen-2xl mx-auto flex items-center w-full justify-between">
        <Logo />

        <div className="space-x-4 md:block md:w-auto flex items-center justify-between w-full ">
          {/* <ThemeToggle /> */}
          <Button size={"sm"} variant={"outline"} asChild>
            <Link href={"/auth/login"}>Login</Link>
          </Button>
          <Button size={"sm"} asChild>
            <Link href={"/auth/login"}>Get Taskify for Free</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
