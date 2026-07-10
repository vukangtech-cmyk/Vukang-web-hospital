export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  image: string;
  availability: string[];
  rating: number;
  biography: string;
  experience: number; // Years of experience
  education: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to dynamically map Lucide icons
  department: string;
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  date: string;
  time: string;
  notes?: string;
  status: 'Inasubiri' | 'Imethibitishwa' | 'Imefutwa';
  createdAt: string;
}

export interface Review {
  id: string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  doctorSpecialty?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  date: string;
}

export interface HealthTip {
  id: string;
  title: string;
  description: string;
  category: 'Lishe' | 'Mazoezi' | 'Moyo' | 'Maji' | 'Pumzika' | 'Ulinzi';
  iconName: string;
}

