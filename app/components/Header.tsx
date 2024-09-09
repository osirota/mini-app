import React from 'react';
import Link from 'next/link';
import { HOME, PROFILE } from '../constants/routes';

const Header: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-gray-900 p-4 text-white">
      <Link href={HOME} className="text-lg font-bold">TG MINI APP</Link>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <span className="text-sm">33.52$</span>
        </div>
        <div className="text-sm bg-red-600 px-2 py-1 rounded">0.00$</div>
        <Link href={PROFILE} className="bg-pink-600 w-8 h-8 rounded-full"></Link>
      </div>
    </div>
  );
};

export default Header;
