<template>
    <footer
        class="bg-white border border-[#DDDDDD] text-center bottom-0 w-full text-sm text-[#666666] z-50 py-5 px-[2vh] md:px-[7vh]">
        <p>&copy; {{ currentYear }} Instituto Robótica Sustentável. Todos os direitos reservados.</p>
        <router-link to="/team" class="underline">Sobre a equipe</router-link>
    </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Footer',
    data() {
        return {
            currentYear: new Date().getFullYear()
        };
    }
});
</script>