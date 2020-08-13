<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-toolbar-title>Yet Another NTU Stars Planner</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container class="" fluid >
        <v-row align="start" justify="space-between" class=" d-flex flex-row ">
          <v-col cols="12" md="5" class="flex-shrink-1 flex-grow-0">
            <ModuleControls v-model="selectedModules" :current-planned-mods="currentPlan"/>
          </v-col>
          <v-col cols="12" md="7" class="flex-grow-1 flex-shrink-0">
            <TimeTablePicker v-model="selectedModules" @change="onPlanChange" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer app>
      <span>Made with &hearts; by Wai Gie; &copy; 2020 - {{ new Date().getFullYear() }}</span>
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
      currentPlan: undefined
    };
  },
  created () {
    this.$vuetify.theme.dark = true;
  },
  methods: {
    onPlanChange (newPlan) {
      this.currentPlan = newPlan;
    }
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
