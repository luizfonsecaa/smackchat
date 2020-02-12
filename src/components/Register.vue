<template>
  <q-form @submit="submitForm">
    <q-input 
        outlined
        class="q-mb-md" 
        v-model="formData.name" 
        label="Name" />

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
              name: '',
              email: '',
              password:''
          }
      }
  },
   methods: {
    ...mapActions('store', ['registerUser']),
    submitForm() {
      this.registerUser(this.formData)
    }
  }
}

</script>

<style>

</style>