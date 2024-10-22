import { List } from 'lucide-react';

const ViewToggle = ({ view, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="bg-black text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-800 transition-colors flex items-center"
    >
      <span className="mr-2">Show {view === 'map' ? 'list' : 'map'}</span>
      <List className="h-4 w-4" />
    </button>
  );
};

export default ViewToggle;