import React from "react";

const TableData = ({ item }) => {
  console.log(item);
  return (
    <tr>
      <td>{item.title}</td>
      <td>Rental Length (days)</td>
      <td>Total Price (${item.price}/day)</td>
      <td>Rental Ends</td>
    </tr>
  );
};

export default TableData;
