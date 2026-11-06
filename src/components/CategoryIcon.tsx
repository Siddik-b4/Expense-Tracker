import React from 'react';
import {
  Utensils,
  Car,
  ShoppingBag,
  GraduationCap,
  Film,
  ReceiptText,
  Tag,
  CircleDollarSign,
} from 'lucide-react';
import { ExpenseCategory } from '../types/expense';

interface CategoryIconProps {
  category: ExpenseCategory | string;
  className?: string;
  size?: number;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({
  category,
  className = 'w-5 h-5',
  size,
}) => {
  switch (category) {
    case 'Food':
      return <Utensils className={className} size={size} />;
    case 'Travel':
      return <Car className={className} size={size} />;
    case 'Shopping':
      return <ShoppingBag className={className} size={size} />;
    case 'Education':
      return <GraduationCap className={className} size={size} />;
    case 'Entertainment':
      return <Film className={className} size={size} />;
    case 'Bills':
      return <ReceiptText className={className} size={size} />;
    case 'Other':
      return <Tag className={className} size={size} />;
    default:
      return <CircleDollarSign className={className} size={size} />;
  }
};
