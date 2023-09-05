import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'animate.css';
import { createUserFromLogin, userAlreadyExists } from '@/helpers/users';

export default function RegisterForm() {

    const [registerFormValues, setRegisterFormValues] = useState({ name: '', lastName: '', email: '', password: '', confirmPassword: '' });
    const [registrationError, setRegistrationError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const validateForm = async () => {
        const errors = {};
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!registerFormValues.name) errors.name = 'El nombre es requerido';
        if (!registerFormValues.lastName) errors.lastName = 'Los apellidos son requeridos';
        if (!registerFormValues.email) errors.email = 'El correo es requerido';
        else if (!emailRegex.test(registerFormValues.email)) errors.email = 'Correo no válido';
        else {
            const userExistResult = await userAlreadyExists(registerFormValues.email);
            if (userExistResult.userExist) {
                toast.warning("El correo ingresado ya está asociado a otra cuenta.");
                errors.email = 'El correo ya está en uso';
            }
        }

        if (!registerFormValues.password) errors.password = 'La contraseña es requerida';
        if (!registerFormValues.confirmPassword) errors.confirmPassword = 'La contraseña es requerida';
        else if (registerFormValues.password !== registerFormValues.confirmPassword) { errors.confirmPassword = 'Las contraseñas no coinciden'; errors.password = 'Las contraseñas no coinciden'; }

        setRegistrationError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRegister = async () => {
        const validationsResult = await validateForm();
        if (validationsResult) {
            setIsLoading(true);
            try {
                await createUserFromLogin(registerFormValues).then(() => {
                    toast.success("Usuario registrado con éxito. Puede iniciar sesión.");
                    setIsLoading(false);
                    const registerLabel = document.getElementById('registerLabel');
                    registerLabel.click();
                    setRegisterFormValues({ name: '', lastName: '', email: '', password: '', confirmPassword: '' });
                });
            } catch (error) {
                console.error('Error al registrar al usuario:', error);
            }
        }
    };
    return (
        <>
            <label className='loginLabelRegister' htmlFor="chk" aria-hidden="true" id="registerLabel">Registrarme</label>
            <div className='max-h-[21rem] overflow-y-auto scrollbarDesign'>
                <div className='relative w-[60%] mx-auto'>
                    <p className='text-[#11131C] font-semibold text-sm'>Nombre</p>
                    <input className={`loginInput ${registrationError.name && '!border-red-400'}`} type="text" name="name" placeholder="Nombre" value={registerFormValues.name} onChange={handleInputChange} />
                    {registrationError.name && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-600">{registrationError.name}</p>}
                </div>
                <div className='relative w-[60%] mx-auto'>
                    <p className='text-[#11131C] font-semibold text-sm -mt-1.5'>Apellidos</p>
                    <input className={`loginInput ${registrationError.lastName && '!border-red-400'}`} type="text" name="lastName" placeholder="Apellidos" value={registerFormValues.lastName} onChange={handleInputChange} />
                    {registrationError.lastName && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-600">{registrationError.lastName}</p>}
                </div>
                <div className='relative w-[60%] mx-auto'>
                    <p className='text-[#11131C] font-semibold text-sm -mt-1.5'>Correo electrónico</p>
                    <input className={`loginInput ${registrationError.email && '!border-red-400'}`} type="email" name="email" placeholder="Correo electrónico" value={registerFormValues.email} onChange={handleInputChange} />
                    {registrationError.email && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-600">{registrationError.email}</p>}
                </div>
                <div className='relative w-[60%] mx-auto'>
                    <p className='text-[#11131C] font-semibold text-sm -mt-1.5'>Contraseña</p>
                    <input className={`loginInput ${registrationError.password && '!border-red-400'}`} type="Password" name="password" placeholder="Contraseña" value={registerFormValues.password} onChange={handleInputChange} />
                    {registrationError.password && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-600">{registrationError.password}</p>}
                </div>
                <div className='relative w-[60%] mx-auto'>
                    <p className='text-[#11131C] font-semibold text-sm -mt-1.5'>Confirmar contraseña</p>
                    <input className={`loginInput ${registrationError.confirmPassword && '!border-red-400'}`} type="Password" name="confirmPassword" placeholder="Confirmar contraseña" value={registerFormValues.confirmPassword} onChange={handleInputChange} />
                    {registrationError.confirmPassword && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-600">{registrationError.confirmPassword}</p>}
                </div>
                <button className='loginButton' onClick={!isLoading && handleRegister}>{isLoading ? <div
                    className="mx-auto w-[20px] h-[20px] mt-0
                      border-t-8 
                      border-t-white  
                      rounded-full 
                      animate-spin"
                ></div> : <>Registrarme</>}</button>

            </div>
        </>
    )
}
