<template>
  <div v-loading="loading"></div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      loading: true
    }
  },
  props: {
  }
}
</script>
