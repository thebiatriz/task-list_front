<template>
    <main class="w-full">
        <ViewHeader titleHeader="Bem-vindo(a) ao Gerenciador de Projetos" />

        <section class="text-[#666666] mt-[5vh]">
            <h2 class="text-lg md:text-xl">O que você pode fazer agora?</h2>
            <div class="flex flex-col sm:flex-row gap-4 mt-[2vh] justify-center sm:justify-start">
                <Button @click="navigateTo('/projects')" label="Ver os seus Projetos" icon="pi pi-plus-circle"
                    class="!text-[#666666] !bg-[#FFFFFF] hover:!bg-gray-100 !transition-colors !shadow-sm !border-none" />
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "home",
    methods: {
        navigateTo(route: string): void {
            this.$router.push(route)
        }
    }
})

</script>