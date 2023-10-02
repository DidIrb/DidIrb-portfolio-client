export interface serviceState {
  isLoading: boolean;
  error: any;
  successMessage: string;
  data: any;
}



export interface State {
  isLoading: boolean;
  error: any;
  successMessage: string | null;
  [key: string]: any; 
}
