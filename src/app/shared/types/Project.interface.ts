import { BackendErrorsInterface } from "./backendErrors.interface";

export interface ProjectInterface {
    name: string;
    description: string;
    repository: string | null;
    visibility: string;
    banner?: string | null;
}    

export interface ProjectStateInterface {
    project: ProjectInterface | null | undefined
    isLoading: boolean
    validationErrors: BackendErrorsInterface | null 
}