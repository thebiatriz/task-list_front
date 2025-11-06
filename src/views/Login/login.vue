<template>
    <main class="card flex justify-center">
        <Dialog :visible="isDialogVisible" :closable="false" modal pt:root:class="!border-0 !bg-transparent"
            pt:mask:class="backdrop-blur-sm">
            <form @submit.prevent="verifyMethodToSend">
                <div class="flex flex-col px-8 py-8 gap-6 rounded-2xl"
                    style="background-image: radial-gradient(circle at left top, #1F3A78, #000000);">
                    <img src="/public/icon-notebook.svg" alt="Imagem de laptop" class="block mx-auto w-10 h-10" />
                    <p class="text-indigo-100 font-semibold text-center text-lg mb-4">
                        {{ isCreatingAccount ? 'Criar Conta' : 'Fazer Login' }}</p>
                    <div v-if="isCreatingAccount" class="inline-flex flex-col gap-2">
                        <label for="username" class="text-indigo-100 font-semibold">Nome</label>
                        <InputText v-model="inputUserName" required id="registration" maxlength="50"
                            class="!bg-white/20 !border-0 !p-4 !text-white w-80" />
                    </div>
                    <div class="inline-flex flex-col gap-2">
                        <label for="username" class="text-indigo-100 font-semibold">Email</label>
                        <InputText v-model="inputUserEmail" id="registration"
                            class="!bg-white/20 !border-0 !p-4 !text-white w-80" />
                    </div>
                    <div class="inline-flex flex-col gap-2">
                        <label for="password" class="text-indigo-100 font-semibold">Senha</label>
                        <InputText v-model="inputUserPassword" id="password" maxlength="50"
                            class="!bg-white/20 !border-0 !p-4 !text-white w-80" type="password" />
                    </div>
                    <div class="flex items-center gap-4">
                        <Button :label="isCreatingAccount ? 'Criar' : 'Entrar'" type="submit" :loading="isSubmitting"
                            :disabled="isSubmitting" text :class="{ '!cursor-progress': isSubmitting }"
                            class="!p-4 w-full !text-white !border !border-[#1F3A78] hover:!bg-white/10" />
                    </div>
                    <a @click="changeMethodToSend"
                        class="text-[#a4abbb] text-sm text-center cursor-pointer hover:underline">{{ isCreatingAccount ?
                            'Já tem uma conta? Faça login' : 'Não possui uma conta? Clique aqui' }}</a>
                </div>
            </form>
        </Dialog>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LoginService } from "./auth.service";
import { ToastService } from "../../utils/toast-service.util";
import { MessageToasts } from "../../utils/toast-messages.util";
import { AuthRequest, AuthUser } from "../../models/auth.model";
import type { UserCreatePayload } from "../../service/rest/user.rest";
import { UserService } from "../User/user.service";
import { take } from "rxjs";

export default defineComponent({
    name: "login",
    data() {
        return {
            isDialogVisible: true as boolean,
            inputUserName: "" as string,
            inputUserEmail: "" as string,
            inputUserPassword: "" as string,
            isCreatingAccount: false as boolean,
            loginService: null as LoginService | null,
            userService: new UserService(),
            userToCreate: null as AuthUser | null,
            isSubmitting: false as boolean,
        }
    },
    created() {
        this.loginService = new LoginService();
    },
    methods: {
        changeMethodToSend(): void {
            this.isCreatingAccount = !this.isCreatingAccount;
        },
        verifyMethodToSend(): void {
            if (this.isCreatingAccount) this.createUser();
            else this.login();
        },
        createUser(): void {
            if (!this.userService) return;

            this.isSubmitting = true;

            const payload: UserCreatePayload = {
                email: this.inputUserEmail,
                name: this.inputUserName,
                password: this.inputUserPassword
            };

            this.userService.createUser(payload).pipe(take(1)).subscribe({
                next: () => {
                    this.$toast.add(ToastService.success(MessageToasts.SUCCESS_CREATE_USER));
                    this.changeMethodToSend();
                    this.isSubmitting = false;
                }, 
                error: (error) => {
                    console.log("Erro ao criar usuário", error);
                    this.isSubmitting = false;
                }
            })
        },
        login(): void {
            if (!this.loginService) return;

            this.isSubmitting = true;

            const payload = new AuthRequest(this.inputUserEmail, this.inputUserPassword)

            this.loginService.login(payload).subscribe({

                next: () => {
                    this.isDialogVisible = false;
                    this.$toast.add(ToastService.success(MessageToasts.SUCCESS_LOGIN));
                    this.$router.push("/");
                    this.isSubmitting = false;
                },
                error: (error) => {
                    console.log("Erro ao realizar login:", error);
                    this.isSubmitting = false;
                }
            });
        },
    },
})
</script>
