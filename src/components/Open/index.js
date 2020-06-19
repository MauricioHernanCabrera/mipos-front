import React, { useEffect, useState, useContext } from "react";
import { Input, Button, Row, Col, InputNumber } from "antd";
import axios from "axios";
import ReactLoading from "react-loading";

import { OpenContainer, OpenHeader, OpenBody } from "./styles";
import { COLOR_GREY2 } from "./../../styles/variables";
import { Context } from "./../../Context";
import { pesosToCentavos, centavosToPesos } from "./../../utils";

import FormItem from "./../../components/FormItem";

const Open = () => {
  const { status, setStatus } = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [initialValues, setInitialValues] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resBalance = await axios.get(
          `${process.env.REACT_APP_API_URL}/balance`
        );
        const data = resBalance.data.results;

        console.log("______data", data);

        if (typeof data.value_open == "number") {
          setInitialValues({
            ...data,
            value_open: centavosToPesos(data.value_open),
            value_previous_close: centavosToPesos(data.value_previous_close),
          });
          setStatus("open");
        } else {
          setInitialValues({
            ...data,
            value_open: 0,
            value_previous_close: centavosToPesos(data.value_previous_close),
          });
          setStatus("no-interaction");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    switch (status) {
      case "no-interaction": {
        fetchData();
        break;
      }

      case "close": {
        fetchData();
        break;
      }
    }
  }, [status]);

  const onFinish = async ({
    date_open,
    hour_open,
    value_open,
    value_previous_close,
    observation,
  }) => {
    try {
      const body = {
        date_open,
        hour_open,
        value_open: pesosToCentavos(value_open),
        value_previous_close: pesosToCentavos(value_previous_close),
        observation,
      };

      await axios.post(
        `${process.env.REACT_APP_API_URL}/balance/open/day`,
        body
      );

      setStatus("open");

      // const data = resBalanceOpenDay.data.results
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <OpenContainer>
      <OpenHeader>Apertura de caja</OpenHeader>

      {loading && (
        <Row align="middle" justify="center" style={{ marginTop: "32px" }}>
          <ReactLoading
            type="bars"
            color={COLOR_GREY2}
            height={100}
            width={100}
          />
        </Row>
      )}

      {!loading && (
        <OpenBody
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="basic"
          size="large"
          initialValues={initialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Row gutter={24}>
            <Col span={12}>
              <FormItem label="Fecha (yyyy/mm/dd)" name="date_open">
                <Input disabled={true} />
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label="Hora (hh:mm)" name="hour_open">
                <Input disabled={true} />
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem label="Total anterior" name="value_previous_close">
                <InputNumber
                  disabled={true}
                  formatter={(value) => `$ ${value}`}
                  min={0}
                  step={0.1}
                />
              </FormItem>
            </Col>

            <Col span={12}>
              <FormItem
                label="Total inicial"
                name="value_open"
                rules={[
                  {
                    required: true,
                    message: "¡El total inicial es requerido!",
                  },
                ]}
              >
                <InputNumber
                  disabled={status === "open"}
                  formatter={(value) => `$ ${value}`}
                  min={0}
                  step={0.1}
                />
              </FormItem>
            </Col>

            <Col span={24}>
              <FormItem label="Obsersaciones" name="observation">
                <Input.TextArea
                  autoSize={{ minRows: 5, maxRows: 7 }}
                  disabled={status === "open"}
                />
              </FormItem>
            </Col>
          </Row>

          {status === "no-interaction" && (
            <Row justify="center" style={{ marginTop: "16px" }}>
              <FormItem>
                <Button type="primary" htmlType="submit" disabled={loading}>
                  Enviar
                </Button>
              </FormItem>
            </Row>
          )}
        </OpenBody>
      )}
    </OpenContainer>
  );
};

export default Open;
