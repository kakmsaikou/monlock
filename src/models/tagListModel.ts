import createId from '@/lib/createId';

const localStorageKeyName = 'tagList';

const tagListModel: TagListModel = {
  data: [],

  fetch() {
    this.data = JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]');
    return this.data;
  },

  create(name) {
    const names = this.data.map(item => item.name);
    if (names.indexOf(name) >= 0) {
      return 'duplicated';
    }
    this.data.push({id: createId().toString(), name: name});
    this.save();
    return 'success';
  },

  update(id, name) {
    const tag = this.data.filter(item => item.id === id)[0];
    if (tag) {
      const names = this.data.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        return 'duplicated';
      } else {
        tag.name = name;
        this.save();
        return 'success';
      }
    } else {
      return 'not found';
    }
  },
  remove(id) {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }
    console.log(index)
    this.data.splice(index, 1);
    this.save()
    return true
  },

  save() {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(this.data));
  }

};

export default tagListModel;