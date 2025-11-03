<template>
    <main class="flex flex-col justify-center text-center min-h-screen text-[#666666]">
        <img src="/page-not-found.svg" alt="Imagem de erro 404 para página não encontrada"
            class="justify-center h-64 md:h-96" />
        <h1 class="pt-2 text-3xl font-bold text-[#263238]">Erro 404 - Página não encontrada</h1>
        <p>Desculpe, a página que você está procurando não foi encontrada.</p>
        <router-link to="/" class="block mt-[2vh] underline hover:text-gray-700 transition-colors">Voltar para a página
            inicial</router-link>
        </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "not-found"
})
</script>