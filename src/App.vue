<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-toolbar-title>Yet Another NTU Stars Planner for {{ academicYear }} {{ academicSemester }} </v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container class="" fluid >
        <v-row align="start" justify="space-between" class=" d-flex flex-row ">
          <v-col cols="12" md="3" class="flex-shrink-1 flex-grow-0">
            <ModuleControls v-model="selectedModules" :current-planned-mods="currentPlan" :apiACADSEM="apiACADSEM" />
          </v-col>
          <v-col cols="12" md="9" class="flex-grow-1 flex-shrink-0">
            <TimeTablePicker v-model="selectedModules" @change="onPlanChange" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
      <span class="mr-4">Made with &hearts; by Wai Gie; &copy; 2020 - {{ currDate.getFullYear() }};</span>
      <v-btn color="primary" class="mr-4" rounded href="https://github.com/woshikie/YANTUSP">Source</v-btn>
      <v-btn color="Accent" rounded href="https://www.buymeacoffee.com/kiethkok">Buy me a ☕</v-btn>
    </v-footer>
  </v-app>
</template>

<script>
import ModuleControls from '@/components/ModuleControls';
import TimeTablePicker from '@/components/TimeTablePicker';

export default {
  components: { TimeTablePicker, ModuleControls },
  data () {
    return {
      selectedModules: undefined,
      currentPlan: undefined,
      currDate: new Date()
    };
  },
  created () {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    onPlanChange (newPlan) {
      this.currentPlan = newPlan;
    }
  },
  computed: {
    academicYear () {
      const year = this.currDate.getFullYear();
      const month = this.currDate.getMonth();
      if (month >= 5 && month < 11) { // Month >= June && Month < December
        return `${year}/${year + 1}`;
      } else { // Month < June || Month == December
        return `${year - 1}/${year}`;
      }
    },
    academicSemester () {
      const month = this.currDate.getMonth();
      if (month >= 5 && month < 11) { // Month >= June && Month < December
        return 'S1';
      } else { // Month < June || Month == December
        return 'S2';
      }
      // return 'Semester Not Supported for now!';
    },
    apiYear () {
      return this.academicYear.split('/')[0];
    },
    apiSemester () {
      return this.academicSemester[1];
    },
    apiACADSEM () {
      return `${this.apiYear};${this.apiSemester}`;
    }
  },
  metaInfo: {
    title: 'YANTUSP',
    meta: [
      { name: 'description', description: 'Yet Another NTU Stars Planner' },
      { property: 'og:site_name', content: 'Yet Another NTU Stars Planner' },
      { property: 'og:type', content: 'website' },
      { name: 'robots', content: 'index,follow' }
    ]
  }
};
</script>
<style>
*::-webkit-scrollbar-track{
  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
  background-color: #000000;
}
*::-webkit-scrollbar{
  width: 0.25em;
  height: 0.5em;
  background-color: #000000;
}
*::-webkit-scrollbar-thumb{
  background-color: #F5F5F5;
}
html {
  overflow: auto;
}
</style>
