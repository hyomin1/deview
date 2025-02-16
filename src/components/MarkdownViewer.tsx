import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Pencil, Save, X } from 'lucide-react';
import { useSession } from 'next-auth/react';

const customStyle = {
  fontSize: '14px',
  borderRadius: '8px',
  padding: '1em',
  margin: '1em 0',
  background: '#1E1E1E',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

type Props = {
  id: string;
  initialAnswer: string;
};

export default function MarkdownViewer({ id, initialAnswer }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [answer, setAnswer] = useState(initialAnswer);
  const [editContent, setEditContent] = useState(initialAnswer);

  const { data: session } = useSession();

  const isAdmin = session?.user?.role === 'ADMIN';

  const handleSave = async () => {
    setAnswer(editContent);
    setIsEditing(false);

    try {
      await fetch('/api/interview', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, answer: editContent }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setEditContent(answer);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className='w-full'>
        {isAdmin && (
          <div className='flex justify-end gap-2 mb-4'>
            <button
              onClick={handleSave}
              className='flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition-colors'
            >
              <Save size={16} />
              저장
            </button>
            <button
              onClick={handleCancel}
              className='flex items-center gap-2 px-3 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors'
            >
              <X size={16} />
              취소
            </button>
          </div>
        )}

        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className='w-full h-96 p-4 text-sm font-mono bg-gray-800 text-gray-200 rounded-lg border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
        />
        <div className='mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg'>
          <h3 className='text-lg font-semibold mb-2'>미리보기</h3>
          <div className='prose lg:prose-lg dark:prose-invert max-w-none'>
            <Markdown remarkPlugins={[remarkGfm]}>{editContent}</Markdown>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className='w-full max-w-none'>
      {isAdmin && (
        <div className='flex justify-end mb-4'>
          <button
            onClick={() => setIsEditing(true)}
            className='flex items-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors'
          >
            <Pencil size={16} />
            편집
          </button>
        </div>
      )}

      <div className='prose lg:prose-lg dark:prose-invert prose-pre:p-0 prose-pre:bg-transparent'>
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, ...rest } = props;
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <div className='relative group'>
                  <SyntaxHighlighter
                    {...rest}
                    ref={null}
                    language={match[1]}
                    style={vscDarkPlus}
                    customStyle={customStyle}
                    PreTag='div'
                    showLineNumbers={true}
                    wrapLines={true}
                    wrapLongLines={true}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                  <div className='absolute hidden group-hover:flex top-2 right-2 gap-2'>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(String(children))
                      }
                      className='px-2 py-1 text-xs bg-gray-700 text-gray-200 rounded hover:bg-gray-600 transition-colors'
                    >
                      복사
                    </button>
                  </div>
                </div>
              ) : (
                <code
                  {...rest}
                  className='px-2 py-1 text-sm bg-gray-800 text-gray-200 rounded'
                >
                  {children}
                </code>
              );
            },
            blockquote(props) {
              return (
                <div className='my-4 border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-800 rounded-r-lg'>
                  <blockquote
                    {...props}
                    className='px-4 py-3 text-gray-700 dark:text-gray-300'
                  />
                </div>
              );
            },
            div(props) {
              const className = props.className || '';
              if (className.includes('callout')) {
                return (
                  <div className='my-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border-l-4 border-blue-500 shadow-sm'>
                    {props.children}
                  </div>
                );
              }
              return <div {...props} />;
            },
            ul(props) {
              return (
                <ul
                  {...props}
                  className='space-y-2 list-disc list-inside marker:text-blue-500'
                />
              );
            },
            ol(props) {
              return (
                <ol
                  {...props}
                  className='space-y-2 list-decimal list-inside marker:text-blue-500'
                />
              );
            },
            h1(props) {
              return (
                <h1
                  {...props}
                  className='text-3xl font-bold my-4 pb-2 border-b-2 border-gray-200 dark:border-gray-700'
                />
              );
            },
            h2(props) {
              return (
                <h2
                  {...props}
                  className='text-2xl font-semibold my-3 pb-1 border-b border-gray-200 dark:border-gray-700'
                />
              );
            },
            h3(props) {
              return <h3 {...props} className='text-xl font-semibold my-2' />;
            },
            table(props) {
              return (
                <div className='overflow-x-auto my-4'>
                  <table
                    {...props}
                    className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'
                  />
                </div>
              );
            },
            th(props) {
              return (
                <th
                  {...props}
                  className='px-4 py-2 bg-gray-100 dark:bg-gray-800 font-semibold text-left'
                />
              );
            },
            td(props) {
              return (
                <td
                  {...props}
                  className='px-4 py-2 border-t border-gray-200 dark:border-gray-700'
                />
              );
            },
          }}
        >
          {answer}
        </Markdown>
      </div>
    </section>
  );
}
