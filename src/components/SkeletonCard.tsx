import React from 'react';
import Skeleton from 'react-loading-skeleton';
import parse from 'html-react-parser';

export interface CardProps {
  cardType?: 'card' | 'feature' | 'detailed';
  title: string;
  id?: number;
  subtitle: string;
  description: string;
  onClick?: (e: any) => void;
}

const SkeletonCard = ({ title, subtitle, description }: CardProps) => {
  const base_card = 'text-left border-b-2 leading-tight mb-4 w-full';
  let mode = 'text-black border-black bg-gray-100';
  let featureText = description;
  const classes = `${base_card} ${mode} py-2`;

  return (
    <div>
      <Skeleton height={120} />
      <div className={classes}>
        <Skeleton count={1} />
        <div className="px-4 pt-1">
          <h1 className="text-lg font-bold font-poppins">{title}</h1>
          <h3 className="text-sm font-bold font-roboto">{subtitle}</h3>
        </div>
        <div className="px-4 py-1">
          <Skeleton count={1} />
          <div className="text-md font-roboto">{parse(`${featureText}`)}</div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
