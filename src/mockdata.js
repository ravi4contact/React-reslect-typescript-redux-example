import uuid from "uuid/v4";

let inventoryData = [
  {
    label: "Mobile",
    value: "1000",
    isKey:true,
    mandatory:true,
    recommended: false,
    id: "fb94f208-6d34-425f-a3f8-e5b87794aef1"
  },
  {
    label: "Table",
    value: "1000",
    isKey:true,
    mandatory:true,
    recommended: false,
    id: "4c95788a-1fa2-4f5c-ab97-7a98c1862584"
  },
  {
    label: "Leather",
    value: "1000",
    isKey:true,
    mandatory:true,
    recommended: false,
    id: "8338db8c-91c5-4341-81e1-fa350c6baa70"
  },
  {
    label: "Sofa",
    value: "1000",
    isKey:true,
    mandatory:true,
    recommended: false,
    id: "d414f81e-0f34-49ca-8fb6-a4b47f622eb9"
  }
];

 let inventory =inventoryData.filter((inventory, index) => {
  const _inventory = JSON.stringify(inventoryData[index]);
  return index === inventoryData.findIndex(obj => {
    return JSON.stringify(obj) === _inventory;
  });
});

export default inventory;
