import { Observable } from "rxjs";
import api from '../api-Config/rxjs.config';
import type { Task } from "../../models/task.model";

export type TaskUpdatePayload = Partial<Pick<Task, 'description' | 'isComplete'>>;

export class TaskRest {
    getTaskById(id: string): Observable<any> {
        return api.get(`/tasks/${id}`);
    }
    deleteTask(id: string): Observable<any> {
        return api.deleteR(`/tasks/${id}`);
    }
    updateTask(id: string, task: TaskUpdatePayload): Observable<any> {
        return api.put(`/tasks/${id}`, task);
    }
}