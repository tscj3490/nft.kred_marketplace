import { useDispatch, useSelector } from 'react-redux';
import { login, logout, venlyConnect, _auth } from '../store/auth';


export function useVenlyConnect() {
    const dispatch = useDispatch();
    const auth = useSelector(_auth);
    const isLogined = !!auth.token;
    const profile = auth.profile;
    const wallets = auth.wallets;
    
    return {
        login: (redirectUri) => dispatch(login(redirectUri)),
        logout: () => dispatch(logout()),
        isLogined,
        profile,
        wallets,
        venlyConnect,
    };
}

