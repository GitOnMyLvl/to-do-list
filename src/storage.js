class Storage {
  constructor(storageKey) {
    this.storageKey = storageKey;
  }

  saveToStorage(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  loadFromStorage() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  clearStorage() {
    localStorage.removeItem(this.storageKey);
  }
}

export default Storage;
