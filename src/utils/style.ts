export const getLevelStyle = (level: number) => {
  switch (level) {
    case 3:
      return 'bg-purple-100 text-purple-600';
    case 2:
      return 'bg-emerald-100 text-emerald-600';
    case 1:
      return 'bg-blue-100 text-blue-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};
