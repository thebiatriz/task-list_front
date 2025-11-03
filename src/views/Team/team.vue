<template>
    <main class="w-full text-[#333] text-left">
        <ViewHeader titleHeader="Sobre a equipe" :showButtonBack="true" @navigate-back="$router.go(-1)" />

        <section class="p-5 border border-[#DDDDDD] rounded-lg mb-[4vh]">
            <h2 class="text-xl font-medium mb-[2vh]">Motivação</h2>
            <p>Esse site foi desenvolvido por um time de estudantes do curso de <strong>Análise e Desenvolvimento de
                    Sistemas do
                    Centro Universitário Fametro (Unifametro).</strong></p>
            <p>O objetivo principal era construir um sistema capaz de gerir o gerenciamento de computadores do Instituto
                de Robótica Sustentável.</p>
            <p>As atividades de cada membro foram decididas de acordo com as respectivas habilidades individuais.</p>
        </section>

        <section class="p-5 border border-[#DDDDDD] rounded-lg">
            <h2 class="text-xl font-medium mb-[2vh]">Integrantes</h2>
            <ul class="space-y-5">
                <li v-for="member in teamMembers" :key="member.name" class="flex items-center gap-6 justify-between">
                    <div class="flex flex-col">
                        <span class="font-semibold">{{ member.name }}</span>
                        <span class="text-sm text-[#666666]">{{ member.role }}</span>
                    </div>
                    <div class="flex items-center gap-4 text-2xl text-gray-600">
                        <a v-if="member.linkedin" :href="member.linkedin" target="_blank" rel="noopener noreferrer"
                            class="hover:text-[#0A66C2] transition-colors" :aria-label="'LinkedIn de ' + member.name">
                            <i class="pi pi-linkedin" />
                        </a>
                        <a v-if="member.github" :href="member.github" target="_blank" rel="noopener noreferrer"
                            class="hover:text-black transition-colors" :aria-label="'GitHub de ' + member.name">
                            <i class="pi pi-github" />
                        </a>
                    </div>
                </li>
            </ul>
        </section>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: "Team",
    data() {
        return {
            teamMembers: [
                {
                    name: 'Jader Ribeiro',
                    role: 'Gestor da equipe',
                    linkedin: 'https://linkedin.com/in/jader-ribeiro-3890b6327',
                    github: 'https://github.com/jaderdossantos'
                },
                {
                    name: 'Priscila Gadelha',
                    role: 'Responsável pelo banco de dados',
                    linkedin: 'https://linkedin.com/in/pgadelha',
                    github: 'https://github.com/http-riscila'
                },
                {
                    name: 'Antonio José',
                    role: 'Dev back-end',
                    linkedin: 'https://linkedin.com/in/antonio-jose-dos-santos-filho',
                    github: 'https://github.com/Antonio-Filho0309'
                },
                {
                    name: 'Beatriz Monteiro',
                    role: 'Dev front-end',
                    linkedin: 'https://linkedin.com/in/beatrizmonteirofig',
                    github: 'https://github.com/thebiatriz'
                }
            ]
        };
    }
})
</script>