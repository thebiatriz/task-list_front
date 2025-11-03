<template>
    <nav class="fixed top-0 w-full z-50">
        <Menubar :model="items"
            class="border !border-[#DDDDDD] flex justify-between h-20 items-center !px-[6vw] md:!px-[2vw] !rounded-none"
            :pt="{
                itemLabel: ['text-[#666666] font-semibold'],
                submenuIcon: ['text-[#666666]']
            }">
            <template #start>
                <div @click="navigateTo('/')" class="flex items-center cursor-pointer ml-0 md:ml-4">
                    <img src="../../assets/images/robotics-logo.svg" alt="logo" class="h-10" />
                </div>
            </template>
        </Menubar>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "navbar",
    data() {
        return {
            items: [
                {
                    label: "Home",
                    command: () => this.navigateTo('/')

                },
                {
                    label: "Computadores",
                    items: [
                        {
                            label: "Visualizar",
                            command: () => this.navigateTo('/computer')
                        },
                        {
                            label: "Registrar",
                            command: () => this.navigateTo('/computer/register')
                        }
                    ]

                },
                {
                    label: "Vendas",
                    items: [
                        {
                            label: "Visualizar",
                            command: () => this.navigateTo('/sale')
                        },
                        {
                            label: "Registrar",
                            command: () => this.navigateTo('/computer-output', 'sale')
                        }
                    ]
                },
                {
                    label: "Doações",
                    items: [
                        {
                            label: "Visualizar",
                            command: () => this.navigateTo('/donation')
                        },
                        {
                            label: "Registrar",
                            command: () => this.navigateTo('/computer-output', 'donation')
                        }
                    ]
                }
            ]
        }
    },

    methods: {
        navigateTo(route: string, type?: string): void {
            if (type) {
                this.$router.push({
                    path: route,
                    query: { 'type': type.toLowerCase() }
                });
            } else {
                this.$router.push(route);
            }
        }
    }
})
</script>
