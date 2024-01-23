import { reactive } from "vue";
import { defineStore } from "pinia";

export type BlockMenu = {
  id: number;
  parent: number;
  children: number[];
  name: string;
  isExpanded: boolean;
};

function stringifyWithMapReplacer(key: any, value: any) {
  if (value instanceof Map) {
    // Convert Map to array of key-value pairs
    return { __map__: true, data: Array.from(value) };
  }
  return value;
}

function parseWithMapReviver(key: any, value: any) {
  if (value && value.__map__) {
    // Convert array of key-value pairs back to Map
    return new Map(value.data);
  }
  return value;
}

function enhancedJSONStringify(obj: any) {
  const result = JSON.stringify(obj, stringifyWithMapReplacer);
  return result;
}

function enhancedJSONParse(str: any) {
  const result = JSON.parse(str, parseWithMapReviver);
  console.log(result);
  return result;
}

export type BlockMenuState = {
  data: Map<number, BlockMenu>;
  nextId: number;
};

export const useBlockMenu = defineStore(
  "blockMenuState",
  () => {
    const initState: BlockMenuState = {
      nextId: 1,
      data: new Map([
        [
          0,
          {
            id: 0,
            parent: -1,
            children: [],
            name: "",
            isExpanded: false,
          },
        ],
      ]),
    };
    const menuState = reactive<BlockMenuState>(initState);

    const addMenu = (parent: number, name: string) => {
      const childBlock: BlockMenu = {
        id: menuState.nextId,
        parent: parent,
        children: [],
        name: name,
        isExpanded: false,
      };
      menuState.nextId += 1;
      const parentBlock = menuState.data.get(parent);
      if (parentBlock) {
        parentBlock.children.push(childBlock.id);
      }
      menuState.data.set(childBlock.id, childBlock);
      return childBlock;
    };

    const getById = (id: number) => {
      return menuState.data.get(id);
    };

    const deleteById = (id: number) => {
      const block = menuState.data.get(id);
      if (block) {
        if (block?.children) {
          block.children.forEach((id) => {
            deleteById(id);
          });
        }
        const parent = menuState.data.get(block.parent);
        if (parent) {
          const idx = parent.children.findIndex((e) => e === id);
          parent.children.splice(idx, 1);
        }
        menuState.data.delete(id);
      }
    };

    return { menuState, addMenu, getById, deleteById };
  },
  {
    persist: {
      serializer: {
        deserialize: enhancedJSONParse,
        serialize: enhancedJSONStringify,
      },
    },
  },
);
