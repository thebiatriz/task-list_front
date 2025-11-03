<template>
    <main class="w-full">
        <ViewHeader v-if="currentComputerId === undefined" titleHeader="Registrar computador" :showButtonBack="true"
            @navigate-back="$router.go(-1)" />
        <ViewHeader v-else titleHeader="Editar computador" :showButtonBack="true"
            @navigate-back="$router.go(-1)" />

        <form @submit.prevent="submitForm" class="bg-white border border-[#DDDDDD] rounded-lg p-8 md:p-16">
            <fieldset class="grid grid-cols-1 md:grid-cols-2 text-[#666666] gap-9 md:gap-16">
                <div class="grid grid-cols-1">
                    <label class="font-bold" for="computerBrandInput">Marca</label>
                    <InputText v-model="computerInput.brand" id="computerBrandInput" placeholder="Ex: Dell" />
                </div>

                <div class="grid grid-cols-1">
                    <label class="font-bold" for="computerCpuInput"><span class="text-[#FF0000]">*
                        </span>Processador</label>
                    <InputText v-model="computerInput.cpu" id="computerCpuInput" required
                        placeholder="Ex: Intel Core i5-12400F" />
                </div>

                <div class="grid grid-cols-1">
                    <label class="font-bold" for="computerStorageInput"><span class="text-[#FF0000]">*
                        </span>Armazenamento</label>
                    <InputText v-model="computerInput.storage" id="computerStorageInput" required
                        placeholder="Ex: 512GB" />
                </div>

                <div class="grid grid-cols-1">
                    <label class="font-bold" for="computerRamInput"><span class="text-[#FF0000]">* </span>Memória
                        RAM</label>
                    <InputText v-model="computerInput.ram" id="computerRamInput" required placeholder="Ex: 16GB" />
                </div>

                <div class="grid grid-cols-1">
                    <label class="font-bold" for="computerQuantityInput"><span class="text-[#FF0000]">*
                        </span>Estoque</label>
                    <InputNumber v-model="computerInput.quantity" input-id="computerQuantityInput" required
                        placeholder="Ex: 10" inputClass="w-full md:w-auto" />
                </div>
            </fieldset>

            <div
                class="pt-[5vh] flex flex-col-reverse items-center md:flex-row justify-center sm:justify-end gap-[2vw]">
                <Button @click="$router.go(-1)" type="button"
                    class="w-full sm:w-1/2 md:w-1/4 lg:w-[15%] hover:!bg-[#FDFAF0] !border-[#F2D16D] !text-[#666666]"
                    label="Cancelar" outlined />
                <Button type="submit" :loading="isSendingForm" :disabled="!isFormValidToRegister || isSendingForm"
                    :class="{
                        'active:scale-95 hover:!bg-[#058D1A]': !isSendingForm && isFormValidToRegister,
                        '!cursor-not-allowed': !isFormValidToRegister, '!cursor-progress': isSendingForm
                    }" :label="currentComputerId ? 'Atualizar' : 'Registrar'"
                    class="w-full sm:w-1/2 md:w-1/4 lg:w-[15%] !border-[#2C2C2C] !bg-[#05A51D]" />
            </div>
        </form>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ComputerService } from './computer.service';
import { Computer } from '../../models/computer.model';
import { ToastService } from '../../utils/toast-service.util';
import { MessageToasts } from '../../utils/toast-messages.util';

export default defineComponent({
    name: "computer-form",
    data() {
        return {
            computerInput:
            {
                brand: "" as string,
                cpu: "" as string,
                ram: "" as string,
                storage: "" as string,
                quantity: 1 as number
            },
            computerData: {} as Computer,
            isSendingForm: false as boolean
        }
    },
    methods: {
        getComputerById(id: string): void {
            this.computerService.computer.subscribe({
                next: (response) => {
                    this.computerData = response.data;
                    this.populateFields();
                }
            });
            this.computerService.getComputerById(id)
        },
        createComputer(): void {
            this.isSendingForm = true;

            this.computerService.computer.subscribe({
                next: () => {
                    this.$toast.add(ToastService.success(MessageToasts.SUCCESS_CREATE_COMPUTER));
                    this.isSendingForm = false;
                    this.goBackToAllComputers();
                },
                error: () => {
                    this.isSendingForm = false;
                }
            });
            this.computerService.createComputer(this.computerInput);
        },
        updateComputer(): void {
            if (this.currentComputerId) {
                this.isSendingForm = true;

                this.computerService.computer.subscribe({
                    next: () => {
                        this.$toast.add(ToastService.success(MessageToasts.SUCCESS_UPDATE_COMPUTER));
                        this.isSendingForm = false;
                        this.goBackToAllComputers();
                    },
                    error: () => {
                        this.isSendingForm = false;
                    }
                });
                this.computerService.updateComputer(this.currentComputerId, this.computerInput);
            }
        },
        goBackToAllComputers(): void {
            this.$router.push('/computer');
        },
        populateFields(): void {
            this.computerInput.brand = this.formattedBrand(this.computerData.brand);
            this.computerInput.cpu = String(this.computerData?.cpu);
            this.computerInput.ram = String(this.computerData?.ram);
            this.computerInput.storage = String(this.computerData?.storage);
            this.computerInput.quantity = Number(this.computerData?.quantity);
        },
        handleComputerId(): void {
            if (this.currentComputerId) {
                this.getComputerById(this.currentComputerId);
            }
        },
        submitForm(): void {
            if (this.currentComputerId) {
                this.updateComputer();
            } else {
                this.createComputer();
            }
        },
        formattedBrand(brand: string | undefined | null): string {
            return !brand || brand.trim() === '' ? '' : brand;
        }
    },
    computed: {
        computerService(): ComputerService {
            return new ComputerService();
        },
        currentComputerId(): string | undefined {
            return this.$route.params.id as string | undefined;
        },
        isFormValidToRegister(): boolean {
            return this.computerInput.cpu !== '' && this.computerInput.quantity > 0 && this.computerInput.ram !== '' && this.computerInput.storage !== '';
        }
    },
    mounted() {
        this.handleComputerId();
    }
})
</script>