<template>
  <v-container fluid class="d-flex align-center flex-column fill-height">
    <h1>Plan 1 out of 2</h1>
    <TimeTableViewer class="flex d-flex" />
  </v-container>

</template>
<script>
import TimeTableViewer from '@/components/TimeTableViewer';

export default {
  name: 'TimeTablePicker',
  components: { TimeTableViewer },
  props: {
    value: {
      type: undefined,
      default: {}
    }
  }
};
</script>
<style scoped>

</style>
