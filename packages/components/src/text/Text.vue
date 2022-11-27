<template>
  <div>
    测试公用组件 {{ msg }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup(){
    const msg = ref('Test')
    return {
      msg
    }
  }
})
</script>

<style>

</style>