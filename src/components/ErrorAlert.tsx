import { AlertTriangle } from 'lucide-react';

type Props = {
  title?: string;
  message: string;
  action: {
    label: string;
    onClick: () => void;
  };
};

export default function ErrorAlert({ title, message, action }: Props) {
  return (
    <div className='rounded-lg bg-red-50 p-6'>
      <div className='flex items-start gap-4'>
        <div className='rounded-full bg-red-100 p-2'>
          <AlertTriangle className='h-6 w-6 text-red-600' />
        </div>

        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-red-800'>{title}</h3>
          <p className='mt-2 text-sm text-red-700'>{message}</p>

          {action && (
            <button
              onClick={action.onClick}
              className='mt-4 inline-flex items-center rounded-lg bg-red-100 px-4 py-2 text-sm font-semibold text-red-800 hover:bg-red-200 transition-colors'
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
