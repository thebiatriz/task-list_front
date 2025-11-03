<template>
    <main class="w-full">
        <ViewHeader titleHeader="Computadores Registrados" :showButtonRegister="false" />

        <section class="flex flex-row justify-between">
            <IconField class="w-[80%] md:w-1/2">
                <InputText v-debounce:200ms="getComputerBySearch" v-model="searchedComputer" class="w-full"
                    placeholder="Pesquisar computador" />
                <InputIcon class="pi pi-search" />
            </IconField>

            <Button @click="navigateTo('/computer/register')"
                class="!rounded-full block md:mr-[3vw] !bg-[#05A51D] hover:!bg-[#058D1A] items-center h-10"
                type="button" icon="pi pi-plus" />
        </section>

        <section class="hidden md:block mt-[4vh] p-4 md:p-5 bg-white border border-[#DDDDDD] rounded-lg">
            <DataTable :value="allComputers" class="border border-gray-500 rounded-lg px-2 py-2 h-fit">
                <template #empty>
                    <div class="text-xl">
                        <div v-if="isLoading" class="h-fit grid grid-cols-3 gap-7">
                            <Skeleton v-for="skelItem in 12" :key="skelItem" height="2.6rem" class="my-1" />
                        </div>
                        <template v-else>
                            <span v-if="isComputerSearched" class="block mt-4 text-lg text-[#666666]">
                                <p class="mt-2">Nenhum resultado encontrado para <strong>"{{ searchedComputer.trim()
                                }}"</strong></p>
                                <p class="text-sm">Tente pesquisar por outra coisa ou verifique a ortografia.</p>
                            </span>
                            <span v-else class="block mt-4 text-lg text-[#666666]">
                                Nenhum computador cadastrado
                            </span>
                        </template>
                    </div>
                </template>

                <Column field="brand" style="width: 33%">
                    <template #header>
                        <span class="text-xl text-[#515151] font-semibold">Marca</span>
                    </template>

                    <template #body="{ data }">
                        <Skeleton v-if="isLoading" height="2.6rem" />
                        <span v-else class="items-center justify-center text-center text-[#666666]"> {{
                            formattedBrand(data.brand)
                            }}</span>
                    </template>
                </Column>

                <Column field="cpu" style="width: 33%">
                    <template #header>
                        <span class="text-xl text-[#515151] font-semibold">Processador</span>
                    </template>

                    <template #body="{ data }">
                        <Skeleton v-if="isLoading" height="2.6rem" />
                        <span v-else class="items-center justify-center text-center text-[#666666]"> {{ data.cpu
                            }}</span>
                    </template>
                </Column>

                <Column field="quantity" sortable style="width: 33%">
                    <template #header>
                        <span class="text-xl text-[#515151] font-semibold">Estoque</span>
                    </template>
                    <template #body="{ data }">
                        <Skeleton v-if="isLoading" height="2.6rem" />
                        <section v-else class="flex justify-between items-center">
                            <span class="items-center justify-center text-center text-[#666666]">
                                {{ data.quantity }}
                            </span>
                            <div class="card flex justify-center">
                                <Button @click="showToggleOptions($event, data)" type="button" severity="secondary" text
                                    aria-label="Botão de opções para editar e deletar" icon="pi pi-ellipsis-v"
                                    class="flex items-center justify-center mx-3" aria-controls="overlay_menu" />
                            </div>
                        </section>
                    </template>
                </Column>

                <template #footer>
                    <Paginator v-if="totalRegisters > 0" :rows="query.PageSize" :total-records="totalRegisters"
                        :first="firstElementPage" @page="onPaginate" template="PrevPageLink PageLinks NextPageLink" :pt="{
                            prevIcon: 'text-[#038013]',
                            nextIcon: 'text-[#038013]',
                            firstIcon: 'text-[#038013]',
                            lastIcon: 'text-[#038013]',
                        }" />
                </template>
            </DataTable>
        </section>

        <section class="block md:hidden mt-[4vh] p-4 md:p-5 bg-white border border-[#DDDDDD] rounded-lg">
            <DataView :value="allComputers" data-key="id">
                <template #empty>
                    <div class="text-xl">
                        <div v-if="isLoading" v-for="i in 4" :key="i"
                            class="h-fit flex flex-col gap-3 rounded-lg bg-[#FCFDFF] border border-[#DDDDDD] text-[#666666] p-3 mb-6">
                            <Skeleton v-for="skelItem in 3" :key="skelItem" height="1.0rem" />
                        </div>
                        <template v-else>
                            <span v-if="isComputerSearched" class="block mt-4 text-lg text-[#666666]">
                                <p class="mt-2">Nenhum resultado encontrado para <strong>"{{
                                    searchedComputer.trim()
                                        }}"</strong></p>
                                <p class="text-sm pb-2">Tente pesquisar por outra coisa ou verifique a
                                    ortografia.</p>
                            </span>
                            <span v-else class="block mt-4 text-lg text-[#666666]">
                                Nenhum computador cadastrado
                            </span>
                        </template>
                    </div>
                </template>

                <template #list="computerList">
                    <section v-for="computer in computerList.items" :key="computer.id"
                        class="flex flex-col bg-[#FCFDFF] border border-[#DDDDDD] text-[#666666] rounded-lg p-3 mb-6">
                        <div v-if="isLoading" class="h-fit grid grid-cols-1 gap-3">
                            <Skeleton v-for="skelItem in 3" :key="skelItem" height="1.0rem" />
                        </div>
                        <template v-else>
                            <span class="text-[#666666]"><strong>Marca:</strong> {{ formattedBrand(computer.brand)
                                }}</span>
                            <span class="text-[#666666]"><strong>Processador:</strong> {{ computer.cpu }}</span>
                            <span class="text-[#666666]"><strong>Estoque:</strong> {{ computer.quantity }}</span>
                            <Button @click="showToggleOptions($event, computer)" type="button" severity="secondary" text
                                aria-label="Botão de opções para editar e deletar" icon="pi pi-ellipsis-v"
                                class="flex items-center self-end" aria-controls="overlay_menu" />
                        </template>
                    </section>
                </template>

                <template #footer>
                    <Paginator v-if="totalRegisters > 0" :rows="query.PageSize" :total-records="totalRegisters"
                        :page-link-size="2" :first="firstElementPage" @page="onPaginate"
                        template="PrevPageLink PageLinks NextPageLink" :pt="{
                            prevIcon: 'text-[#038013]',
                            nextIcon: 'text-[#038013]',
                            firstIcon: 'text-[#038013]',
                            lastIcon: 'text-[#038013]',
                        }" />
                </template>
            </DataView>
        </section>

        <Menu ref="menuPopUp" id="overlay_menu" :model="toggleOptions" :popup="true" />
        <DeleteDialog :visible="isVisibleDeleteDialog" title="computador?" description="este computador?"
            @cancel-dialog="isVisibleDeleteDialog = false" @confirm-delete="deleteComputer" />
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Computer } from '../../models/computer.model';
import { QueryParams } from '../../models/query-params.model';
import { ComputerService } from './computer.service';
import type { PageState } from 'primevue';
import vueDebounce from 'vue-debounce';
import { take } from 'rxjs';
import { ToastService } from '../../utils/toast-service.util';
import { MessageToasts } from '../../utils/toast-messages.util';

