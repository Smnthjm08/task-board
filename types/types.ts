type SubscriptionType = 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE' | 'CUSTOM';

export interface OrganizationContextTypes {
  id: string;
  name: string;
  ownerId: string;
  userId: string;
  subscription: SubscriptionType;
}

// {
//   user: {
//     name: '123456',
//     email: '123456@gmail.com',
//     image: null,
//     id: 'cm83cc76a0007ovwiw2iv019f'
//   },
//   expires: '2025-04-21T15:51:23.368Z'
// }

export interface userTypes {
  name?: string;
  email: string;
  image: string;
  id: string;
}

export interface userSessionTypes{
  user: userTypes;
  expires: string;
}