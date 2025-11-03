<template>
    <header class="flex items-center flex-row gap-2 pb-[4.5vh] justify-between">
        <h1 class="font-bold text-2xl md:text-3xl text-[#333333]">
            <span>
                {{ titleHeader }}&nbsp;<span class="text-[#05A51D]"> {{ titleForRobotics }} </span>
            </span>
        </h1>
        <div class="flex justify-end items-center md:mr-[2.5vw] md:pr-4 hover:bg-gray-50 rounded-full transition-colors">
            <Button v-if="showButtonRegister" @click="$emit('to-register')"
                class="!rounded-full !bg-[#05A51D] hover:!bg-[#058D1A] items-center h-10" type="button"
                icon="pi pi-plus" />
            <div v-else-if="showButtonBack" class="flex items-center cursor-pointer" @click="$emit('navigate-back')">
                <Button class="!rounded-full !text-[#05A51D]" severity="secondary" text type="button"
                    icon="pi pi-chevron-circle-left" :pt="{
                        root: {
                            class: [
                                'hover:!bg-transparent',
                                'focus:!outline-none',
                                'active:!bg-transparent',
                                'active:!border-transparent',
                            ]
                        },
                        icon: { class: '!text-2xl' }
                    }" />
                <span class="hidden md:block text-[#05A51D]">Voltar</span>
            </div>
        </div>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'view-header',
    props: {
        titleHeader: {
            type: String,
            required: true
        },
        showButtonRegister: {
            type: Boolean,
        },
        showButtonBack: {
            type: Boolean,
        },
        titleForRobotics: {
            type: String,
        }
    },
})
</script>