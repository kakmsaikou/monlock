const localStorageKeyName = 'recordList';

const recordListModel = {
  data: [] as RecordItem[],

  clone(data: RecordItem): RecordItem {
    return JSON.parse(JSON.stringify(data));
  },

  fetch(): RecordItem[] {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
    return this.data
  },

  save(): undefined {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
    return;
  },

};

export default recordListModel;