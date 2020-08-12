<template>
  <v-container fluid class="d-flex align-center flex-column fill-height">
    <h1>Plan {{ planIndex+1 }} out of {{ plans.length }}</h1>
    <TimeTableViewer :value="selectedPlan" class="flex d-flex" />
  </v-container>

</template>
<script>
import TimeTableViewer from '@/components/TimeTableViewer';

export default {
  name: 'TimeTablePicker',
  components: { TimeTableViewer },
  props: {
    value: { // This is my selected module
      type: Object,
      default () { return {}; }
    }
  },
  mounted () {
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
    }
  },
  data () {
    return {
      planIndex: 0
    };
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
                block1.time.end <= block2.time.start
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
        plan[i].index = currentCourseIndexTimings;
      }
      return plan;
    }
  }
};
</script>
<style scoped>

</style>
