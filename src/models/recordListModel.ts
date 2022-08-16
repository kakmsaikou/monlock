import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordListModel = {
  data: [] as RecordItem[],

  created(record: RecordItem) {
    const recordClone : RecordItem = clone(record)
    this.data.push(recordClone)
    this.save()
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