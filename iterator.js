// Works like a dictionary/hashtable, but each key there can be associated 
// with multiple, but unique (per key) values. Keys in the dictionary
// should only be valid if they have at least 1 associated value.
// MultiValueDictionary should be compatible with for ... of loop to iterate
// through all (key, value) pairs.
class MultiValueDictionary {
    constructor() {
        this.dictionaryMap = new Map();
        this.index = 0;
    }
    
    // Returns true if the collection is modified; false otherwise.
    // Must return false if (key, value) pair already exists in the dictionary.
    add(key, value) {
        if (this.dictionaryMap.has(key)) {
            const currentKeyValueSet = this.dictionaryMap.get(key) || new Set();
            
            if (currentKeyValueSet.has(value)) {
                return false;
            }
            currentKeyValueSet.add(value);
            this.dictionaryMap.set(key, currentKeyValueSet);
            return true;
        }
        this.dictionaryMap.set(key, new Set([value]));
        return true;
    }
    // Returns a copy of all the values for the specified key.
    // Returns null if key doesn't exists.
    get(key) {
        if (this.dictionaryMap.has(key)) {
            return this.dictionaryMap.get(key);
        }
        return null;
    }
    // Removes (key, value) pair. If not found null
    removeValue(key, value) {
        if (this.dictionaryMap.has(key)) {
            const currentKeyValue = this.dictionaryMap.get(key);
            if (currentKeyValue && currentKeyValue.has(value)) {
                this.dictionaryMap.set(key, currentKeyValue.remove(value));
                return this.dictionaryMap;
            }
            console.info("The key existed but value not found in the dictionary");
            return null;
        }
        console.info("Key not found in the dictionary");
        return null;
    }
    // Removes all (key, value) pairs with the matching key
    remove(key) {
        if (this.dictionaryMap.has(key)) {
            this.dictionaryMap.remove(key);
            
            return this.dictionaryMap;
        }
        console.info("Key not found in the dictionary");
        return null;
    }
    *[Symbol.iterator]() {
        for (let key of this.dictionaryMap.keys()) {
            for (let val of this.dictionaryMap.get(key)) {
                yield {key, value: val};
            }
        }
        // yield { key: 5, value: 10 };
    }
    /*
    [Symbol.iterator]() {
        return {
            next: () => {
                const keys = [...this.dictionaryMap.keys()];
                if (this.index < this.dictionaryMap.size) {
                    const returnValue = {value: {key: keys[this.index], value: [...this.dictionaryMap.get(keys[this.index])]}, done: false};
                    this.index++;
                    
                    return returnValue;
                }
                else {
                    const returnValue = {value: null, done: true};
                    this.index = 0;
                    
                    return returnValue;
                }
            }
        }
    }
    */
}
const dict = new MultiValueDictionary();
dict.add('a', 1);
dict.add('a', 1);
dict.add('a', 2);
dict.add('b', 6);
dict.add('b', 7);
console.log(dict.get('a'));
console.log(dict.get('b'));
console.log(dict.get('c'));
// Should output:
// a 1
// a 2
// b 6
// b 7
// a 1,2
// b 6,7
for(let kv of dict) {
    console.log(kv.key + ' ' + kv.value);
}
