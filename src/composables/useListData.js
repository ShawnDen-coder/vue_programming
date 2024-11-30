import { ref } from "vue";

function useListData(data) {
  const dataRef = ref(data);

  function removeItem(id) {
    dataRef.value = dataRef.value.filter((msg) => msg.id !== id);
  }

  function sortByKey(key, direction = "asc") {
    dataRef.value = dataRef.value.sort((a, b) => {
      if (direction === "asc") {
        return a[key].localeCompare(b[key]);
      } else {
        return -a[key].localeCompare(b[key]);
      }
    });
  }

  return { dataRef, removeItem, sortByKey };
}

export default useListData;
