import React from "react";
import { Button, Image } from "./styles";
import { Tooltip } from "antd";
import axios from "axios";
import panicButton from "./../../assets/images/panic-button.png";

const Component = () => {
  const handleOnClick = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/context/clean`
      );
      console.log(res);
      window.location.reload();
    } catch (error) {}
  };

  return (
    <Tooltip
      placement="topLeft"
      title="Reiniciar balance (solo usarlo en casos de emergencia)"
    >
      <Button onClick={handleOnClick}>
        <Image src={panicButton} alt="" />
      </Button>
    </Tooltip>
  );
};

export default Component;
