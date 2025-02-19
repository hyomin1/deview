import dynamic from 'next/dynamic';

const GridLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.GridLoader),
  {
    ssr: false,
  }
);
type Props = {
  color?: string;
  isFixed?: boolean;
};
export default function GridSpinner({
  color = '#2563eb',
  isFixed = false,
}: Props) {
  return (
    <GridLoader
      color={color}
      className={`${
        isFixed &&
        'fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10'
      }`}
    />
  );
}
