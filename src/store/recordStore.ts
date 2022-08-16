import clone from '@/lib/clone';

const localStorageKeyName = 'recordList';

const recordStore =  {
  recordList: [] as RecordItem[],

  fetchRecords (){
    return this.recordList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },

  createRecord(record: RecordItem){
    const recordClone: RecordItem = clone(record);
    this.recordList && this.recordList.push(recordClone);
    recordStore.saveRecords();
  },

  saveRecords(): undefined {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.recordList));
    return;
  }
};

recordStore.fetchRecords()

export default recordStore
