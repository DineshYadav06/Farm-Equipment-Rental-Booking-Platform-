export type EquipmentCategory =
  | "Tractor"
  | "Harvester"
  | "Seed Drill"
  | "Sprayer"
  | "Irrigation Equipment"
  | "Thresher"
  | "Rotavator"
  | "Cultivator";

export interface Equipment {
  id: string;
  owner_id: string;
  owner_name: string;
  owner_phone: string;
  title: string;
  category: EquipmentCategory;
  brand: string;
  model: string;
  year: number;
  hp?: number;
  fuel_type: string;
  description: string;
  images: string[];
  hourly_rate: number;
  daily_rate: number;
  security_deposit: number;
  with_driver: boolean;
  city: string;
  state: string;
  pincode: string;
  latitude: number;
  longitude: number;
  is_available: boolean;
  condition: string;
  average_rating: number;
  total_reviews: number;
  total_bookings: number;
  distance_km?: number;
}

export interface Booking {
  id: string;
  farmer_id: string;
  farmer_name: string;
  farmer_phone: string;
  equipment_id: string;
  equipment_title: string;
  equipment_category: string;
  owner_id: string;
  owner_name: string;
  owner_phone: string;
  rental_type: "hourly" | "daily";
  start_date: string;
  end_date: string;
  duration_hours?: number;
  duration_days?: number;
  total_amount: number;
  platform_fee: number;
  security_deposit: number;
  status: "pending" | "confirmed" | "active" | "completed" | "cancelled";
  delivery_type: "self_pickup" | "owner_delivery";
  delivery_address: string;
  payment_status: "pending" | "paid" | "refunded";
  payment_method?: string;
  created_at: string;
}

export interface Review {
  id: string;
  booking_id: string;
  equipment_id: string;
  farmer_id: string;
  farmer_name: string;
  rating: number;
  comment: string;
  equipment_condition_rating: number;
  owner_behavior_rating: number;
  created_at: string;
  farmer_location?: string;
}

export interface Recommendation {
  equipment_id: string;
  title: string;
  category: string;
  brand: string;
  model: string;
  daily_rate: number;
  hourly_rate: number;
  average_rating: number;
  distance_km: number;
  image_url: string;
  match_score: number;
  recommended_reason: string;
  best_for_crop: string;
}

export interface UserNotification {
  id: string;
  title: string;
  message: string;
  type: "booking" | "payment" | "availability" | "reminder" | "system";
  time: string;
  read: boolean;
}
