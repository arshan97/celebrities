import React, { useState } from "react";
import { Button, Input, Modal } from "antd";
import styled from "styled-components";
import celebrities from "../data/celebrities.json";
import { Accordion } from "./Accordion";
import { SearchOutlined } from "@ant-design/icons";

export const UserList = () => {
  const [collapsed, setCollapsed] = useState<number | null>();
  const [celebritiesData, setCelebritiesData] = useState(celebrities);
  const [deleteUserId, setDeleteUserId] = useState<number>();
  const [modalActive, setModalActive] = useState(false);

  // Toggle Accordion - Expand / Collapse
  const toggle = (idx: number) => {
    if (collapsed === idx) {
      return setCollapsed(null);
    }
    setCollapsed(idx);
  };

  //Delete User
  const deleteUser = (id: number) => {
    setModalActive(true);
    setDeleteUserId(id);
  };

  //Search user
  const handleSearchUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filteredData = celebrities.filter((item) => {
      return Object.values(item)
        .join("")
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
    });
    setCelebritiesData(filteredData);
  };

  return (
    <>
      <StyledSearch
        style={{ marginTop: "20px" }}
        placeholder="Search user"
        onChange={handleSearchUser}
        prefix={<SearchOutlined />}
      />

      {celebritiesData.map((item, idx) => (
        <Accordion
          key={idx}
          data={item}
          idx={idx}
          toggle={toggle}
          collapsed={collapsed}
          deleteUser={deleteUser}
        />
      ))}

      <StyledModal
        visible={modalActive}
        footer={null}
        onCancel={() => setModalActive(false)}
      >
        <p>Are you sure you want to delete?</p>

        <StyledButtons>
          <Button onClick={() => setModalActive(false)}>Cancel</Button>
          <Button
            type="primary"
            danger
            onClick={() => {
              setCelebritiesData((state) =>
                state.filter((x) => x.id !== deleteUserId)
              );
              setModalActive(false);
            }}
          >
            Delete
          </Button>
        </StyledButtons>
      </StyledModal>
    </>
  );
};

const StyledModal = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
  }

  .ant-modal-close-x {
    margin-top: 7px;
  }
`;

const StyledButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 30px;

  button {
    border-radius: 10px;
    outline: none;
  }
`;

const StyledSearch = styled(Input)`
  border-radius: 10px;
  border: 1px solid darkgray;
  height: 40px;
`;
