<template>
  <q-form @submit="submitForm">
    <q-input 
      outlined
      class="q-mb-md" 
      v-model="formData.email" 
      label="Email" />

    <q-input 
      outlined
      class="q-mb-md" 
      v-model="formData.password" 
      label="Senha" />

    <div class="row">
      <q-space />
      <q-btn 
        type="submit"
        color="primary" 
        :label="tab"/> 
    </div>
  </q-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props:[
      'tab',
  ],
  data() {
      return {
          formData: {
              email: '',
              password:''
          }
      }
  },
  methods: {
    // ...mapActions('store', ['registerUser', 'loginUser']),
    ...mapActions('store', ['loginUser']),

    submitForm() {
      this.loginUser(this.formData)  
    }
  }
}
</script>

<style>

</style>