function getKeyByValue<V>(object: Record<string, V>, value: V) {
  return Object.keys(object).find((key) => object[key] === value);
}

export default getKeyByValue;
