import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import ArrowIcon from "../assets/arrow.png";
import EditIcon from "../assets/edit.png";
import DeleteIcon from "../assets/delete.png";
import SaveIcon from "../assets/save.png";
import CancelIcon from "../assets/cancel.png";
import { AccordionProps } from "../interfaces/AccordionProps";
import { BOX_SHADOWS, DISPLAY_FLEX, GENDER_OPTIONS } from "../utils";
import { Button } from "antd";

export const Accordion = ({
  data,
  idx,
  toggle,
  collapsed,
  deleteUser,
}: AccordionProps) => {
  const { first, last, dob, gender, picture, country, description, id } = data;

  const [tempState, setTempState] = useState({
    name: "",
    age: 0,
    gender: "",
    country: "",
    description: "",
  });
  const [edit, setEdit] = useState(false);

  const getAge = useCallback(() => {
    let getYear = dob.split("-")[0];
    return new Date().getFullYear() - getYear;
  }, [dob]);

  const [details, setDetails] = useState({
    name: "",
    age: 0,
    gender: "",
    country: "",
    description: "",
  });

  // Edit Data
  const handleEdit = (
    e: React.MouseEvent<HTMLImageElement> | React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();
    if (details.age < 18)
      return alert("Age should be 18 and above to edit user details!");
    if (
      details.country === "" ||
      details.name === "" ||
      details.description === ""
    )
      return alert("Cannot be empty!");
    setTempState(details);
    setEdit(!edit);
  };

  // Handle input change
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDetails((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Stop propagation on click
  const handleInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  // Load data on component mount
  useEffect(() => {
    setDetails({
      name: first + " " + last,
      age: getAge(),
      gender: gender.charAt(0).toUpperCase() + gender.slice(1),
      country: country,
      description: description,
    });
  }, [country, description, first, gender, getAge, last]);

  const prevStateRef = useRef();

  // Check prev state data
  useEffect(() => {
    //@ts-ignore
    prevStateRef.current = details;
  }, [details]);

  // Edit functionality
  const renderEdit = () => {
    return (
      <StyledEditDelete>
        <span>
          <img
            src={DeleteIcon}
            alt="delete"
            onClick={(e) => {
              e.stopPropagation();
              deleteUser(id);
            }}
          />
        </span>
        <span>
          <img onClick={handleEdit} src={EditIcon} alt="edit" />
        </span>
      </StyledEditDelete>
    );
  };

  // Save/Delete Functionality
  const renderSaveAndDelete = () => {
    return (
      <StyledSaveAndCancel>
        <Button
          disabled={
            JSON.stringify(prevStateRef.current) === JSON.stringify(details)
          }
          onClick={
            JSON.stringify(prevStateRef.current) !== JSON.stringify(details)
              ? handleEdit
              : (e) => e.stopPropagation()
          }
        >
          <img src={SaveIcon} alt="save" />
        </Button>

        <Button
          onClick={(e) => {
            e.stopPropagation();
            setEdit(false);
            setDetails(tempState);
          }}
        >
          <img src={CancelIcon} alt="cancel" />
        </Button>
      </StyledSaveAndCancel>
    );
  };

  return (
    <StyledAccordion
      onClick={() => {
        return toggle(idx);
      }}
    >
      <StyledMain collapsed={collapsed === idx}>
        <div>
          <img src={picture} alt="logo" />
          {edit ? (
            <input
              type="text"
              value={details.name}
              onChange={handleChange}
              onClick={handleInputClick}
              name="name"
            />
          ) : (
            <p>{`${details.name}`}</p>
          )}
        </div>

        <div>
          <img src={ArrowIcon} alt="arrow" />
        </div>
      </StyledMain>

      {collapsed === idx && (
        <div>
          <StyledDetails>
            <div>
              <span>Age</span>
              <p>
                {edit ? (
                  <input
                    type="number"
                    value={details.age}
                    onChange={handleChange}
                    onClick={handleInputClick}
                    name="age"
                    onKeyPress={(event) => {
                      if (!/[0-9]/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                ) : (
                  details.age + " "
                )}
                Years
              </p>
            </div>

            <div>
              <span>Gender</span>
              <p>
                {edit ? (
                  <select
                    defaultValue={details.gender}
                    onClick={(e) => e.stopPropagation()}
                    name="gender"
                    onChange={handleChange}
                  >
                    {GENDER_OPTIONS.map((option) => (
                      <option value={option} selected>{option}</option>
                    ))}
                  </select>
                ) : (
                  details.gender
                )}
              </p>
            </div>

            <div>
              <span>Country</span>
              <p>
                {edit ? (
                  <input
                    type="text"
                    value={details.country}
                    onClick={handleInputClick}
                    onChange={handleChange}
                    name="country"
                    onKeyPress={(event) => {
                      if (!/^[a-zA-Z ]*$/.test(event.key)) {
                        event.preventDefault();
                      }
                    }}
                  />
                ) : (
                  details.country
                )}
              </p>
            </div>
          </StyledDetails>

          <StyledDescription>
            <span>Description</span>
            <p>
              {edit ? (
                <textarea
                  value={details.description}
                  onClick={(e) => e.stopPropagation()}
                  name="description"
                  onChange={handleChange}
                />
              ) : (
                details.description
              )}
            </p>
          </StyledDescription>

          {!edit && renderEdit()}

          {edit && renderSaveAndDelete()}
        </div>
      )}
    </StyledAccordion>
  );
};

const StyledAccordion = styled.div`
  box-shadow: ${BOX_SHADOWS[1]};
  padding: 20px;
  cursor: pointer;
  margin: 20px 0;
  border-radius: 10px;

  input {
    border-radius: 8px;
    height: fit-content;
    margin: auto 0;
    font-weight: 600;
  }
`;

const StyledMain = styled.div<{ collapsed: Boolean }>`
  ${DISPLAY_FLEX("space-between", "center")};

  & > div {
    &:first-child {
      ${DISPLAY_FLEX()};
      gap: 10px;

      img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }

      p {
        font-weight: 600;
        margin: auto 0;
        font-size: 18px;
      }
    }

    &:nth-child(2) {
      img {
        width: 20px;
        margin-right: 10px;
        margin-top: 3px;
        ${({ collapsed }) =>
          collapsed
            ? css`
                transform: rotate(180deg);
              `
            : css`
                transform: rotate(0deg);
              `}
      }
    }
  }
`;

const StyledDetails = styled.div`
  ${DISPLAY_FLEX("space-between")};
  margin: 10px 40px 10px 0;
  flex-wrap: wrap;
  padding: 10px;

  span {
    color: gray;
  }

  p {
    margin: 5px 0;
    font-weight: 600;
    text-transform: capitalize;
  }

  & > div {
    select {
      border-radius: 10px;
      height: 28px;
      font-weight: 600;
      border: 1.5px solid black;
    }
  }
`;

const StyledDescription = styled.div`
  span {
    color: gray;
  }

  p {
    margin: 5px 0;
    font-weight: 600;
  }

  textarea {
    width: 100%;
    height: 100px;
    border: 1.5px solid black;
    border-radius: 8px;
    font-weight: 600;
  }

  margin-bottom: 20px;
  padding: 10px;
`;

const StyledEditDelete = styled.div`
  ${DISPLAY_FLEX("flex-end", "center")};
  gap: 10px;
  margin-bottom: 10px;

  span {
    &:first-child {
      img {
        width: 40px;
      }
    }

    &:nth-child(2) {
      img {
        width: 30px;
      }
    }
  }
`;

const StyledSaveAndCancel = styled.div`
  ${DISPLAY_FLEX("flex-end")};
  gap: 12px;

  img {
    width: 30px;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
  }

  .ant-btn[disabled] {
    background: none;
  }
`;
