<template>
    <main class="w-full">
        <ViewHeader titleHeader="Meus Projetos" showButtonRegister @to-register="handleCreateDialog" />
        <section class="mt-[4vh] p-4 md:p-5 bg-white border border-[#DDDDDD] rounded-lg">
            <DataView :value="allProjects" data-key="id">
                <template #empty>
                    <div v-if="isLoading">
                        Carregando projetos...
                    </div>
                    <span v-else class="block mt-4 text-lg text-[#666666]">
                        Nenhum projeto cadastrado
                    </span>
                </template>

                <template #list="projectList">
                    <article v-for="project in projectList.items" :key="project.id" @click="openTask(project.id)"
                        class="cursor-pointer flex flex-col bg-[#FCFDFF] border border-[#DDDDDD] text-[#666666] rounded-lg p-3 mb-6">
                        <span class="text-[#666666]">{{ project.name }}</span>
                        <Button @click.stop="showToggleOptions($event, project)" type="button" severity="secondary" text
                            aria-label="Botão de opções para editar e deletar" icon="pi pi-ellipsis-v"
                            class="flex items-center self-end" aria-controls="overlay_menu" />
                    </article>
                </template>
            </DataView>
        </section>

        <Menu ref="menuPopUp" id="overlay_menu" :model="toggleOptions" :popup="true" />

        <Dialog v-model:visible="isProjectFormDialogOpen" modal :style="{ width: '25rem' }">
            <template #header>
                <span class="text-2xl font-bold">{{ isUpdatingProject ? 'Editar' : 'Criar' }} Projeto</span>
            </template>
            <div class="flex flex-col gap-4 mt-4">
                <div class="flex flex-col gap-2">
                    <label for="edit-name">Nome</label>
                    <InputText id="edit-name" v-model="newProjectName" />
                </div>

                <div class="flex justify-end gap-2 mt-4">
                    <Button type="button" label="Cancelar" severity="secondary"
                        @click="isProjectFormDialogOpen = false"></Button>
                    <Button @click="verifyMethodToSend" class="!bg-[#40BDFF] hover:!bg-[#39a6e0]">
                        {{ isUpdatingProject ? 'Editar' : 'Criar' }}
                    </Button>
                </div>
            </div>
        </Dialog>

        <DeleteDialog :visible="isDeleteDialogOpen" title="Projeto" description="o seu projeto"
            @cancel-dialog="isDeleteDialogOpen = false" @confirm-delete="deleteProject" />
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Project } from "../../models/project.model";
import { ProjectService } from "./project.service";
import { type Subscription } from "rxjs";
import { ToastService } from "../../utils/toast-service.util";
import { MessageToasts } from "../../utils/toast-messages.util";

export default defineComponent({
    name: "projectList",
    data() {
        return {
            allProjects: [] as Project[],
            selectedProject: null as Project | null,
            isDeleteDialogOpen: false as boolean,
            isCreateDialogOpen: false as boolean,
            toggleOptions: [
                { label: 'Editar', icon: 'pi pi-pencil', command: () => this.handleEditDialog(this.selectedProject) },
                { label: 'Excluir', icon: 'pi pi-trash', command: () => this.changeDeleteDialogVisibility() },
            ] as Object[],
            projectService: new ProjectService(),
            projectSubscription: null as Subscription | null,
            isLoading: true as boolean,
            newProjectName: "" as string,
            isUpdatingProject: false as boolean,


            isProjectFormDialogOpen: false as boolean
        }
    },
    methods: {
        showToggleOptions(event: Event, project: Project): void {
            this.selectedProject = project;
            const ref = this.$refs.menuPopUp as any;
            ref.toggle(event);
        },
        handleEditDialog(selectedProject: Project): void {
            this.isUpdatingProject = true;
            this.isProjectFormDialogOpen = true;

            if (selectedProject) this.newProjectName = selectedProject.name
        },
        handleCreateDialog(): void {
            this.isUpdatingProject = false;
            this.newProjectName = "";

            this.isProjectFormDialogOpen = true;
        },
        verifyMethodToSend(): void {
            if (this.isUpdatingProject) this.updateProject();
            else this.createProject();
        },
        changeDeleteDialogVisibility(): void {
            this.isDeleteDialogOpen = !this.isDeleteDialogOpen;
        },
        deleteProject(): void {
            if (this.selectedProject) {
                this.projectService.deleteProject(String(this.selectedProject.id)).subscribe({
                    next: () => {
                        this.$toast.add(ToastService.success(MessageToasts.SUCCESS_DELETE_PROJECT));
                        this.changeDeleteDialogVisibility()
                    }, error: (error) => {
                        console.error("Erro ao deletar:", error);
                    }
                });
            }
        },
        createProject(): void {
            if (!this.projectService) return;

            if (!this.isProjectNameBlank(this.newProjectName)) {
                this.projectService.createProject(this.newProjectName).subscribe({
                    next: () => {
                        this.$toast.add(ToastService.success(MessageToasts.SUCCESS_CREATE_PROJECT));
                        this.isProjectFormDialogOpen = false;
                        this.newProjectName = "";
                    }, error: (error) => {
                        console.error("Erro ao criar:", error);
                    }
                })
            } else {
                this.$toast.add(ToastService.error(MessageToasts.ERROR_EMPTY_PROJECT_NAME, "Erro ao criar"));
            }
        },
        updateProject(): void {
            if (!this.projectService) return;

            if (!this.isProjectNameBlank(this.newProjectName) && this.selectedProject) {
                this.projectService.updateProject(String(this.selectedProject.id), this.newProjectName).subscribe({
                    next: () => {
                        this.$toast.add(ToastService.success(MessageToasts.SUCCESS_UPDATE_PROJECT));
                        this.isProjectFormDialogOpen = false;
                        this.newProjectName = "";
                    }, error: (error) => {
                        console.error("Erro ao atualizar:", error);
                    }
                })
            } else {
                this.$toast.add(ToastService.error(MessageToasts.ERROR_EMPTY_PROJECT_NAME, "Erro ao atualizar"));
            }
        },
        getProjects(): void {
            this.projectSubscription = this.projectService.allProjects.subscribe({
                    next: (response) => {
                        this.allProjects = response.data;
                        this.isLoading = false;
                    }, error: (error) => {
                        console.log("Erro ao buscar os projetos: ", error);
                        this.isLoading = false;
                    }
                });

            this.projectService.getProjects();
        },
        isProjectNameBlank(projectName: string | undefined | null): boolean {
            return !projectName || projectName.trim() === '' ? true : false;
        },
        openTask(projectId: number): void {
            this.$router.push(`/projects/${projectId}/tasks`)
        }
    },

    beforeUnmount() {
        if (this.projectSubscription) {
            this.projectSubscription.unsubscribe();
        }
    },

    mounted() {
        this.getProjects();
    }
})
</script>