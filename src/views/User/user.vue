<template>
    <main class="w-full">
        <ViewHeader titleHeader="Minha Conta" />
        <div v-if="!user">
            Carregando dados do usuário...
        </div>

        <div v-else class="text-lg text-[#333333] flex flex-col gap-4">
            <div class="flex flex-col gap-2 border border-[#acaaaa] p-4 rounded-lg">
                <p><strong>Nome:</strong> {{ user.name }}</p>
                <p><strong>Email:</strong> {{ user.email }}</p>
            </div>

            <section class="mt-10">
                <h2 class="text-lg md:text-xl">O que você pode fazer agora?</h2>
                <div class="flex flex-col gap-4 mt-[2vh] justify-center">
                    <Button @click="openEditDialog" label="Editar Dados"
                        class="!text-[#666666] !bg-[#FFFFFF] hover:!bg-gray-100 !transition-colors !shadow-sm !border-none" />
                    <Button @click="handleLogout" label="Logout"
                        class="!text-[#666666] !bg-[#FFFFFF] hover:!bg-gray-100 !transition-colors !shadow-sm !border-none" />
                    <Button label="Excluir Conta"
                        class="!text-[#f56d6d] !bg-[#FFFFFF] hover:!bg-gray-100 !transition-colors !shadow-sm shadow-[#eec9c9] !border-none" />
                </div>
            </section>
        </div>

        <Dialog v-model:visible="isEditDialogOpen" modal header="Editar Usuário" :style="{ width: '25rem' }">
            <div class="flex flex-col gap-4 mt-4">
                <div class="flex flex-col gap-2">
                    <label for="edit-name">Nome</label>
                    <InputText id="edit-name" v-model="userToUpdate.name" />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="edit-email">Email</label>
                    <InputText id="edit-email" v-model="userToUpdate.email" />
                </div>

                <div class="flex justify-end gap-2 mt-4">
                    <Button type="button" label="Cancelar" severity="secondary"
                        @click="isEditDialogOpen = false"></Button>
                    <Button @click="handleUpdateUser" class="!bg-[#40BDFF] hover:!bg-[#39a6e0]" label="Salvar"></Button>
                </div>
            </div>
        </Dialog>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LoginService } from "../Login/auth.service";
import type { AuthUser } from "../../models/auth.model";
import type { Subscription } from "rxjs";
import { UserService } from "./user.service";
import type { UserUpdatePayload } from "../../service/rest/user.rest";
import { ToastService } from "../../utils/toast-service.util";
import { MessageToasts } from "../../utils/toast-messages.util";
import { getStoredToken, saveAuthData } from "../../utils/auth.storage";

export default defineComponent({
    name: "user",
    data() {
        return {
            loginService: new LoginService(),
            user: null as AuthUser | null,
            userSubscription: null as Subscription | null,
            userService: new UserService(),
            formData: {
                name: "" as string
            },
            isEditDialogOpen: false as boolean,
            userToUpdate: {
                name: "" as string,
                email: "" as string
            }
        }
    },
    methods: {
        subscribeToUser(): void {
            this.userSubscription = this.loginService.user.subscribe({
                next: (userData) => {
                    this.user = userData;
                },
                error: (err) => {
                    console.error("Erro ao obter dados do usuário: ", err);
                }
            });
        },
        openEditDialog(): void {
            if (!this.user) return;

            this.userToUpdate.name = this.user.name;
            this.userToUpdate.email = this.user.email;

            this.isEditDialogOpen = true;
        },
        handleUpdateUser(): void {
            if (!this.userService) return;

            const payload: UserUpdatePayload = {
                name: this.userToUpdate.name,
                email: this.userToUpdate.email,
            };

            this.userService.updateUser(payload).subscribe({
                next: (response) => {
                    this.user = response.data;
                    const token = getStoredToken();
                    if (token && this.user) {
                        saveAuthData(this.user, token);
                    }

                    this.$toast.add(ToastService.success(MessageToasts.SUCCESS_UPDATE_USER));
                    this.isEditDialogOpen = false;
                },
                error: (error) => {
                    console.error("Erro ao atualizar:", error);
                }
            })
        },
        handleLogout(): void {
            this.loginService.logout();
            this.$router.push("/login");
        },
        navigateTo(route: string): void {
            this.$router.push(route)
        }
    },
    beforeUnmount() {
        if (this.userSubscription) {
            this.userSubscription.unsubscribe();
        }
    },
    mounted() {
        this.subscribeToUser()
    }

})
</script>