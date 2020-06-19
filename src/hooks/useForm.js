import { useState } from "react";

const useForm = () => {
  const [form, setForm] = useState({});

  const onChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  return {
    form,
    setForm,
    onChange,
  };
};

export default useForm;
