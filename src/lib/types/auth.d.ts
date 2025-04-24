declare type ApiUser = {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  isVerified: boolean;
};

declare type LoginResponse = {
  token: string;
  user: ApiUser;
};
