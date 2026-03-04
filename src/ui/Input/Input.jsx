export default function CheckBox({ onChange, value, placeholder  }) {

    return (
       <input type="text" onChange={onChange} value={value} placeholder={placeholder} />
    );
}