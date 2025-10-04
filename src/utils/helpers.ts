import { format } from 'date-fns';
import { IMAGE_SIZES, TMDB_IMAGE_BASE_URL } from './constants';

export const getImageUrl = (path: string | null, size: keyof typeof IMAGE_SIZES = 'POSTER'): string => {
  if (!path) return '/placeholder-movie.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${IMAGE_SIZES[size]}${path}`;
};

export const formatDate = (dateString: string, formatString: string = 'MMMM dd, yyyy'): string => {
  if (!dateString) return 'N/A';
  try {
    return format(new Date(dateString), formatString);
  } catch {
    return 'N/A';
  }
};

export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

export const formatCurrency = (amount: number): string => {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatRuntime = (minutes: number): string => {
  if (!minutes) return 'N/A';
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}m`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
