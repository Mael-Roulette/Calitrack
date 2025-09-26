// Type feature cards
export interface Feature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

// Type roadmap
export interface Milestone {
  id: number;
  icon: string;
  title: string;
  description: string;
}

// Type FAQ
export interface FaqData {
  id?: string | number
  question: string
  answer: string
}

export interface FaqProps {
  faqs: FaqData[]
  className?: string
  allowMultipleOpen?: boolean
}