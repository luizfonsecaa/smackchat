<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions('store', ['hundleAuthStateChanged'])
  },
  mounted() {
    this.hundleAuthStateChanged()
  }
}
</script>
