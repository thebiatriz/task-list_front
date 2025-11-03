<template>
    <main class="w-full">
        <ViewHeader titleHeader="Bem-vindo(a) ao" :showButtonRegister="false"
            titleForRobotics="Instituto Robótica Sustentável!" />

        <section class="text-[#666666]">
            <h2 class="text-lg md:text-xl">Aqui está o resumo das suas atividades</h2>

            <div class="border border-[#DDDDDD] rounded-lg p-6 mt-[3vh] pb-[5vh] md:pb-[7vh]">
                <div class="flex flex-col md:flex-row">
                    <p class="font-semibold flex flex-col md:flex-row md:items-center">
                        <span>Total acumulado de vendas:&nbsp;</span>

                        <span class="block md:items-center mt-1 md:mt-0 md:ml-1">
                            <template v-if="isTotalSalesLoading">
                                <Skeleton width="200px" height="1.5rem" />
                            </template>
                            <template v-else>
                                {{ formatPriceToBrl(totalSales) }}
                            </template>
                        </span>
                    </p>
                </div>

                <section class="mt-[7vh]">
                    <h3>Últimas movimentações</h3>
                    <DataView :value="itemList">
                        <template #empty>
                            <div class="text-xl">
                                <div v-if="isListLoading"
                                    class="h-fit grid grid-cols-1 md:grid-cols-2 gap-x-[8vw] gap-10 mt-[2vh] bg-[#FCFDFF]">
                                    <div v-for="i in 4" :key="i" class="border border-[#DDDDDD] p-3 rounded-lg">
                                        <Skeleton v-for="skelItem in 4" :key="skelItem" height="1.1rem" class="my-2" />
                                    </div>
                                </div>
                                <template v-else>
                                    <div class="p-5 mt-4 text-[#666666] border border-[#DDDDDD] rounded-lg">
                                        <p class="text-base font-medium">
                                            Nenhum registro cadastrado
                                        </p>
                                        <p class="text-sm">Tente cadastrar uma venda ou uma doação de computadores.
                                        </p>
                                    </div>
                                </template>
                            </div>
                        </template>


                        <template #list="outputItems">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-[8vw] gap-10 mt-[2vh] !bg-[#FCFDFF]">
                                <article v-for="item in outputItems.items" :key="item.id"
                                    class="border border-[#DDDDDD] flex flex-col sm:flex-row justify-between gap-5 items-start sm:items-center py-3 px-5 rounded-lg">

                                    <template v-if="isListLoading">
                                        <div class="h-fit grid grid-cols-1 gap-3 w-full">
                                            <Skeleton v-for="skelItem in 4" :key="skelItem" height="1.0rem" />
                                        </div>
                                    </template>
                                    <template v-else>
                                        <div class="grid grid-cols-1 w-full sm:w-auto sm:flex-grow">
                                            <div class="mb-2">
                                                <p class="font-semibold">Computador:</p>
                                                <p class="mb-1 break-words">{{ `${formattedBrand(item.brand)} |
                                                    ${item.cpu}` }}</p>
                                            </div>
                                            <div>
                                                <p class="font-semibold">Data:</p>
                                                <p class="break-words">{{ formatDate(item.date) }}</p>
                                            </div>
                                        </div>

                                        <div
                                            class="mt-2 mb-2 sm:mb-0 w-full sm:w-auto sm:mt-0 flex-shrink-0 flex items-center justify-center sm:justify-end">
                                            <Tag :class="item.status === 'vendido' ? '!bg-[#FDF2D1] !text-[#DB804E]' : '!bg-[#E4FFE8] !text-[#427345]'"
                                                class="w-full sm:w-28 lg:w-36 h-10 sm:h-14 !text-base flex items-center justify-center">
                                                {{ isLabelForSale(item.status) ? 'VENDIDO' : 'DOADO' }}
                                            </Tag>
                                        </div>
                                    </template>
                                </article>
                            </div>
                        </template>
                    </DataView>
                </section>
            </div>
        </section>

        <section class="text-[#666666] mt-[5vh]">
            <h2 class="text-lg md:text-xl">O que você pode fazer agora?</h2>
            <div class="flex flex-col sm:flex-row gap-4 mt-[2vh] justify-center sm:justify-start">
                <Button label="Cadastrar Computador" icon="pi pi-plus-circle" @click="navigateTo('/computer/register')"
                    class="!text-[#666666] !bg-[#FFFFFF] hover:!bg-gray-100 !transition-colors !shadow-sm !border-none" />
                <Button label="Registrar Venda" icon="pi pi-money-bill" @click="navigateTo('/computer-output', 'sale')"
                    class="!text-[#666666] !bg-[#FFFFFF] hover:!bg-gray-100 !transition-colors !shadow-sm !border-none" />
                <Button label="Registrar Doação" icon="pi pi-gift" @click="navigateTo('/computer-output', 'donation')"
                    class="!text-[#666666] !bg-[#FFFFFF] hover:!bg-gray-100 !transition-colors !shadow-sm !border-none" />
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { Item } from "../../models/item.model";
import { ItemService } from "./item.service";
import { SaleService } from "../Sale/sale.service";

export default defineComponent({
    name: "home",
    data() {
        return {
            itemList: [] as Item[],
            isListLoading: true as boolean,
            isTotalSalesLoading: true as boolean,
            itemService: null as ItemService | null,
            totalSales: 0 as number,
            saleService: null as SaleService | null
        }
    },
    created() {
        this.itemService = new ItemService();
        this.saleService = new SaleService();

    },
    methods: {
        getItemList(): void {
            if (!this.itemService) return;
            this.isListLoading = true;

            this.itemService.itemList.subscribe({
                next: (response) => {
                    this.itemList = response;
                    this.isListLoading = false;
                },
                error: () => {
                    this.isListLoading = false;
                }
            });

            this.itemService.getItemList();
        },
        getSumSales(): void {
            if (!this.saleService) return;

            this.isTotalSalesLoading = true;

            this.saleService.sumSales.subscribe({
                next: (response) => {
                    this.totalSales = response;
                    this.isTotalSalesLoading = false;
                },
                error: () => {
                    this.isTotalSalesLoading = false;
                }
            });

            this.saleService.getSumSales();
        },
        navigateTo(route: string, type?: string): void {
            if (type) {
                this.$router.push({
                    path: route,
                    query: { 'type': type.toLowerCase() }
                });
            } else {
                this.$router.push(route);
            }
        },
        formatDate(date: Date | undefined): string {
            if (!date) return 'Data não encontrada';
            return new Date(date).toLocaleDateString("pt-BR", { timeZone: "-03:00" });
        },
        formattedBrand(brand: string | undefined | null): string {
            return !brand || brand.trim() === '' ? 'Sem marca' : brand;
        },
        formatPriceToBrl(computerPrice: number | undefined): string {
            if (!computerPrice) return 'Preço não encontrado';
            return computerPrice.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
        },
        isLabelForSale(itemStatus: string): boolean {
            return itemStatus === 'vendido' ? true : false;
        }
    },
    mounted() {
        this.getSumSales();
        this.getItemList();
    }
})

</script>