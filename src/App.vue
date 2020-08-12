<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-toolbar-title>Yet Another NTU Stars Planner</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height" fluid >
        <v-row align="center" class="fill-height d-flex flex-row justify-space-between">
          <v-col cols="12" sm="3" class="fill-height">
            <ModuleControls v-model="selectedModules" :current-planned-mods="currentPlan"/>
          </v-col>
          <v-col cols="12" sm="9" class="">
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
