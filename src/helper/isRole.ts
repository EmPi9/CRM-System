import { selectUserRole } from '../store/authSelectors';
import { useSelector } from "react-redux"

export function isRole(role: string) {
    const roles = useSelector(selectUserRole);
    
    return roles.includes(role);
}