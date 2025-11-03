<template>
  <Toast :position="isMobileScreen ? 'top-center' : 'top-right'" />
  <template v-if="shouldShowNavigation">
    <Navbar />
    <main class="min-h-screen pt-36 sm:pt-[28vh] md:pt-[20vh] pb-[5vh] px-[4vh] md:px-[7vh]">
      <RouterView />
    </main>
    <Footer />
  </template>
  <template v-else>
    <main class="min-h-screen px-[4vh] md:px-0">
      <RouterView />
    </main>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { isScreenSizeMobile } from "./utils/screen-size.util";

export default defineComponent({
  name: "App",
  data() {
    return {
      isMobileScreen: isScreenSizeMobile()
    }
  },
  methods: {
    updateIsMobileScreenState() {
      this.isMobileScreen = isScreenSizeMobile();
    }
  },
  computed: {
    shouldShowNavigation(): boolean {
      return !this.$route.meta.hideNavigation;
    },
  },
  mounted() {
    window.addEventListener('resize', this.updateIsMobileScreenState);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateIsMobileScreenState);
  },
})
</script>