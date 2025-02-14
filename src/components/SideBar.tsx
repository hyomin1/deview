import Link from 'next/link';
import BookOpenIcon from './ui/icons/BookOpenIcon';
import QuizIcon from './ui/icons/QuizIcon';

const menus = [
  {
    href: '/interviews',
    icon: <BookOpenIcon />,
    title: '질문 모아보기',
  },
  {
    href: '/quizzes',
    icon: <QuizIcon />,
    title: '채팅 면접',
  },
];

export default function SideBar() {
  return (
    <section className='h-full p-4 bg-white border-r'>
      <nav className='space-y-4'>
        <h1 className='text-3xl font-bold'>
          <Link href='/'>Deview</Link>
        </h1>
        <nav className='space-y-2'>
          <ul>
            {menus.map(({ href, icon, title }) => (
              <li key={href}>
                <Link href={href} className='flex items-center gap-2'>
                  {icon}
                  <p>{title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </nav>
    </section>
  );
}
