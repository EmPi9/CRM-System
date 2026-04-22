import { Space } from "antd";
import RegistrationForm from "../components/RegistrationForm";

export default function RegistrationPage(){
    return ( <>
        <Space orientation="vertical" size="medium" className="registration_block">
            <RegistrationForm/>
        </Space>
    </>
    )
}