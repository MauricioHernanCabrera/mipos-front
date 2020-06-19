import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";
import { Input, Button, Row, Col, InputNumber, Form, Alert } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { CloseContainer, CloseHeader, CloseBody } from "./styles";
import { Context } from "./../../Context";
import { COLOR_GREY2 } from "./../../styles/variables";
import FormItem from "./../../components/FormItem";
import {
  pesosToCentavos,
  centavosToPesos,
  formatDate,
  formatHour,
} from "./../../utils";

const Close = () => {
  const { status, setStatus } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    type: "info",
    message: "No existe información para mostrar",
  });
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resOpen = await axios.get(
          `${process.env.REACT_APP_API_URL}/has/open/cashier/balance`
        );

        const newDate = new Date().toJSON();

        const value_card = centavosToPesos(Number(resOpen.data.card));
        const date_close = formatDate(newDate);
        const hour_close = formatHour(newDate);
        const value_cash = 0;
        const value_open = centavosToPesos(Number(resOpen.data.value));
        const value_sales = value_card + value_cash;
        const value_in_box =
          centavosToPesos(Number(resOpen.data.close)) +
          value_open +
          value_sales;

        form.setFieldsValue({
          date_close,
          hour_close,
          value_card,
          value_cash,
          value_in_box,
          value_open,
          value_sales,
          expenses: [],
        });
        setStatus("open");
        setAlert({
          type: "info",
          message: "No existe información para mostrar",
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "open") {
      fetchData();
    }
  }, [status]);

  const onFinish = async (values) => {
    try {
      const value_close = pesosToCentavos(calculateValueClose(values));
      const value_card = pesosToCentavos(values.value_card);
      const value_cash = pesosToCentavos(values.value_cash);
      const value_open = pesosToCentavos(values.value_open);
      const value_sales = pesosToCentavos(values.value_sales);
      const expenses = values.expenses //
        .filter(filterExpenses)
        .map((expenseItem) => ({
          ...expenseItem,
          value: pesosToCentavos(expenseItem.value),
        }));

      const body = {
        date_close: values.date_close,
        hour_close: values.hour_close,
        value_card,
        value_cash,
        value_close,
        value_open,
        value_sales,
        expenses,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/cashier/balance/close/day`,
        body
      );
      setStatus("close");
      setAlert({
        type: "success",
        message: res.data.msg,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const filterExpenses = (expenseItem) =>
    expenseItem &&
    expenseItem.value &&
    typeof expenseItem.value === "number" &&
    expenseItem.value >= 0.1;

  const calculateValueExpenses = (expenses) => {
    const reduceValueExpenses = (ant, { value }) => ant + value;

    return expenses //
      .filter(filterExpenses) //
      .reduce(reduceValueExpenses, 0);
  };

  const calculateValueClose = (fields) => {
    const { value_in_box, expenses = [] } = fields;
    const value_expenses = calculateValueExpenses(expenses);

    return value_in_box - value_expenses;
  };

  return (
    <CloseContainer>
      <CloseHeader>Cierre de caja</CloseHeader>

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
        <CloseBody
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          name="control-hooks"
          form={form}
          size="large"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {status === "open" ? (
            <Fragment>
              <Row gutter={24}>
                <Col span={12}>
                  <FormItem label="Fecha (yyyy/mm/dd)" name="date_close">
                    <Input disabled={true} />
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Hora (hh:mm)" name="hour_close">
                    <Input disabled={true} />
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Ventas en efectivo" name="value_cash">
                    <InputNumber
                      disabled={true}
                      formatter={(value) => `$ ${value}`}
                      min={0}
                      step={0.1}
                    />
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Ventas por tarjeta" name="value_card">
                    <InputNumber
                      disabled={true}
                      formatter={(value) => `$ ${value}`}
                      min={0}
                      step={0.1}
                    />
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Total en ventas" name="value_sales">
                    <InputNumber
                      disabled={true}
                      formatter={(value) => `$ ${value}`}
                      min={0}
                      step={0.1}
                    />
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Total apertura" name="value_open">
                    <InputNumber
                      disabled={true}
                      formatter={(value) => `$ ${value}`}
                      min={0}
                      step={0.1}
                    />
                  </FormItem>
                </Col>

                <Col span={12}>
                  <FormItem label="Total de caja" name="value_in_box">
                    <InputNumber
                      disabled={true}
                      formatter={(value) => `$ ${value}`}
                      min={0}
                      step={0.1}
                    />
                  </FormItem>
                </Col>

                <Col span={24}>
                  <Form.List name="expenses">
                    {(fields, { add, remove }) => {
                      return (
                        <div>
                          <Row align="middle" justify="center">
                            <Col>
                              <FormItem>
                                <Button
                                  type="secondary"
                                  htmlType="button"
                                  onClick={() => {
                                    add();
                                  }}
                                >
                                  Agregar gasto
                                </Button>
                              </FormItem>
                            </Col>
                          </Row>

                          {fields.map((field, index) => (
                            <FormItem required={true} key={field.key}>
                              <Row>
                                <Col
                                  span={11}
                                  style={{
                                    paddingLeft: "12px",
                                    paddingRight: "12px",
                                  }}
                                >
                                  <FormItem
                                    {...field}
                                    fieldKey={[field.fieldKey, "motivo"]}
                                    validateTrigger={["onChange", "onBlur"]}
                                    name={[field.name, "motivo"]}
                                    rules={[]}
                                    noStyle
                                  >
                                    <Input placeholder="Motivo" />
                                  </FormItem>
                                </Col>

                                <Col
                                  span={11}
                                  style={{
                                    paddingLeft: "12px",
                                    paddingRight: "12px",
                                  }}
                                >
                                  <FormItem
                                    {...field}
                                    validateTrigger={["onChange", "onBlur"]}
                                    fieldKey={[field.fieldKey, "value"]}
                                    name={[field.name, "value"]}
                                    rules={[]}
                                    noStyle
                                  >
                                    <InputNumber
                                      min={1.0}
                                      step={0.1}
                                      placeholder="Valor"
                                    />
                                  </FormItem>
                                </Col>

                                <Col span={2} style={{ alignSelf: "center" }}>
                                  <MinusCircleOutlined
                                    className="dynamic-delete-button"
                                    style={{ margin: "0 8px" }}
                                    onClick={() => {
                                      remove(field.name);
                                    }}
                                  />
                                </Col>
                              </Row>
                            </FormItem>
                          ))}
                        </div>
                      );
                    }}
                  </Form.List>
                </Col>
              </Row>

              <Row justify="center">
                <FormItem></FormItem>

                <FormItem shouldUpdate>
                  {() => (
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={
                        calculateValueClose(
                          JSON.parse(
                            JSON.stringify(form.getFieldsValue(), null, 2)
                          )
                        ) < 0
                      }
                    >
                      Cerrar caja con $
                      {calculateValueClose(
                        JSON.parse(
                          JSON.stringify(form.getFieldsValue(), null, 2)
                        )
                      )}
                    </Button>
                  )}
                </FormItem>
              </Row>
            </Fragment>
          ) : (
            <Row align="middle" justify="center">
              <Col>
                {alert.message && alert.message.length > 0 && (
                  <Alert
                    description={alert.message}
                    type={alert.type}
                    showIcon
                  />
                )}
              </Col>
            </Row>
          )}
        </CloseBody>
      )}
    </CloseContainer>
  );
};

export default Close;
