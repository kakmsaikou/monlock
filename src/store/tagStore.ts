import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagStore = {
  tagList: [] as Tag[],

  fetch() {
    return this.tagList = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
  },

  createTag(name: string) {
    const names = this.tagList.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      window.alert('标签名重复');
      return 'duplicated';
    }
    this.tagList.push({id: createId().toString(), name: name});
    this.saveTags();
    window.alert('添加成功');
    return 'success';
  },

  saveTags() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.tagList));
  },

  removeTag(id: string) {
    let index = -1;
    for (let i = 0; i < this.tagList.length; i++) {
      if (this.tagList[i].id === id) {
        index = i;
        break;
      }
    }
    this.tagList.splice(index, 1);
    this.saveTags();
    return true;
  },

  updateTag(id: string, name: string) {
    const tag = this.tagList.filter(item => item.id === id)[0];
    if (tag) {
      const names = this.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        tag.name = name;
        this.saveTags();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },

  findTag(id: string) {
    return this.tagList.filter(t => t.id === id)[0];
  },
};

tagStore.fetch();

export default tagStore;