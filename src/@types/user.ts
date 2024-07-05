export type AddUserType = {
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
};

export type UserTypeNotNull = {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string;
  created_at: string;
  updated_at: string;
};
export type UpdateUserPayload = {
  first_name?: string;
  last_name?: string;
};
export type UpdatePasswordPayload = {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
};
export type UserType = UserTypeNotNull | null;
