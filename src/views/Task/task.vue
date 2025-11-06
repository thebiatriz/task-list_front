<template>
    <main class="w-full">
        <ViewHeader titleHeader="Atividades do Projeto" showButtonRegister @to-register="handleCreateDialog" />

        <section class="mt-[4vh] p-4 md:p-5 bg-white border border-[#DDDDDD] rounded-lg">
            <DataView :value="allTasks" data-key="id">
                <template #empty>
                    <div v-if="isLoading">
                        Carregando atividades...
                    </div>
                    <span v-else class="block mt-4 text-lg text-[#666666]">
                        Nenhum atividade cadastrada
                    </span>
                </template>

                <template #list="tasksList">
                    <article v-for="task in tasksList.items" :key="task.id"
                        class="cursor-pointer flex justify-between items-center bg-[#FCFDFF] border border-[#DDDDDD] text-[#666666] rounded-lg p-3 mb-6">
                        <div class="flex items-center gap-3">
                            <Checkbox v-model="task.isComplete" :binary="true" @change="updateTaskStatus(task)" :pt="{
                                box: {
                                    class: task.isComplete
                                        ? '!border-[#40BDFF] !bg-[#40BDFF] hover:!bg-[#39a6e0]'
                                        : '!border-gray-300 !bg-white hover:!border-[#40BDFF]'
                                }
                            }" />

                            <span class="text-[#666666]" :class="{ 'line-through': task.isComplete }">
                                {{ task.description }}
                            </span>
                        </div>

                        <Button @click.stop="showToggleOptions($event, task)" type="button" severity="secondary" text
                            aria-label="Botão de opções para editar e deletar" icon="pi pi-ellipsis-v"
                            class="flex items-center self-end" aria-controls="overlay_menu" />
                    </article>
                </template>
            </DataView>

            <Menu ref="menuPopUp" id="overlay_menu" :model="toggleOptions" :popup="true" />
            <DeleteDialog :visible="isDeleteDialogOpen" title="Atividade" description="a sua atividade"
                @cancel-dialog="isDeleteDialogOpen = false" @confirm-delete="deleteTask" />

            <Dialog v-model:visible="isTaskFormDialogOpen" modal :style="{ width: '25rem' }">
                <template #header>
                    <span class="text-2xl font-bold">{{ isUpdatingDescription ? 'Editar' : 'Criar' }} Atividade</span>
                </template>
                <div class="flex flex-col gap-4 mt-4">
                    <div class="flex flex-col gap-2">
                        <label for="edit-name">Descrição</label>
                        <InputText id="edit-name" v-model="newTaskDescription" />
                    </div>

                    <div class="flex justify-end gap-2 mt-4">
                        <Button type="button" label="Cancelar" severity="secondary"
                            @click="isTaskFormDialogOpen = false"></Button>
                        <Button @click="verifyMethodToSend" class="!bg-[#40BDFF] hover:!bg-[#39a6e0]">
                            {{ isUpdatingDescription ? 'Editar' : 'Criar' }}
                        </Button>
                    </div>
                </div>
            </Dialog>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Task } from "../../models/task.model";
import { TaskService } from "./task.service";
import { finalize, type Subscription } from "rxjs";
import { ProjectService } from "../Project/project.service";
import type { TaskUpdatePayload } from "../../service/rest/task.rest";
import { ToastService } from "../../utils/toast-service.util";
import { MessageToasts } from "../../utils/toast-messages.util";
import type { TaskCreatePayload } from "../../service/rest/project.rest";

