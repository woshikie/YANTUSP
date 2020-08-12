<template>
  <v-container fluid >
    <div class="flex text-center">
      <div v-for="row_i in 30" :key="makeKeyRow(row_i)" class="d-flex flex-row">
        <v-col v-for="col_i in 7" :key="makeKeyCol(col_i)"
               :class="shouldRender(col_i, row_i)">
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
      type: Array,
      default () { return []; }
    }
  },
  computed: {
    uid () {
      return this._uid;
    },
    plan () {
      return this.value;
    }
  },
  methods: {
    makeKeyCol (index) {
      return this.uid + 'col_i' + index;
    },
    makeKeyRow (index) {
      return this.uid + 'row_i' + index;
    },
    shouldRender (x, y) {
      const base = ['d-flex', 'flex-column', 'flex', 'timetable-cell'];
      // base.push('hidden');
      return base;
    },
    getContent (x, y) {
      if (y === 1) return this.getHeaders(x);
      if (x === 1) return this.getHours(y);
      // return `(${x}, ${y})`;
      const moduleHits = this.getModule(x, y);
      if (moduleHits.length > 0) {
        let ret = '';
        for (const hit in moduleHits) {
          const test = moduleHits[hit];
          ret += `${test.modCode}, ${test.timeslot.type}`;
        }
        return ret;
      }
      return '';
    },
    getModule (x, y) {
      const currentHourStart = this.getHourStart(y);
      const currentHourEnd = this.fixHour(currentHourStart + 30);
      const currentDay = this.toDay(x);
      const ret = [];
      for (const i in this.plan) {
        const mod = this.plan[i];
        for (const j in mod.timings) {
          const timeslot = mod.timings[j];
          if (
            timeslot.day === currentDay &&
            currentHourStart >= timeslot.time.start &&
            currentHourEnd <= timeslot.time.end
          ) {
            ret.push({
              modCode: mod.code,
              timeslot: timeslot
            });
          }
        }
      }
      return ret;
    },
    getHeaders (x) {
      switch (x) {
      case 1:
        return 'Time\\Day';
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
      const hrStart = this.getHourStart(y);
      const hrEnd = this.fixHour(hrStart + 30);
      const hrStartStr = hrStart.toString().padStart(4, '0');
      const hrEndStr = hrEnd.toString().padStart(4, '0');
      return `${hrStartStr} - ${hrEndStr}`;
    },
    getHourStart (y) {
      const start = 830;
      const offset = this.getHourOffset(y);
      return this.fixHour(start + offset);
    },
    getHourOffset: function (y) {
      const realY = (y - 2);
      // if (realY === 0) return 0;
      const minutes = realY * 30;
      return (Math.floor(minutes / 60) * 100) + (minutes % 60);
    },
    getHourEnd (y) {
      return this.fixHour(this.getHourStart(y) + 30);
    },
    fixHour (hour) {
      const offset = hour % 100;
      if (offset >= 60) {
        return this.fixHour(hour - offset + 100 + (offset - 60));
      }
      return hour;
    },
    toDay (x) {
      switch (x) {
      case 2: return 'MON';
      case 3: return 'TUE';
      case 4: return 'WED';
      case 5: return 'THU';
      case 6: return 'FRI';
      case 7: return 'SAT';
      }
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
.hidden{
  display: none !important;
}
</style>
