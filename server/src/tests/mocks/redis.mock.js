const store = new Map();

export default {
  get: jest.fn(
    key => store.get(key)
  ),

  set: jest.fn(
    (key, value) =>
      store.set(
        key,
        value
      )
  ),

  del: jest.fn(
    key =>
      store.delete(
        key
      )
  ),

  exists: jest.fn(
    key =>
      store.has(
        key
      )
  ),

  incr: jest.fn(
    key => {
      const value =
        Number(
          store.get(key)
        ) || 0;

      store.set(
        key,
        value + 1
      );

      return value + 1;
    }
  )
};