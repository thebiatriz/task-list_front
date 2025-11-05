<template>
    <section class="flex justify-center">
        <Dialog :visible="visible" @update:visible="closeDialog" :dismissable-mask="true" modal
            :style="{ width: '25rem' }">
            <template #header>
                <span class="text-2xl font-bold">Deletar {{ title }}</span>
            </template>

            <div class="flex flex-col gap-4 mt-4">
                <p class="block mb-8">Você confirma em excluir {{ description }}? <br>Essa ação não é reversível.</p>

                <div class="flex justify-end gap-2 mt-4">
                    <Button type="button" label="Cancelar" severity="secondary" @click="closeDialog" />

                    <Button label="Confirmo a exclusão" severity="danger" variant="outlined" @click="onDelete" />
                </div>
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