export default defineComponent({
    name: "computer",
    directives: {
        debounce: vueDebounce({ lock: true }),
    },
    data() {
        return {
            toggleOptions: [
                { label: 'Editar', icon: 'pi pi-pencil', command: () => this.handleEditComputer(this.selectedComputer) },
                { label: 'Excluir', icon: 'pi pi-trash', command: () => this.handleDeleteDialog(this.isVisibleDeleteDialog) },
            ] as Object[],
            selectedComputer: new Computer(),
            allComputers: [] as Computer[],
            query: new QueryParams(),
            totalRegisters: 0 as number,
            isLoading: true as boolean,
            isVisibleDeleteDialog: false as boolean,
            searchedComputer: "" as string,
            isComputerSearched: false as boolean,
            totalRegistersBeforeReload: 0 as number
        };
    },

    methods: {
        getAllComputers(query: QueryParams): void {
            this.isLoading = true;
            this.totalRegistersBeforeReload = this.totalRegisters;

            this.computerService.allComputers.subscribe({
                next: (response) => {
                    this.allComputers = response.data;
                    this.totalRegisters = response.totalRegisters;

                    const hasRedirected = this.handleVoidPage(this.allComputers, query.PageNumber, this.totalRegistersBeforeReload, query.PageSize);

                    if (!hasRedirected) {
                        this.isLoading = false;
                        this.isComputerSearched = false;
                    }
                },
                error: () => {
                    this.isLoading = false;
                    this.isComputerSearched = false;
                }
            });
            this.computerService.getAllComputers(query);
        },
        getComputerBySearch(): void {
            this.query.Search = this.searchedComputer.trim();
            const query: QueryParams = {
                PageNumber: 1,
                PageSize: this.query.PageSize,
                Search: this.query.Search
            }

            if (!this.searchedComputer.trim()) {
                this.resetSearch();
                return;
            }

            this.computerService.allComputers.pipe(take(1)).subscribe({
                next: (response) => {
                    this.allComputers = response.data;
                    this.totalRegisters = response.totalRegisters;
                    this.isComputerSearched = true;
                },
                error: () => {
                    this.isComputerSearched = false;
                }
            });
            this.computerService.getAllComputers(query);
        },
        resetSearch(): void {
            this.searchedComputer = '';
            this.query.Search = '';
            this.isComputerSearched = false;
            this.getAllComputers(this.query);
        },
        deleteComputer(): void {
            if (this.selectedComputer.id) {
                this.isLoading = true;
                this.isVisibleDeleteDialog = false;
                this.computerService.computer.subscribe({
                    next: () => {
                        this.$toast.add(ToastService.success(MessageToasts.SUCCESS_DELETE_COMPUTER));
                        this.getAllComputers(this.query);
                    },
                    error: () => {
                        this.isLoading = false;
                    }
                });
                this.computerService.deleteComputer(this.selectedComputer.id);
            }
        },
        navigateTo(route: string): void {
            this.$router.push(route);
        },
        showToggleOptions(event: Event, computer: Computer): void {
            this.selectedComputer = computer;
            const ref = this.$refs.menuPopUp as any;
            ref.toggle(event);
        },
        handleEditComputer(currentComputer: Computer): void {
            if (currentComputer.id) {
                this.$router.push({ path: `/computer/edit/${currentComputer.id}` });
            }
        },
        handleDeleteDialog(isVisible: boolean): void {
            isVisible ? this.isVisibleDeleteDialog = false : this.isVisibleDeleteDialog = true;
        },
        onPaginate(event: PageState): void {
            this.query.PageNumber = event.page + 1;
            this.$router.replace({ name: "Computer", query: { page: this.query.PageNumber } });
        },
        getCurrentPage(): void {
            this.query.PageNumber = this.pageFromRoute;
        },
        handleVoidPage(allComputers: Computer[], currentPage: number, totalRegisters: number, pageSize: number): boolean {
            if (allComputers === undefined || allComputers.length === 0) {
                if (totalRegisters > 0) {
                    const totalPages = Math.floor(totalRegisters / pageSize);
                    if (currentPage > totalPages) {
                        this.query.PageNumber = totalPages;
                        this.$router.replace({ name: "Computer", query: { page: totalPages } });
                        return true;
                    }
                }
                if (currentPage > 1) {
                    this.query.PageNumber = 1;
                    this.$router.replace({ name: "Computer", query: { page: 1 } });
                    return true;
                }
            }
            return false;
        },
        formattedBrand(brand: string | undefined | null): string {
            return !brand || brand.trim() === '' ? 'Sem marca' : brand;
        }
    },
    watch: {
        pageFromRoute(newPage: number, oldPage: number) {
            if (newPage !== oldPage) {
                this.query.PageNumber = newPage;
                this.getAllComputers(this.query);
            }
        }
    },
    computed: {
        computerService(): ComputerService {
            return new ComputerService();
        },
        firstElementPage(): number {
            return (this.query.PageNumber - 1) * this.query.PageSize;
        },
        pageFromRoute(): number {
            return Number(this.$route.query.page) || 1;
        },
    },
    mounted() {
        this.getCurrentPage();
        this.getAllComputers(this.query);
    },
})
</script>