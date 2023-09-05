import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import 'animate.css';
import RegisterForm from '@/components/Login/RegisterForm';

export default function Login() {
    const [rememberMeChecked, setRememberMeChecked] = useState(false);
    const { Login } = useContext(UserContext);
    const [loginFormValues, setLoginFormValues] = useState({ email: '', password: '' });
    const router = useRouter();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormErrors((prevErrors) => ({ ...prevErrors, [name]: '' }));
        setLoginFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    useEffect(() => {
        setRememberMeChecked(JSON.parse(localStorage.getItem("rememberMe")));
        setLoginFormValues({ ...loginFormValues, email: JSON.parse(localStorage.getItem("rememberMeEmail")) });
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await Login(loginFormValues.email, loginFormValues.password).then((user) => {
                    if (rememberMeChecked) {
                        localStorage.setItem("rememberMe", JSON.stringify(rememberMeChecked));
                        localStorage.setItem("rememberMeEmail", JSON.stringify(loginFormValues.email));
                    } else {
                        localStorage.removeItem("rememberMe");
                        localStorage.removeItem("rememberMeEmail");
                    }
                    router.push('/home');
                }).catch((error) => {
                    if (error.message.includes('auth/user-not-found')) toast.error("Usuario no encontrado. Por favor, confirma las credenciales o registra la cuenta.");
                    else if (error.message.includes('password')) toast.error("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
                    else toast.error("An unknown error occurred.");

                    setFormErrors({ email: '*', password: '*' });
                    console.error('Error fetching user data:', error);
                });
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!loginFormValues.email) errors.email = 'El correo es requerido';
        else if (!emailRegex.test(loginFormValues.email)) errors.email = 'Correo no válido';
        if (!loginFormValues.password) errors.password = 'La contraseña es requerida';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div className='loginBody'>
            <div className="loginMain">
                <input className={`loginInput`} type="checkbox" id="chk" aria-hidden="true" />

                <div className="login relative">
                    <label className='loginLabel' htmlFor="chk" aria-hidden="true">Iniciar sesión</label>
                    <div className='relative w-[60%] mx-auto'>
                        <input className={`loginInput ${formErrors.email && '!border-red-600'}`}
                            type="email" name="email" placeholder="Correo electrónico"
                            value={loginFormValues.email} onChange={handleInputChange} />
                        {formErrors.email && <p className="absolute text-red-200 right-2 text-sm top-0.5">*</p>}
                        {formErrors.email && formErrors.email != "*" && <p className="animate__animated animate__flipInX absolute text-red-950 right-1 text-xs -bottom-5 font-medium shadow-2xl bg-white rounded-es-[10px] px-2 py-0.5">{formErrors.email}</p>}
                    </div>

                    <div className='relative w-[60%] mx-auto'>
                        <input className={`loginInput ${formErrors.password && '!border-red-600'}`}
                            type={isPasswordVisible ? "text" : "password"} name="password" placeholder="Contraseña"
                            value={loginFormValues.password} onChange={handleInputChange} />
                        {formErrors.password && <p className="absolute text-red-200 right-2 text-sm top-0.5">*</p>}
                        {formErrors.password && formErrors.password != "*" && <p className="animate__animated animate__flipInX absolute text-red-950 right-1 text-xs -bottom-5 font-medium shadow-2xl bg-white rounded-es-[10px] px-2 py-0.5">{formErrors.password}</p>}
                        {isPasswordVisible ? <img src="/svgs/pwdEyeOpen.svg" className="right-3.5 top-2 h-5 w-4 absolute" onClick={() => setIsPasswordVisible(!isPasswordVisible)} /> : <img src="/svgs/pwdEyeClose.svg" className="right-3.5 top-2 h-5 w-4 absolute" onClick={() => setIsPasswordVisible(!isPasswordVisible)} />}
                    </div>

                    <div className="flex items-center justify-center -mb-4">
                        <input
                            className="form-check-input appearance-none h-4 w-4 border border-[#AAB4C1] rounded-[5px] checked:bg-[#a39869] checked:border-[#c9c6ba] mr-1.5 cursor-pointer"
                            type="checkbox" id="flexCheckDefault" checked={rememberMeChecked}
                            onChange={() => setRememberMeChecked(!rememberMeChecked)}
                        />
                        <p className="hover:cursor-pointer text-white font-semibold text-[12px]" htmlFor="flexCheckDefault">Recuérdame</p>
                    </div>

                    <button className='loginButton' onClick={(e) => handleLogin(e)}>Iniciar sesión</button>
                <p className='text-white font-medium text-xs pt-14 text-center cursor-pointer'>Olvidé mi contraseña</p>
                </div>
                <div className="signup">
                    <RegisterForm />
                </div>

            </div>
        </div>
    )
}
