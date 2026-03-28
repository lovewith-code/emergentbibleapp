export interface User {
  id:       string;
  name:     string;
  email:    string;
  photoUrl: string | null;
}

export interface AuthState {
  user:      User | null;
  isGuest:   boolean;
  idToken:   string | null;
}