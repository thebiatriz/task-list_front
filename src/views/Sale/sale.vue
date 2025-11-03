<template>
    <main class="w-full">
        <ViewHeader titleHeader="Vendas Registradas" :showButtonRegister="true"
            @to-register="navigateTo('/computer-output', 'sale')" />

        <section class="hidden md:block p-4 md:p-5 bg-white border border-[#DDDDDD] rounded-lg">
            <DataTable :value="allSales" class="border border-gray-500 rounded-lg px-2 py-2 h-fit">
                <template #empty>
                    <div class="text-xl">
                        <div v-if="isLoading" class="h-fit grid grid-cols-4 gap-7">
                            <Skeleton v-for="i in 16" :key="i" height="2.2rem" />
                        </div>
                        <template v-else>
                            <p class="block mt-4 text-lg text-[#666666]">
                                Nenhuma venda registrada
                            </p>
                        </template>
                    </div>
                </template>

                <Column field="brand" style="width: 25%">
                    <template #header>
                        <span class="text-[#515151] text-xl font-semibold">Computador</span>
                    </template>

                    <template #body="{ data }">
                        <Skeleton v-if="isLoading" height="2.2rem" />
                        <span v-else class="inline-flex items-center gap-2">
                            <span class="font-medium text-[#666666] ">{{ formattedBrand(data.brand) }}</span>
                            <span class="text-gray-300"> | </span>
                            <span class="text-[#666666]">{{ data.cpu }}</span>
                        </span>
                    </template>
                </Column>

                <Column field="sale.priceSale" sortable style="width: 25%">
                    <template #header>
                        <span class="text-[#515151] text-xl font-semibold">Preço</span>
                    </template>

                    <template #body="{ data }">
                        <Skeleton v-if="isLoading" height="2.2rem" />
                        <span v-else class="text-[#666666] items-center justify-center text-center"> {{
                            formatPriceToBrl(data.sale.priceSale) }}</span>
                    </template>
                </Column>

                <Column field="quantity" sortable style="width: 25%">
                    <template #header>
                        <span class="text-[#515151] text-xl font-semibold">Quantidade</span>
                    </template>

                    <template #body="{ data }">
                        <Skeleton v-if="isLoading" height="2.2rem" />
                        <span v-else class="text-[#666666] items-center justify-center text-center"> {{
                            `${data.quantity} un.`}}</span>
                    </template>
                </Column>

                <Column field="sale.saleDate" sortable style="width: 25%">
                    <template #header>
                        <span class="text-[#515151] text-xl font-semibold">Data da venda</span>
                    </template>
                    <template #body="{ data }">
                        <Skeleton v-if="isLoading" height="2.2rem" />
                        <span v-else class="text-[#666666] items-center justify-center text-center">
                            {{ formatDate(data.sale.saleDate) }}
                        </span>
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

        <div class="block md:hidden p-4 md:p-5 bg-white border border-[#DDDDDD] rounded-lg">
            <DataView :value="allSales" data-key="id">
                <template #empty>
                    <div class="text-xl">
                        <div v-if="isLoading" v-for="loaderItem in 4" :key="'loader-' + loaderItem"
                            class="h-fit flex flex-col gap-3 rounded-lg bg-[#FCFDFF] border border-[#DDDDDD] text-[#666666] p-3 mb-6">
                            <Skeleton v-for="i in 4" :key="i" height="1.0rem" />
                        </div>
                        <template v-else>
                            <span class="block mt-4 text-lg text-[#666666]">
                                Nenhuma doação registrada
                            </span>
                        </template>
                    </div>
                </template>

                <template #list="saleList">
                    <div role="list">
                        <article v-for="itemSale in saleList.items" :key="itemSale.id"
                            class="flex flex-col bg-[#FCFDFF] border border-[#DDDDDD] text-[#666666] rounded-lg px-3 py-5 mb-6">
                            <div v-if="isLoading" class="h-fit grid grid-cols-1 gap-3">
                                <Skeleton v-for="i in 4" :key="i" height="1.0rem" />
                            </div>
                            <template v-else>
                                <span class="text-[#666666]"><strong>Computador:</strong> {{
                                    `${formattedBrand(itemSale.brand)} | ${itemSale.cpu}`
                                }}</span>
                                <span class="text-[#666666]"><strong class="text-[#666666]">Preço:</strong> {{
                                    formatPriceToBrl(itemSale.sale.priceSale) }}</span>
                                <span class="text-[#666666]"><strong class="text-[#666666]">Quantidade:</strong> {{
                                    itemSale.quantity }}</span>
                                <span class="text-[#666666]"><strong class="text-[#666666]]">Data da venda:</strong> {{
                                    formatDate(itemSale.sale.saleDate) }}</span>
                            </template>
                        </article>
                    </div>
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
        </div>

    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { QueryParams } from '../../models/query-params.model';
import { ItemSale } from '../../models/item-sale.model';
import { ItemSaleService } from '../Sale/item-sale.service';
import type { PageState } from 'primevue';

export default defineComponent({
    name: "sale",
    data() {
        return {
            allSales: [] as ItemSale[],
            isLoading: true as boolean,
            query: new QueryParams(),
            totalRegisters: 0 as number,
            totalRegistersBeforeReload: 0 as number,
            itemSaleService: null as ItemSaleService | null,
        }
    },
    created() {
        this.itemSaleService = new ItemSaleService();
    },
    methods: {
        getAllItemSales(query: QueryParams): void {
            if (!this.itemSaleService) return;

            this.isLoading = true;
            this.totalRegistersBeforeReload = this.totalRegisters;

            this.itemSaleService?.allSales.subscribe({
                next: (response) => {
                    this.allSales = response.data;
                    this.totalRegisters = response.totalRegisters;

                    const hasRedirected = this.handleVoidPage(this.allSales, query.PageNumber);

                    if (!hasRedirected) {
                        this.isLoading = false;
                    }
                },
                error: () => {
                    this.isLoading = false;
                }
            });
            this.itemSaleService.getAllItemSales(query);
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
        handleVoidPage(allSales: ItemSale[], currentPage: number): boolean {
            if (allSales === undefined || allSales.length === 0) {
                if (currentPage > 1) {
                    this.query.PageNumber = 1;
                    this.$router.replace({ name: "Sale", query: { page: 1 } });
                    return true;
                }
            }
            return false;
        },
        onPaginate(event: PageState): void {
            this.query.PageNumber = event.page + 1;
            this.$router.replace({ name: "Sale", query: { page: this.query.PageNumber } });
        },
        getCurrentPage(): void {
            this.query.PageNumber = this.pageFromRoute;
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
        }
    },
    watch: {
        pageFromRoute(newPage: number, oldPage: number) {
            if (newPage !== oldPage) {
                this.query.PageNumber = newPage;
                this.getAllItemSales(this.query);
            }
        }
    },
    computed: {
        firstElementPage(): number {
            return (this.query.PageNumber - 1) * this.query.PageSize;
        },
        pageFromRoute(): number {
            return Number(this.$route.query.page) || 1;
        },
    },

    mounted() {
        this.getCurrentPage();
        this.getAllItemSales(this.query);
    }
})
</script>