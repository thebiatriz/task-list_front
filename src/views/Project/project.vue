<template>
    <main class="w-full">
        <ViewHeader titleHeader="Meus Projetos" :showButtonBack="true" @navigate-back="$router.go(-1)" />
        <div>PROJECT</div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "projectList"
})
</script>