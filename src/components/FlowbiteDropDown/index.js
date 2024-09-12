import { Dropdown } from "flowbite-react";

export function Component() {
  return (
    <Dropdown label="Dropdown button">
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Item>Settings</Dropdown.Item>
      <Dropdown.Item>Earnings</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Separated link</Dropdown.Item>
    </Dropdown>
  );
}