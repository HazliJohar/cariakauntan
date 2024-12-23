import { supabase } from '../supabase';
import { handleServiceError } from './errorHandling';
import { toast } from '@/hooks/use-toast';

export interface Rating {
  id: string;
  provider_id: string;
  user_id: string;
  rating: number;
  review: string | null;
  created_at: string;
  profiles?: {
    full_name: string;
  };
}

export class RatingsService {
  static async getRatings(providerId: string): Promise<Rating[]> {
    try {
      const { data, error } = await supabase
        .from('ratings')
        .select('*, profiles:user_id (full_name)')
        .eq('provider_id', providerId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      handleServiceError(error, 'Ratings');
      return [];
    }
  }

  static async submitRating(
    providerId: string,
    userId: string,
    rating: number,
    review?: string
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('ratings')
        .upsert({
          provider_id: providerId,
          user_id: userId,
          rating,
          review: review?.trim() || null
        });

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Thank you for your feedback!'
      });
      return true;
    } catch (error) {
      handleServiceError(error, 'Rating submission');
      return false;
    }
  }
}