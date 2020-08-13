<template>
  <v-container fluid >
    <v-simple-table dense class="flex text-center">
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-center" v-for="index in 7" :key="'ttv-header-'+index">{{ getHeaders(index) }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="row_i in 30" :key="'ttv-row-'+row_i">
          <td v-for="(cell, col_i) in getCols(row_i)" :rowspan="cell.rowSpan"
              :key="'ttv-row'+row_i+'-col-'+col_i" >
            <p v-for="(cellContent, content_i) in cell.content" :key="'ttv-row'+row_i+'-col-'+col_i+'-content-'+content_i">
              {{ cellContent }}
            </p>
          </td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>
<script>
import TimeTableViewerCell from '@/classes/TimeTableViewerCell';

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
    getCols (y) {
      const cols = [];
      for (let x = 1; x <= 7; x++) {
        const content = this.getContent(x, y);
        if (content !== undefined) {
          cols.push(content);
        }
      }
      return cols;
    },
    getContent (x, y) {
      // if (y === 1) return this.getHeaders(x);
      if (x === 1) {
        return new TimeTableViewerCell({
          content: [this.getHours(y)]
        });
      }
      // return `(${x}, ${y})`;
      const moduleHits = this.getModule(x, y);
      let retObj;
      if (moduleHits.length > 0) {
        const content = [];
        let rowSpan = 1;
        for (const hit in moduleHits) {
          const test = moduleHits[hit];
          if (test.isStart) {
            let str = `${test.modCode}, ${test.timeslot.type}`;
            switch (test.timeslot.remarkType) {
            case 1: str += ', ODD WEEKS ONLY'; break;
            case 2: str += ', EVEN WEEKS ONLY'; break;
            // default: str += ')';
            }
            content.push(str);
            rowSpan = test.colSpan;
            retObj = new TimeTableViewerCell({
              content: content,
              rowSpan: rowSpan
            });
          }
        }
      } else {
        retObj = new TimeTableViewerCell();
      }
      // return `(${x}, ${y})`;
      return retObj;
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
            currentHourStart >= timeslot.time.start && currentHourEnd <= timeslot.time.end
          ) {
            ret.push({
              modCode: mod.code,
              timeslot: timeslot,
              isStart: currentHourStart === timeslot.time.start,
              colSpan: this.getColSpan(timeslot.time.start, timeslot.time.end)
            });
          }
        }
      }
      return ret;
    },
    getColSpan (hourStart, hourEnd) {
      const duration = hourEnd - hourStart;
      return Math.floor(duration / 100) * 2 + (((duration % 100) !== 0) ? 1 : 0);
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
      const realY = (y - 1);
      // if (realY === 0) return 0;
      const minutes = realY * 30;
      return (Math.floor(minutes / 60) * 100) + (minutes % 60);
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
.timetable-col{
  border: 1px solid white;
}
.timetable-cell{
  border-bottom: 1px solid white;
  border-top: 1px solid white;
  ;
}
.timetable-cell:last-child{
  border-right: 1px solid white;
}

/deep/ .v-data-table td {
  border-left: thin solid rgba(255, 255, 255, 0.12);
  border-right: thin solid rgba(255, 255, 255, 0.12);
}
</style>
