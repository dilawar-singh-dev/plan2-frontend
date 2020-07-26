<template>
<v-app>
  <div id="app">
    <vue-confirm-dialog></vue-confirm-dialog>
    <nprogress-container></nprogress-container>
    <notifications></notifications>
    <router-view/>
  </div>
  </v-app>
</template>
<script>
import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
 
export default {
  components: {
    NprogressContainer
  }
}
</script>