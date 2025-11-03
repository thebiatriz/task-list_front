<template>
    <main class="w-full">
        <ViewHeader titleHeader="Saída de Computadores" :showButtonRegister="false" :showButtonBack="true"
            @navigate-back="$router.go(-1)" />

        <form @submit.prevent="handleComputerOutput"
            class="bg-white border border-[#DDDDDD] rounded-lg p-4 md:p-10 text-[#666666]">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-[18vw] md:gap-[8vh] lg:gap-[13vw]">

                <section aria-labelledby="computer-selection-heading">
                    <h2 id="computer-selection-heading" class="sr-only">Seleção do Computador</h2>
                    <div class="grid grid-cols-1">
                        <div>
                            <label for="computerSearchInput" class="font-bold">Computador</label>
                            <IconField class="w-full mt-[1vh]">
                                <InputText v-debounce:200ms="getComputerBySearch" v-model="searchedComputer"
                                    id="computerSearchInput" class="w-full" placeholder="Pesquisar computador" />
                                <InputIcon class="pi pi-search" />
                            </IconField>
                        </div>

                        <div class="mt-[4vh] p-4 md:p-5 bg-white border border-[#DDDDDD] rounded-lg 
                                    lg:h-[323px] lg:overflow-y-auto" aria-live="polite" aria-atomic="true">
                            <h3 class="sr-only">Resultados da Pesquisa de Computadores</h3>
                            <DataView :value="allComputers" data-key="id">
                                <template #empty>
                                    <div class="text-xl">
                                        <div v-if="isLoading" v-for="loaderItem in 2" :key="'loader-' + loaderItem"
                                            class="h-fit flex flex-col gap-3 rounded-lg bg-[#FCFDFF] border border-[#DDDDDD] text-[#666666] p-3 mb-6">
                                            <Skeleton v-for="skelItem in 2" :key="skelItem" height="1.0rem" />
                                        </div>
                                        <template v-else>
                                            <div v-if="isComputerSearched" class="mt-4 text-lg text-[#666666]">
                                                <p class="mt-2">Nenhum resultado encontrado para <strong>"{{
                                                    searchedComputer.trim()
                                                        }}"</strong></p>
                                                <p class="text-sm pb-2">Tente pesquisar por outra coisa ou verifique a
                                                    ortografia.</p>
                                            </div>
                                            <p v-else class="block mt-4 text-lg text-[#666666]">
                                                Nenhum computador cadastrado
                                            </p>
                                        </template>
                                    </div>
                                </template>

                                <template #list="computerList">
                                    <div role="list" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-x-[6vw]">
                                        <article v-for="computer in computerList.items" :key="computer.id"
                                            aria-labelledby="'computer_item_heading_' + computer.id"
                                            class="flex flex-col md:flex-row justify-between items-start sm:items-center bg-[#FCFDFF] border border-[#DDDDDD] text-[#666666] rounded-lg p-3 mb-6 gap-x-4">

                                            <template v-if="isLoading">
                                                <div class="h-fit grid grid-cols-1 gap-3 w-full">
                                                    <Skeleton v-for="skelItem in 2" :key="skelItem" height="1.0rem" />
                                                </div>
                                            </template>
                                            <template v-else>
                                                <div class="grid grid-cols-1 w-full md:flex-grow md:w-auto">
                                                    <h4 :id="'computer_item_heading_' + computer.id" class="sr-only">
                                                        Computador {{ formattedBrand(computer.brand) }} {{ computer.cpu
                                                        }}
                                                    </h4>
                                                    <span><strong class="text-[#333]">Marca:</strong> {{
                                                        formattedBrand(computer.brand) }}</span>
                                                    <span><strong class="text-[#333]">Processador:</strong> {{
                                                        computer.cpu }}</span>
                                                </div>

                                                <div
                                                    class="mt-3 w-full md:w-auto md:mt-0 flex-shrink-0 flex justify-center sm:justify-end">
                                                    <Button v-if="computer.quantity"
                                                        @click="handleSelectComputerAndScroll(computer)" type="button"
                                                        class="w-full md:w-28 hover:!bg-[#FDFAF0] !border-[#F2D16D] !text-[#666666]"
                                                        :aria-label="'Selecionar computador ' + formattedBrand(computer.brand) + ' ' + computer.cpu"
                                                        label="Selecionar" outlined />
                                                    <Button v-else type="button" disabled
                                                        class="w-full md:w-28 !border-[#F2D16D] !text-[#666666]"
                                                        :aria-label="'Computador indisponível para registro' + formattedBrand(computer.brand) + ' ' + computer.cpu"
                                                        label="Indisponível" outlined />
                                                </div>
                                            </template>
                                        </article>
                                    </div>
                                </template>

                                <template #footer>
                                    <Paginator v-if="totalRegisters > 0" :rows="query.PageSize"
                                        :total-records="totalRegisters" :page-link-size="2" :first="firstElementPage"
                                        @page="onPaginate" template="PrevPageLink PageLinks NextPageLink" :pt="{
                                            prevIcon: 'text-[#038013]', nextIcon: 'text-[#038013]',
                                            firstIcon: 'text-[#038013]', lastIcon: 'text-[#038013]',
                                        }" aria-label="Paginação dos resultados" />
                                </template>
                            </DataView>
                        </div>

                        <div class="pt-6">
                            <p class="font-bold"><span class="text-[#FF0000]">* </span>Selecionado:
                                <span class="transition-colors duration-200"
                                    :class="(computerSelected.brand || computerSelected.cpu) ? 'text-[#05A51D]' : 'text-[#F97316]'"
                                    aria-live="polite">
                                    {{ computerSelected.brand && computerSelected.cpu ? `${computerSelected.brand} -
                                    ${computerSelected.cpu}` :
                                        (computerSelected.brand || computerSelected.cpu) ?? 'Nenhum computador selecionado'
                                    }}
                                </span>
                            </p>
                        </div>
                    </div>
                </section>

                <section aria-labelledby="registration-details-heading" id="registerOutput">
                    <h2 id="registration-details-heading" class="sr-only">Detalhes do Registro de Saída</h2>
                    <div class="grid grid-cols-1">
                        <fieldset>
                            <legend class="font-bold">Tipo de cadastro</legend>
                            <div class="flex flex-row gap-[8vw] mt-[1vh]">
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="radioOutputOption" inputId="donation_id" name="outputType"
                                        value="donation" />
                                    <label for="donation_id">Doação</label>
                                </div>
                                <div class="flex items-center gap-2">
                                    <RadioButton v-model="radioOutputOption" inputId="sale_id" name="outputType"
                                        value="sale" />
                                    <label for="sale_id">Venda</label>
                                </div>
                            </div>
                        </fieldset>

                        <div class="w-full mt-[6vh] md:mt-[8vh]">
                            <div class="flex flex-col md:flex md:flex-row md:items-start gap-[6vw]">
                                <div class="grid grid-cols-1 items-center gap-y-2 md:flex-1 min-w-0">
                                    <label for="quantityInStockInput" class="font-bold">Estoque</label>
                                    <Select v-model="quantitySelected" :options="quantityInStock" option-label="value"
                                        placeholder="Quantidade" class="w-full" :disabled="isQuantityDisabled"
                                        inputId="quantityInStockInput">
                                        <template #value="slotProps">
                                            <span v-if="slotProps.value">Quantidade: {{ slotProps.value.value }}</span>
                                            <span v-else>Quantidade:</span>
                                        </template>
                                    </Select>
                                </div>
                                <div class="grid grid-cols-1 mt-[3vh] md:mt-0 items-center gap-y-2 md:flex-1 min-w-0">
                                    <label for="datePickerInput" class="font-bold">
                                        {{ radioOutputOption === 'sale' ? 'Data da venda' : 'Data da doação' }}
                                    </label>
                                    <DatePicker disabled v-model="currentDateToRegister" date-format="dd/mm/yy"
                                        inputId="datePickerInput" class="w-full" />
                                </div>
                            </div>
                        </div>

                        <div v-if="radioOutputOption === 'sale'"
                            class="grid grid-cols-1 mt-[6vh] md:mt-[8vh] items-center gap-y-2">
                            <label for="currency-brazil" class="font-bold"><span class="text-[#FF0000]">* </span>Preço
                                por
                                unidade</label>
                            <InputNumber required v-model="computerUnitPrice" input-id="currency-brazil" mode="currency"
                                currency="BRL" locale="pt-BR" placeholder="R$ 0,00"
                                :pt="{ root: { class: 'w-full' } }" />
                        </div>
                    </div>
                </section>

            </div>
            <div
                class="mt-[9vh] md:mt-[8vh] lg:mt-[0vh] flex flex-col-reverse items-center md:flex-row justify-center sm:justify-end gap-[3vw] md:gap-[2vw]">
                <Button @click="$router.go(-1)" type="button"
                    class="w-full sm:w-1/2 md:w-1/4 lg:w-[15%] hover:!bg-[#FDFAF0] !border-[#F2D16D] !text-[#666666]"
                    label="Cancelar" outlined />
                <Button type="submit" label="Registrar" :loading="isSendingForm"
                    :disabled="isSendingForm || !isFormValidToRegister" :class="{
                        'active:scale-95 hover:!bg-[#058D1A]': !isSendingForm && isFormValidToRegister,
                        '!cursor-progress': isSendingForm, '!cursor-not-allowed': !isFormValidToRegister
                    }" class="w-full sm:w-1/2 md:w-1/4 lg:w-[15%] !border-[#2C2C2C] !bg-[#05A51D]" />
            </div>
        </form>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Computer } from '../../models/computer.model';
