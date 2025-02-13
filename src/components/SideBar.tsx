import Link from 'next/link';

export default function SideBar() {
  return (
    <section className='h-full p-4 bg-white border-r'>
      <nav className='space-y-4'>
        <h1 className='text-xl font-bold'>Deview</h1>
        <nav className='space-y-2'>
          <Link href='/ab'>a</Link>
          <li>메뉴 1</li>
          <li>메뉴 2</li>
          <li>메뉴 3</li>
        </nav>
      </nav>
    </section>
  );
}
