<template>
    <footer
        class="bg-white border border-[#DDDDDD] text-center bottom-0 w-full fixed text-sm text-[#666666] z-50 py-5 px-[2vh] md:px-[7vh]">
        <p>&copy; {{ currentYear }} Gerenciador de Projetos. Todos os direitos reservados.</p>
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