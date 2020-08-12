class ModuleIndexLesson {
  constructor (config = {}) {
    this.type = '';
    this.group = '';
    this.day = '';
    this.time = '';
    this.venue = '';
    this.remarks = '';
    this.remarkType = -1;
    Object.assign(this, config);
  }

  static parseRemarks (remark) {
    if (remark.indexOf('Teaching Wk1,3') !== -1) return 1;
    if (remark.indexOf('Teaching Wk2,4') !== -1) return 2;
    return 0;
  }

  static parseLessonTime (time) {
    const times = time.split('-');
    if (times.length !== 2) return;
    return {
      start: parseInt(times[0]),
      end: parseInt(times[1])
    };
  }
}
export default ModuleIndexLesson;
