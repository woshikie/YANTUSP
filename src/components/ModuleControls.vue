<template>
  <div class="d-flex flex-column align-start justify-start fill-height max-h-100 ml-2">
    <div class="d-flex flex-row justify-center align-baseline w-100">
      <v-text-field :clearable="true" :clear-icon="icons.mdiClose" :value="txtModule" @click:clear="fetchModuleResult=[]"
                    @input="txtModuleChange($event)" label="Enter Module Code here!" />
    </div>
    <div class="align-start d-flex flex-column overflow-auto max-w-100">
      <h2 v-if="!hasResult">{{ helperText }}</h2>
      <v-btn v-for="(mod, index) in fetchModuleResult" @click="onModuleAdd(mod)"
             :key="'fetchModuleResult[]+'+index" class="text-no-wrap mt-1">
        <v-icon class="mr-2">{{ icons.mdiPlus }}</v-icon>
        <span>{{ mod.code }} {{mod.name}}</span>
      </v-btn>
    </div>
    <div class="d-flex justify-space-between flex-row w-100 mt-2">
      <h3>Selected Modules:</h3>
      <v-btn @click="onClearAllModule">Clear All</v-btn>
    </div>
    <h4 v-if="hasNoModulesSelected">No Modules Selected!</h4>
    <div class="d-flex flex-column align-start overflow-auto max-w-100">
      <v-btn v-for="(mod, index) in selectedModules" class="mt-1" @click="onModuleDelete(mod.code)"
             :key="'selectedModules[]+'+index + mod.code">
        <v-icon class="mr-2">{{ icons.mdiMinus }}</v-icon>
        <span>{{ mod.code }} {{mod.name}}</span>
      </v-btn>
    </div>
    <div class="w-100 mt-2">
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th>Module Code</th>
              <th>Index</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(mod, index) in currentPlannedMods" :key="uid + '-mini-table-' + index">
              <td>{{ mod.code }}</td>
              <td>{{ mod.index }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import $ from 'jquery';
import { mdiPlus, mdiMinus, mdiClose } from '@mdi/js';
import ModuleIndexLesson from '@/classes/ModuleIndexLesson';
import Module from '@/classes/Module';
export default {
  name: 'ModuleControls',
  props: {
    currentPlannedMods: {
      type: Array,
      default () { return []; }
    }
  },
  data: () => ({
    icons: { mdiPlus, mdiMinus, mdiClose },
    txtModule: '',
    fetchModulePromise: null,
    fetchModuleResult: [],
    selectedModules: {}
  }),
  methods: {
    parseModName (table) {
      const strongArr = $(table).find('b font');
      if (strongArr.length < 3) return undefined;
      return {
        code: strongArr[0].innerText.trim(),
        name: strongArr[1].innerText.trim(),
        AU: parseFloat(strongArr[2].innerText.trim().split(' ')[0])
      };
    },
    parseModIndexes (table) {
      const rows = $(table).find('tr');
      let currentModIndex;
      const indexes = {};
      for (let i = 0; i < rows.length; i++) {
        const row = $(rows[i]);
        const cols = $(row).find('td');
        if (cols.length !== 7) continue; // Skip Header
        const modIndex = this.parseModIndex(cols[0]);
        if (modIndex !== undefined) currentModIndex = modIndex;
        const modLesson = new ModuleIndexLesson({
          type: cols[1].innerText,
          group: cols[2].innerText,
          day: cols[3].innerText,
          time: this.parseLessonTime(cols[4].innerText),
          venue: cols[5].innerText,
          remarks: cols[6].innerText,
          remarkType: this.parseRemarks(cols[6].innerText)
        });
        if (currentModIndex !== undefined) {
          if (indexes[currentModIndex] === undefined) { indexes[currentModIndex] = []; }
          indexes[currentModIndex].push(modLesson);
        }
      }
      return indexes;
    },
    parseModIndex (col) {
      const test = $(col).find('b');
      if (
        test.length === 0 ||
        test[0].innerText === undefined ||
        (test[0].innerText !== undefined && test[0].innerText.length === 0)
      ) return;
      return test[0].innerText;
    },
    parseRemarks (remark) {
      return ModuleIndexLesson.parseRemarks(remark);
    },
    parseLessonTime (time) {
      return ModuleIndexLesson.parseLessonTime(time);
    },
    getModules () {
      const formData = {
        STAFF_ACCESS: false,
        ACADSEM: '2020;1',
        boption: 'Search',
        r_search_type: 'F',
        r_subj_code: this.txtModule
      };
      const url1 = 'https://cors-anywhere.herokuapp.com/';
      const url = url1 + ('https://wish.wis.ntu.edu.sg/webexe/owa/AUS_SCHEDULE.main_display1');
      if (this.fetchModulePromise != null) {
        this.fetchModulePromise.abort();
        this.fetchModulePromise = null;
      }
      this.fetchModuleResult = [];
      this.fetchModulePromise = $.ajax({
        method: 'POST',
        url: url,
        data: formData
      });
      this.fetchModulePromise.then((successData) => {
        const data = $(successData);
        const tables = $(data).find('table');
        const fetchModuleResult = [];
        for (let i = 0; i < tables.length; i += 2) {
          // parse mod name;
          const modInfo = new Module(this.parseModName($(tables[i])));
          modInfo.indexes = this.parseModIndexes($(tables[i + 1]));
          fetchModuleResult.push(modInfo);
        }
        this.fetchModuleResult = fetchModuleResult;
      });
      this.fetchModulePromise.catch(() => {});
      this.fetchModulePromise.always(() => {
        this.fetchModulePromise = null;
      });
    },
    txtModuleChange (newText) {
      this.txtModule = newText == null ? '' : newText;
      if (this.txtModule.length > 0) this.getModules();
      else this.fetchModuleResult = [];
    },
    onModuleAdd (module) {
      if (this.selectedModules[module.code] === undefined) {
        Vue.set(this.selectedModules, module.code, module);
        this.$emit('onAdd', module);
        this.$emit('input', this.selectedModules);
        this.$emit('change', this.selectedModules);
      }
    },
    onModuleDelete (moduleCode) {
      if (this.selectedModules[moduleCode] === undefined) return;
      Vue.delete(this.selectedModules, moduleCode);
      this.$emit('onDelete', this.selectedModules[moduleCode]);
      this.$emit('input', this.selectedModules);
      this.$emit('change', this.selectedModules);
    },
    onClearAllModule () {
      this.selectedModules = {};
      this.$emit('onClear');
      this.$emit('input', this.selectedModules);
      this.$emit('change', this.selectedModules);
    }
  },
  computed: {
    hasResult () {
      return this.fetchModuleResult.length > 0;
    },
    helperText () {
      if (this.txtModule.length === 0) {
        if (!this.hasNoModulesSelected) { return 'Enter course code to continue!'; }
        return 'Start by entering a course code!';
      }
      if (this.fetchModulePromise === null) { return 'No Modules found!'; }
      return 'Searching NTU database... Please wait';
    },
    hasNoModulesSelected () {
      return Object.keys(this.selectedModules).length === 0;
    },
    uid () {
      return this._uid;
    }
  }
};
</script>
<style scoped>
.max-w-100{
  max-width: 100%;
}
.max-h-100{
  max-height: 100%;
}
.max-h-32{
  max-height: 30vh;
}
.w-100{
  width: 100%;
}
</style>
