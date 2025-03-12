import Logo from '../utils/logo';

export default function Appbar() {
  return (
    <nav className='fixed top-0 z-50 h-14 w-full border-b bg-white shadow-sm'>
      <div className='flex items-center gap-x-4'>
        <div className='hidden md:flex'>
          {/* <Logo /> */}
          <Logo />
          efvf
        </div>
      </div>
    </nav>
  );
}
