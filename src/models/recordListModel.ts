const localStorageKeyName = 'recordList';

const recordListModel = {
  clone(data: RecordItem): RecordItem {
    return JSON.parse(JSON.stringify(data));
  },

  fetch(): RecordItem[] {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },

  save(data: RecordItem[]): undefined {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
    return;
  },

};

export default recordListModel;