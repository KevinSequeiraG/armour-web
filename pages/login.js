import { UserContext } from '@/context/UserContext';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';

export default function Login() {
    const [rememberMeChecked, setRememberMeChecked] = useState(false);
    const { Login } = useContext(UserContext);
    const [loginFormValues, setLoginFormValues] = useState({
        email: '',
        password: '',
    });
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
                    if (error.message.includes('auth/user-not-found'))
                        toast.error("Usuario no encontrado. Por favor, confirma el correo o registra la cuenta.");
                    else if (error.message.includes('password'))
                        toast.error("Contraseña incorrecta. Por favor, inténtalo de nuevo.");
                    else
                        toast.error("An unknown error occurred.");

                    const errors = {};
                    errors.email = '*';
                    errors.password = '*';
                    setFormErrors(errors);
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

        if (!loginFormValues.email) {
            errors.email = 'Email es requerido *';
        } else if (!emailRegex.test(loginFormValues.email)) {
            errors.email = 'Email inválido';
        }

        if (!loginFormValues.password) {
            errors.password = 'La contraseña es requerida *';
        }
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div className='loginBody'>
            <div className="loginMain">
                <input className={`loginInput`} type="checkbox" id="chk" aria-hidden="true" />
                <div className="login relative">
                    <label className='loginLabel' for="chk" aria-hidden="true">Iniciar sesión</label>
                    <div className='relative'>
                        <input className={`loginInput ${formErrors.email && '!border-red-600'}`} type="email" name="email" id="email" placeholder="Correo electrónico" value={loginFormValues.email} onChange={handleInputChange} />
                        {formErrors.email && <p className="absolute text-red-200 right-20 md:right-28 text-sm top-2">{formErrors.email}</p>}
                    </div>
                    <div className='relative'>
                        <input className={`loginInput ${formErrors.password && '!border-red-600'}`} type={isPasswordVisible ? "text" : "password"} name="password" id="password" placeholder="Contraseña" value={loginFormValues.password} onChange={handleInputChange} />
                        {formErrors.password && <p className="absolute text-red-200 right-20 md:right-28 text-sm top-2">{formErrors.password}</p>}
                    </div>
                    <div className="flex items-center justify-center -my-1.5">
                        <input
                            className="form-check-input appearance-none h-4 w-4 border border-[#AAB4C1] rounded-[5px] checked:bg-[#a39869] checked:border-[#c9c6ba] mr-1.5 cursor-pointer"
                            type="checkbox"
                            id="flexCheckDefault"
                            checked={rememberMeChecked}
                            onChange={() => setRememberMeChecked(!rememberMeChecked)}
                        />
                        <p
                            className="hover:cursor-pointer text-white font-semibold text-[12px]"
                            htmlFor="flexCheckDefault"
                        >
                            Recuérdame
                        </p>
                    </div>
                    <button className='loginButton' onClick={(e) => handleLogin(e)}>Iniciar sesión</button>
                </div>
                <div className="signup">
                    <label className='loginLabelRegister' for="chk" aria-hidden="true">Registrarme</label>
                    <div className='max-h-[21rem] overflow-y-auto scrollbarDesign'>

                        <p className='text-[#11131C] font-semibold w-[60%] mx-auto text-sm'>Nombre</p>
                        <input className={`loginInput`} type="text" name="txt" placeholder="Nombre" required="" />
                        <p className='text-[#11131C] font-semibold w-[60%] mx-auto text-sm -mt-1.5'>Apellidos</p>
                        <input className={`loginInput`} type="text" name="txt2" placeholder="Apellidos" required="" />
                        <p className='text-[#11131C] font-semibold w-[60%] mx-auto text-sm -mt-1.5'>Correo electrónico</p>
                        <input className={`loginInput`} type="email" name="email" placeholder="Correo electrónico" required="" />

                        <p className='text-[#11131C] font-semibold w-[60%] mx-auto text-sm -mt-1.5'>Contraseña</p>
                        <input className={`loginInput`} type="Password" name="pswd2" placeholder="Contraseña" required="" />
                        <p className='text-[#11131C] font-semibold w-[60%] mx-auto text-sm -mt-1.5'>Confirmar contraseña</p>
                        <input className={`loginInput`} type="Password" name="pswd3" placeholder="Confirmar contraseña" required="" />
                        <button className='loginButton'>Registrarme</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
