import { Card, Flex } from "antd"
import { EditUserForm } from "../components/EditUserForm"

export function ProfileUserPage() {
    return(
        <Flex justify="center">
            <Card>
                <EditUserForm />
            </Card>
        </Flex>
    )
}