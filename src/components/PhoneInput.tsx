import { useState } from 'react'
import { Space, Select, Input } from 'antd'

interface PhoneValue {
  prefix?: string;
  phone?: string;
}

interface PhoneInputProps {
  id?: string;
  value?: PhoneValue;
  onChange?: (value: PhoneValue) => void;
}

export const PhoneInput: React.FC<PhoneInputProps> = ({ id, value = {}, onChange }) => {
  const [prefix, setPrefix] = useState('7');
  const [phone, setPhone] = useState('');   

  const triggerChange = (changedValue: PhoneValue) => {
    onChange?.({ ...value, ...changedValue });
  };    

  const onPrefixChange = (newPrefix: string) => {
    if (!('prefix' in value)) {
      setPrefix(newPrefix);
    }
    triggerChange({ prefix: newPrefix });
  };    

  const onPhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    if (!('phone' in value)) {
      setPhone(newPhone);
    }
    triggerChange({ phone: newPhone });
  };

  return (
    <span id={id}>
      <Space.Compact block>
        <Select
          value={value.prefix || prefix}
          onChange={onPrefixChange}
          style={{ width: 70 }}
          options={[
            { label: '+7', value: '7' },
          ]}
        />
        <Input value={value.phone || phone} onChange={onPhoneChange} style={{ width: '100%' }} />
      </Space.Compact>
    </span>
  );
};