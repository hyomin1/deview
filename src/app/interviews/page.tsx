import Link from 'next/link';
import FrontendIcon from '@/components/ui/icons/FrontendIcon';
import BackendIcon from '@/components/ui/icons/BackendIcon';

const menus = [
  {
    name: '프론트엔드',
    description: '프론트엔드 개발자를 위한 면접 질문',
    category: 'frontend',
    icon: <FrontendIcon />,
  },
  {
    name: '백엔드',
    description: '백엔드 개발자를 위한 면접 질문',
    category: 'backend',
    icon: <BackendIcon />,
  },
];

export default async function InterviewsPage() {
  return (
    <section className='max-w-6xl mx-auto py-8'>
      <header>
        <h1 className='text-3xl font-bold mb-8'>면접 질문 카테고리</h1>
      </header>
      <nav>
        <ul className='grid md:grid-cols-2 gap-6'>
          {menus.map(({ name, category, icon, description }) => (
            <li key={name}>
              <article>
                <Link
                  href={`/interviews/${category}`}
                  className='flex items-start p-6 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all'
                >
                  {icon}
                  <div>
                    <h2 className='text-xl font-semibold mb-2'>{name}</h2>
                    <p className='text-gray-600'>{description}</p>
                  </div>
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
