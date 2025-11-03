<template>
    <section class="flex justify-center">
        <Dialog :visible="visible" @update:visible="closeDialog" :dismissable-mask="true" modal
            pt:root:class="!bg-[#FFFFFF] !border-[#DDDDDD]" class="w-4/5 md:w-[45%] lg:w-1/3 px-0 lg:px-[1%]">
            <template #header>
                <span class="text-3xl font-bold">Deletar {{ title }}</span>
            </template>
            <span class="block mb-8">Você confirma em deletar {{ description }}</span>
            <div class="flex justify-end gap-4 lg:gap-6 pt-[3%]">
                <Button type="button"
                    class="hover:!bg-[#FDFAF0] !border-[#F2D16D] !text-[#666666] !rounded-lg w-1/2 lg:w-[29%] active:scale-95"
                    text label="Cancelar" aria-label="Cancelar que irá deletar" @click="closeDialog" outlined />
                <Button type="button"
                    class="!border-[#2C2C2C] !bg-[#05A51D] hover:!bg-[#058D1A] !rounded-lg w-1/2 lg:w-[29%] active:scale-95"
                    label="Confirmar" aria-label="Confirmar que irá deletar" @click="onDelete" />
            </div>
        </Dialog>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        visible: {
            type: Boolean,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        }
    },
    methods: {
        closeDialog(): void {
            this.$emit('cancel-dialog');
        },
        onDelete(): void {
            this.$emit('confirm-delete');
        }
    }
});
</script>