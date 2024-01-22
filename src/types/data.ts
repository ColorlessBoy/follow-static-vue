export type FollowContent = {
  index: number;
  title: string;
  hasContent: boolean;
  children: FollowContent[];
  lastChild: number;
};

export type FollowFileBlock = {
  name: string;
  content: string;
  origin: string;
  pretty: string;
  parent: string[];
  children: string[];
};

export type FollowFile = {
  index: number;
  title: string;
  content: string;
  blocks: FollowFileBlock[];
};

export async function fetchJsonFile(index: string) {
  const baseURL = import.meta.env.BASE_URL;
  const data = await fetch(`${baseURL}/follow-setmm-json/files/${index}.json`);
  if (data) {
    return (await data.json()) as FollowFile;
  }
}

export type FollowStmtBlock = {
  origin: string;
  pretty: string;
};

export type FollowProofBlock = {
  stmt: FollowStmtBlock;
  body: FollowStmtBlock;
  cumulated: FollowStmtBlock;
};

export type FollowBlock = {
  bIdx: number;
  bType: string;
  type: string;
  name: string;
  params: string;
  body: string[];
  bodyPretty: string[];
  proof: FollowProofBlock[];
  comment: string;
  parent: string[];
  children: string[];
};

export async function fetchBlockFile(name: string) {
  const baseURL = import.meta.env.BASE_URL;
  const data = await fetch(`${baseURL}/follow-setmm-json/blocks/${name}.json`);
  if (data) {
    return (await data.json()) as FollowBlock;
  }
}

import fileIndex from "@/assets/follow-setmm-json/index.json";
import Fuse from "fuse.js";
export const setmmTitleList = fileIndex.titleList;
const setmmFuse = new Fuse(
  fileIndex.blockTitleIndex.map((value) => {
    return {
      name: value[0] as string,
      link: `/file/${value[1]}#${value[0]}` as string,
    };
  }),
  { keys: ["name"] },
);
export const setmmBlockMap = new Map(
  fileIndex.blockTitleIndex.map((value) => [
    value[0] as string,
    value[1] as number,
  ]),
);

export function searchBlock(query: string) {
  const result = setmmFuse.search(query, { limit: 10 });
  return result.map((value) => value.item);
}

export function getCodeOriginAndPretty(block: FollowBlock) {
  if (block.bType === "type") {
    return {
      origin: `type ${block.name}`,
      pretty: "",
    };
  } else if (block.bType === "const") {
    let code = `const ${block.type} ${block.name}`;
    if (block.body.length > 0) {
      code += ` { ${block.body[0]} }`;
    }
    return {
      origin: code,
      pretty: "",
    };
  } else if (block.bType === "prop") {
    let code = `prop ${block.type} ${block.name}(${block.params})`;
    if (block.body.length > 0) {
      code += ` { ${block.body[0]} }`;
    }
    return {
      origin: code,
      pretty: "",
    };
  } else if (block.bType === "absurd") {
    let code = `absurd ${block.name}(${block.params})`;
    let codePretty = `absurd ${block.name}(${block.params})`;
    if (block.body.length > 0) {
      code += ` { ${block.body[0]} }`;
      codePretty += ` { ${block.bodyPretty[0]}}`;
    }
    return {
      origin: code,
      pretty: codePretty,
    };
  } else if (block.bType === "axiom") {
    const code = [
      `axiom ${block.name}(${block.params}) {`,
      ...block.body.map((e) => `  ${e}`),
      "}",
    ].join("\n");
    const codePretty = [
      `axiom ${block.name}(${block.params}) {`,
      ...block.bodyPretty.map((e) => `  ${e}`),
      "}",
    ].join("\n");
    return {
      origin: code,
      pretty: codePretty,
    };
  } else if (block.bType === "thm") {
    const code = [
      `thm ${block.name}(${block.params}) {`,
      ...block.body.map((e) => `  ${e}`),
      "} = {",
      ...block.proof.map((e) => `  ${e.stmt.origin}`),
      "}",
    ].join("\n");
    const codePretty = [
      `thm ${block.name}(${block.params}) {`,
      ...block.bodyPretty.map((e) => `  ${e}`),
      "} = {",
      ...block.proof.map((e) => `  ${e.stmt.pretty}`),
      "}",
    ].join("\n");
    return {
      origin: code,
      pretty: codePretty,
    };
  }
}
