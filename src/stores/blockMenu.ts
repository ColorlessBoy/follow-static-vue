import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export type BlockMenu = {
  id: number;
  parent: number;
  children: number[];
  name: string;
  isExpanded: boolean;
};

export const useBlockMenu = defineStore(
  "blockMenu",
  () => {
    const initBlock: BlockMenu = {
      id: 0,
      parent: -1,
      children: [],
      name: "",
      isExpanded: false,
    };
    const menuMap = reactive<Map<number, BlockMenu>>(new Map([[0, initBlock]]));
    const nextId = ref(1);

    const addMenu = (parent: number, name: string) => {
      const childBlock: BlockMenu = {
        id: nextId.value,
        parent: parent,
        children: [],
        name: name,
        isExpanded: false,
      };
      nextId.value += 1;
      const parentBlock = menuMap.get(parent);
      if (parentBlock) {
        parentBlock.children.push(childBlock.id);
      }
      menuMap.set(childBlock.id, childBlock);
      return childBlock;
    };

    const getById = (id: number) => {
      return menuMap.get(id);
    };

    const deleteById = (id: number) => {
      const block = menuMap.get(id);
      if (block) {
        if (block?.children) {
          block.children.forEach((id) => {
            deleteById(id);
          });
        }
        menuMap.delete(id);
      }
    };

    return { menuMap, addMenu, getById, deleteById };
  },
  { persist: true },
);
