<template>
  <v-container fluid >
    <div class="flex text-center">
      <div v-for="row_i in 30" :key="makeKeyRow(row_i)" class="d-flex flex-row">
        <v-col v-for="col_i in 7" :key="makeKeyCol(col_i)" class="d-flex flex-column flex timetable-cell">
          {{ getContent(col_i, row_i) }}
        </v-col>
      </div>
    </div>
  </v-container>
</template>
<script>
export default {
  name: 'TimeTableViewer',
  props: {
    value: {
      type: Object,
      default () { return {}; }
    }
  },
  computed: {
    uid () {
      return this._uid;
    }
  },
  methods: {
    makeKeyCol (index) {
      return this.uid + 'col_i' + index;
    },
    makeKeyRow (index) {
      return this.uid + 'row_i' + index;
    },
    getRowClasses (x, y) {
      return ['timetable-cell', 'flex'];
    },
    getContent (x, y) {
      if (y === 1) return this.getHeaders(x);
      if (x === 1) return this.getHours(y);
      // return `(${x}, ${y})`;
      return '';
    },
    getHeaders (x) {
      switch (x) {
      case 1:
        return 'time\\day';
      case 2:
        return 'Monday';
      case 3:
        return 'Tuesday';
      case 4:
        return 'Wednesday';
      case 5:
        return 'Thursday';
      case 6:
        return 'Friday';
      case 7:
        return 'Saturday';
      }
    },
    getHours (y) {
      const start = 830;
      const offset = ((y - 1) * 30);
      const hrStart = start + offset;
      const hrEnd = hrStart + 30;
      const hrStartStr = hrStart.toString().padStart(4, '0');
      const hrEndStr = hrEnd.toString().padStart(4, '0');
      return `${hrStartStr} - ${hrEndStr}`;
    }
  }
};
</script>
<style scoped>
.timetable-cell{
  border-bottom: 1px solid white;
  border-top: 1px solid white;
  border-left: 1px solid white;
}
.timetable-cell:last-child{
  border-right: 1px solid white;
}
</style>
