import { Flex } from "antd"
import ViewProfile from "../components/ViewProfile"
import AuthorizationForm from "../components/AuthorizationForm"

export default function ProfilePage() {
    return (
        <Flex justify="center">
            <ViewProfile />
            <AuthorizationForm />
        </Flex>
    )
}