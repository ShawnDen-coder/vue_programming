import { ref } from "vue";
function useListData(data) {
  const dataRef = ref(data);
  function removeItem(id) {
    dataRef.value = dataRef.value.filter((msg) => msg.id !== id);
  }
  return { dataRef, removeItem };
}

export default useListData;