import { QueryParams } from '../../models/query-params.model';
import { ComputerService } from '../Computer/computer.service';
import { ItemSaleService } from '../Sale/item-sale.service';
import { ItemDonationService } from '../Donation/item-donation.service';
import type { PageState } from 'primevue';
import { take } from 'rxjs';
import vueDebounce from 'vue-debounce';
import { ItemDonationDto } from '../../models/item-donation-dto.model';
import { ItemSaleDto } from '../../models/item-sale-dto.model';
import { ToastService } from '../../utils/toast-service.util';
import { MessageToasts } from '../../utils/toast-messages.util';

export default defineComponent({
    name: "computer-output",
    directives: {
        debounce: vueDebounce({ lock: true }),
    },
    data() {
        return {
            computerSelected: new Computer(),
            allComputers: [] as Computer[],
            query: new QueryParams(1, 2),
            totalRegisters: 0 as number,
            isLoading: true as boolean,
            totalRegistersBeforeReload: 0 as number,
            newDonation: new ItemDonationDto(),
            newSale: new ItemSaleDto(),
            isComputerSearched: false as boolean,
            searchedComputer: "" as string,
            radioOutputOption: "donation" as string,
            quantitySelected: null as { value: number } | null,
            quantityInStock: [] as Array<{ value: number }>,
            currentDateToRegister: new Date(),
            isQuantityDisabled: true as boolean,
            computerUnitPrice: null as number | null,
            computerService: null as ComputerService | null,
            itemSaleService: null as ItemSaleService | null,
            itemDonationService: null as ItemDonationService | null,
            isSendingForm: false as boolean
        };
    },
    created() {
        this.computerService = new ComputerService();
        this.itemSaleService = new ItemSaleService();
        this.itemDonationService = new ItemDonationService();
    },
    methods: {
        getAllComputers(query: QueryParams): void {
            if (!this.computerService) return;

            this.isLoading = true;
            this.totalRegistersBeforeReload = this.totalRegisters;

            this.computerService.allComputers.subscribe({
                next: (response) => {
                    this.allComputers = response.data;
                    this.totalRegisters = response.totalRegisters;

                    const hasRedirected = this.handleVoidPage(this.allComputers, query.PageNumber);

                    if (!hasRedirected) {
                        this.isLoading = false;
                        if (!query.Search && !this.searchedComputer.trim()) {
                            this.isComputerSearched = false;
                        }
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
            if (!this.computerService) return;

            this.query.Search = this.searchedComputer.trim();
            const query: QueryParams = {
                PageNumber: 1,
                PageSize: 2,
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
        createSale(): void {
            if (!this.itemSaleService) return;
            if (!this.computerUnitPrice) return;

            this.isSendingForm = true;

            this.newSale.computerId = this.computerSelected.id;
            this.newSale.priceSale = this.computerUnitPrice;
            this.newSale.quantity = this.quantitySelected?.value;

            this.itemSaleService.sale.subscribe({
                next: () => {
                    this.$toast.add(ToastService.success(MessageToasts.SUCCESS_CREATE_SALE));
                    this.isSendingForm = false;
                    this.clearOutputFields();
                    this.$router.push("/sale");
                },
                error: () => {
                    this.isSendingForm = false;
                }
            });
            this.itemSaleService.createItemSale(this.newSale);
        },
        createDonation(): void {
            if (!this.itemDonationService) return;

            this.isSendingForm = true;

            this.newDonation.computerId = this.computerSelected.id;
            this.newDonation.quantity = this.quantitySelected?.value;

            this.itemDonationService.donation.subscribe({
                next: () => {
                    this.$toast.add(ToastService.success(MessageToasts.SUCCESS_CREATE_DONATION));
                    this.isSendingForm = false;
                    this.clearOutputFields();
                    this.$router.push("/donation");
                },
                error: () => {
                    this.isSendingForm = false;
                }
            });
            this.itemDonationService.createItemDonation(this.newDonation);

        },
        handleComputerOutput(): void {
            if (this.radioOutputOption === "sale") return this.createSale();
            else if (this.radioOutputOption === "donation") return this.createDonation();
            else return this.$toast.add(ToastService.error(MessageToasts.ERROR_GENERIC, "Erro na transação"));
        },
        updateQuantityOptions(stockQuantity: number): void {
            this.quantityInStock = Array.from({ length: stockQuantity }, (_, i) => ({
                value: i + 1
            }));
            this.quantitySelected = null;
        },
        clearOutputFields(): void {
            this.computerSelected = new Computer;
            this.computerUnitPrice = null;
            this.quantitySelected = null;
            this.isQuantityDisabled = true;
        },
        navigateTo(route: string): void {
            this.$router.push(route);
        },
        onPaginate(event: PageState): void {
            this.query.PageNumber = event.page + 1;
            this.$router.replace({ name: "ComputerOutput", query: { page: this.query.PageNumber } });
        },
        getCurrentPage(): void {
            this.query.PageNumber = this.pageFromRoute;
        },
        handleVoidPage(allComputers: Computer[], currentPage: number): boolean {
            if (allComputers === undefined || allComputers.length === 0) {
                if (currentPage > 1) {
                    this.query.PageNumber = 1;
                    this.$router.replace({ name: "ComputerOutput", query: { page: 1 } });
                    return true;
                }
            }
            return false;
        },
        formattedBrand(brand: string | undefined | null): string {
            return !brand || brand.trim() === '' ? 'Sem marca' : brand;
        },
        selectComputer(computer: Computer): void {
            this.computerSelected = computer;
            this.isQuantityDisabled = false;

            this.updateQuantityOptions(Number(computer.quantity));
        },
        handleRadioButtonValue(): void {
            if (this.currentTransactionType === 'donation' || this.currentTransactionType === 'sale') {
                this.radioOutputOption = this.currentTransactionType;
            }
        },
        handleSelectComputerAndScroll(computer: Computer): void {
            this.selectComputer(computer);

            this.$nextTick(() => {
                const targetElement = document.getElementById('registerOutput');
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        }
    },
    watch: {
        radioOutputOption(newValue): void {
            if (newValue === 'donation' || newValue === 'sale') {
                if (this.$route.query.type !== newValue)
                    this.$router.replace({ name: "ComputerOutput", query: { 'type': newValue } });
            }
        },
        currentTransactionType(newValue, oldValue): void {
            if (newValue !== oldValue) {
                this.handleRadioButtonValue();
            }
        },
        pageFromRoute(newPage: number, oldPage: number) {
            if (newPage !== oldPage) {
                this.query.PageNumber = newPage;
                this.getAllComputers(this.query);
            }
        },

    },
    computed: {
        firstElementPage(): number {
            return (this.query.PageNumber - 1) * this.query.PageSize;
        },
        pageFromRoute(): number {
            return Number(this.$route.query.page) || 1;
        },
        currentTransactionType(): string | undefined {
            return this.$route.query.type as string | undefined;
        },
        isFormValidToRegister(): boolean {
            if (!this.computerSelected || !this.computerSelected.id) return false;

            if (this.quantitySelected === null || this.quantitySelected.value <= 0) return false;

            if (this.radioOutputOption === 'donation') return true;

            if (this.radioOutputOption === 'sale') return this.computerUnitPrice !== null && this.computerUnitPrice > 0;

            return false;
        }
    },
    mounted() {
        this.getCurrentPage();
        this.getAllComputers(this.query);
        this.handleRadioButtonValue();
    },
})
</script>