export default defineComponent({
    name: "task",
    data() {
        return {
            allTasks: [] as Task[],
            isLoading: true as boolean,
            toggleOptions: [
                { label: 'Editar', icon: 'pi pi-pencil', command: () => this.handleEditDialog(this.selectedTask) },
                { label: 'Excluir', icon: 'pi pi-trash', command: () => this.changeDeleteDialogVisibility() },
            ] as Object[],
            selectedTask: null as Task | null,
            isDeleteDialogOpen: false as boolean,
            taskService: new TaskService(),
            taskSubscription: null as Subscription | null,
            projectSubscription: null as Subscription | null,
            projectService: new ProjectService(),
            isTaskFormDialogOpen: false as boolean,
            isUpdatingDescription: false as boolean,
            newTaskDescription: "" as string
        }
    },
    methods: {
        showToggleOptions(event: Event, task: Task): void {
            this.selectedTask = task;
            const ref = this.$refs.menuPopUp as any;
            ref.toggle(event);
        },
        handleEditDialog(selectedTask: Task): void {
            this.isUpdatingDescription = true;
            this.isTaskFormDialogOpen = true;

            if (selectedTask) this.newTaskDescription = selectedTask.description
        },
        handleCreateDialog(): void {
            this.isUpdatingDescription = false;
            this.newTaskDescription = "";

            this.isTaskFormDialogOpen = true;
        },
        verifyMethodToSend(): void {
            if (this.isUpdatingDescription) this.updateTaskDescription();
            else this.createTask();
        },
        getTasks(): void {
            this.taskSubscription = this.projectService.allTasks
                .pipe(
                    finalize(() => {
                        this.isLoading = false;
                    })
                ).subscribe({
                    next: (response) => {
                        this.allTasks = response.data
                    }, error: (error) => {
                        console.log("Erro ao buscar os atividades: ", error)
                    }
                });

            if (this.currentProjectId) {
                this.projectService.getTasks(this.currentProjectId);
            }
        },
        updateTaskStatus(task: Task): void {
            const payload: TaskUpdatePayload = {
                isComplete: task.isComplete
            };

            const taskId = String(task.id);

            this.taskService.updateTask(taskId, payload)
                .subscribe({
                    next: () => {
                        console.log("Task atualizada")
                    },
                    error: (error) => {
                        console.error("Erro ao atualizar a atividade:", error);
                        task.isComplete = !task.isComplete;
                    }
                });
        },
        createTask(): void {
            if (!this.projectService) return;

            if (!this.isTaskDescriptionBlank(this.newTaskDescription) && this.currentProjectId) {
                const payload: TaskCreatePayload = {
                    description: this.newTaskDescription
                };

                this.projectService.createTask(this.currentProjectId, payload).subscribe({
                    next: () => {
                        this.$toast.add(ToastService.success(MessageToasts.SUCCESS_CREATE_PROJECT));
                        this.isTaskFormDialogOpen = false;
                        this.newTaskDescription = "";
                    }, error: (error) => {
                        console.error("Erro ao criar:", error);
                    }
                })
            } else {
                this.$toast.add(ToastService.error(MessageToasts.ERROR_EMPTY_PROJECT_NAME, "Erro ao criar"));
            }
        },
        updateTaskDescription(): void {
            if (!this.taskService) return;

            if (!this.isTaskDescriptionBlank(this.newTaskDescription) && this.selectedTask) {
                const payload: TaskUpdatePayload = {
                    description: this.newTaskDescription,
                };

                const taskId = String(this.selectedTask.id);

                this.taskService.updateTask(taskId, payload)
                    .subscribe({
                        next: () => {
                            console.log("Task atualizada")
                            this.getTasks();
                            this.isTaskFormDialogOpen = false;
                            this.newTaskDescription = "";
                        },
                        error: (error) => {
                            console.error("Erro ao atualizar a atividade:", error);
                        }
                    });
            } else {
                this.$toast.add(ToastService.error(MessageToasts.ERROR_EMPTY_TASK_DESCRIPTION, "Erro ao atualizar"));
            }

        },
        deleteTask(): void {
            if (this.selectedTask && this.taskService) {
                this.taskService.deleteTask(String(this.selectedTask.id)).subscribe({
                    next: () => {
                        this.getTasks();
                        this.$toast.add(ToastService.success(MessageToasts.SUCCESS_DELETE_TASK));
                        this.changeDeleteDialogVisibility();
                    }, error: (error) => {
                        console.error("Erro ao deletar:", error);
                    }
                });
            }
        },
        changeDeleteDialogVisibility(): void {
            this.isDeleteDialogOpen = !this.isDeleteDialogOpen;
        },
        isTaskDescriptionBlank(taskDescription: string | undefined | null): boolean {
            return !taskDescription || taskDescription.trim() === '' ? true : false;
        },
    },
    computed: {
        currentProjectId(): string | undefined {
            return this.$route.params.id as string | undefined;
        },
    },
    mounted() {
        this.getTasks()
    }
})
</script>