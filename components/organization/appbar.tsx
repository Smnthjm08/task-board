import Logo from "../logo";

export default function Appbar() {
  return (
    <nav className="fixed z-50 top-0 w-full h-14 border-b shadow-sm bg-white">
      <div className="flex items-center gap-x-4">
        <div className="hidden md:flex">
          {/* <Logo /> */}
          <Logo />
          efvf
        </div>
      </div>
    </nav>
  );
}
