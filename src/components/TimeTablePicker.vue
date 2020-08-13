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
      icons: { mdiArrowRight, mdiArrowLeft },
      isGenerating: false,
      plans: []
    };
  },
  computed: {
    // plans () {
    //   return this.generatePlans();
    // },
    selectedModule: {
      get () { return this.value; },
      set (val) { this.value = val; }
    },
    selectedPlan () {
      if (this.isGenerating) return [];
      const plan = this.withData(this.plans[this.planIndex]);
      this.bgGeneratePlans();
      this.$emit('change', plan);
      return plan;
    },
    selectedIndex () {
      if (this.plans === undefined || this.plans.length === 0) return 0;
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
    bgGeneratePlans () {
      this.isGenerating = true;
      this.planIndex = 0;
      this.plans = this.generatePlans(this.selectedModule);
      // this.$worker.run(this.generatePlans, [this.selectedModule]).then((newPlans) => {
      //   console.log('newPlans', newPlans);
      //   this.plans = newPlans;
      //   this.isGenerating = false;
      // });
      this.isGenerating = false;
    },
    generatePlans (selectedModule) {
      if (selectedModule === undefined) return;
      let combinations = [];
      for (const courseCode in selectedModule) {
        const currCourse = selectedModule[courseCode];
        const currentCombinations = [];
        for (const currCourseIndex in currCourse.indexes) {
          const course = {
            code: courseCode,
            index: currCourseIndex
          };
          if (combinations.length === 0) {
            currentCombinations.push([course]);
            // temp.push([course]);
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
        combinations = this.filterClashes(currentCombinations);
        // combinations = currentCombinations;
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
