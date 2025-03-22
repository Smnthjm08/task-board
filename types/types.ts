type SubscriptionType = 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE' | 'CUSTOM';

export interface OrganizationContextTypes {
  id: string;
  name: string;
  ownerId: string;
  userId: string;
  subscription: SubscriptionType;
}
