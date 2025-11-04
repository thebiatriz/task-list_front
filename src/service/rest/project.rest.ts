import { Observable } from "rxjs";
import api from '../api-Config/rxjs.config';

export interface TaskCreatePayload {
    description: string;
    isComplete: boolean;
}

export class ProjectRest {
    getProjects(): Observable<any> {
        return api.get(`/projects`);
    }
    getProjectById(id: string): Observable<any> {
        return api.get(`/projects/${id}`);
    }
    deleteProject(id: string): Observable<any> {
        return api.deleteR(`/projects/${id}`);
    }
    createProject(projectName: string): Observable<any> {
        return api.post('/projects', { name: projectName });
    }
    updateProject(id: string, projectName: string): Observable<any> {
        return api.put(`/projects/${id}`, { name: projectName });
    }
    getTasks(id: string): Observable<any> {
        return api.get(`/projects/${id}/tasks`);
    }
    createTask(id: string, task: TaskCreatePayload): Observable<any> {
        return api.post(`/projects/${id}/tasks`, task);
    }
}