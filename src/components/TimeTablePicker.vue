<template>
  <v-container fluid class="d-flex align-center flex-column fill-height">
    <v-row no-gutters class="d-flex justify-space-around align-center col-12">
      <v-btn :disabled="isLeftBtnDisabled" @click="planIndex--;"><v-icon>{{ icons.mdiArrowLeft }}</v-icon></v-btn>
      <h1>Plan {{ selectedIndex }} out of {{ plans.length }}</h1>
      <v-btn :disabled="isRightBtnDisabled" @click="planIndex++;"><v-icon>{{ icons.mdiArrowRight }}</v-icon></v-btn>
    </v-row>

    <TimeTableViewer :value="selectedPlan" class="flex d-flex" />
  </v-container>

</template>
<script>
import TimeTableViewer from '@/components/TimeTableViewer';
import { mdiArrowLeft, mdiArrowRight } from '@mdi/js';
export default {
  name: 'TimeTablePicker',
  components: { TimeTableViewer },
  props: {
    value: { // This is my selected module
      type: Object,
      default () { return {}; }
    }
  },
  data () {
    return {
      planIndex: 0,
      icons: { mdiArrowRight, mdiArrowLeft }
    };
  },
  watch: {
    selectedPlan () {
      this.$emit('change', this.selectedPlan);
    }
  },
  computed: {
    selectedModule: {
      get () { return this.value; },
      set (val) { this.value = val; }
    },
    plans: {
      get () {
        let plans = this.generatePlans();
        plans = this.filterClashes(plans);
        return plans;
      }
    },
    selectedPlan () {
      return this.withData(this.plans[this.planIndex]);
    },
    selectedIndex () {
      if (this.plans.length === 0) return 0;
      return this.planIndex + 1;
    },
    isLeftBtnDisabled () {
      return this.planIndex === 0;
    },
    isRightBtnDisabled () {
      return (this.planIndex + 1 >= this.plans.length);
    }
  },

  methods: {
    generatePlans () {
      if (this.selectedModule === undefined) return;
      this.planIndex = 0;
      let combinations = [];
      for (const courseCode in this.selectedModule) {
        const currCourse = this.selectedModule[courseCode];
        const currentCombinations = [];
        for (const currCourseIndex in currCourse.indexes) {
          const course = {
            code: courseCode,
            index: currCourseIndex
          };
          if (combinations.length === 0) {
            currentCombinations.push([course]);
          } else {
            for (const combo in combinations) {
              const arr = [
                ...combinations[combo],
                course
              ];
              currentCombinations.push(arr);
            }
          }
        }
        combinations = currentCombinations;
      }
      return combinations;
    },
    filterClashes (plans) {
      const filteredPlans = [];
      for (const p in plans) {
        const plan = this.hydratePlan(plans[p]);
        let hasClash = false;
        if (plan.timings.length > 1) {
          for (let t1 = 0; t1 < plan.timings.length - 1; t1++) {
            for (let t2 = t1 + 1; t2 < plan.timings.length; t2++) {
              const block1 = plan.timings[t1];
              const block2 = plan.timings[t2];
              if (
                block1.day !== block2.day ||
                block1.time.start >= block2.time.end ||
                block1.time.end <= block2.time.start ||
                (
                  block1.remarkType !== 0 && block2.remarkType !== 0 &&
                  block1.remarkType !== block2.remarkType
                )
              ) continue;
              hasClash = true;
              break;
            }
            if (hasClash) break;
          }
        }
        if (!hasClash) filteredPlans.push(plans[p]);
      }
      return filteredPlans;
    },
    hydratePlan (plan) {
      const ret = {};
      ret.reference = plan;
      ret.timings = [];
      for (const i in plan) {
        const courseCode = plan[i].code;
        const indexNumber = plan[i].index;
        const currentCourseIndexTimings = this.selectedModule[courseCode].indexes[indexNumber];
        ret.timings = ret.timings.concat(currentCourseIndexTimings);
      }
      return ret;
    },
    withData (plan) {
      for (const i in plan) {
        const courseCode = plan[i].code;
        const indexNumber = plan[i].index;
        const currentCourseIndexTimings = this.selectedModule[courseCode].indexes[indexNumber];
        plan[i].timings = currentCourseIndexTimings;
      }
      return plan;
    }
  }
};
</script>
<style scoped>

</style>
