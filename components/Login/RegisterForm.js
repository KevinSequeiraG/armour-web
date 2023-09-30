import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'animate.css';
import { createUserFromLogin, userAlreadyExists } from '@/helpers/users';
import { useTranslation } from 'react-i18next';

export default function RegisterForm() {
    const { t } = useTranslation();
    const [registerFormValues, setRegisterFormValues] = useState({ name: '', lastname: '', email: '', password: '', confirmPassword: '' });
    const [registrationError, setRegistrationError] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRegisterFormValues((prevValues) => ({ ...prevValues, [name]: value }));
    };

    const validateForm = async () => {
        const errors = {};
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!registerFormValues.name) errors.name = t("validations.name-required");
        if (!registerFormValues.lastname) errors.lastname = t("validations.surnames-required");
        if (!registerFormValues.email) errors.email = t("validations.email-required");
        else if (!emailRegex.test(registerFormValues.email)) errors.email = t("validations.email-invalid");
        else {
            const userExistResult = await userAlreadyExists(registerFormValues.email);
            if (userExistResult.userExist) {
                toast.warning(t("validations.email-already-exits"));
                errors.email = t("validations.email-in-use");
            }
        }

        if (!registerFormValues.password) errors.password = t("validations.password-required");
        else if (registerFormValues.password.length < 8) errors.password = t("validations.password-length");
        if (!registerFormValues.confirmPassword) errors.confirmPassword = t("validations.email-required");
        else if (registerFormValues.password !== registerFormValues.confirmPassword) { errors.confirmPassword = t("validations.password-dont-match"); errors.password = t("validations.password-dont-match"); }

        setRegistrationError(errors);
        return Object.keys(errors).length === 0;
    };

    const handleRegister = async () => {
        const validationsResult = await validateForm();
        if (validationsResult) {
            setIsLoading(true);
            try {
                await createUserFromLogin(registerFormValues).then(() => {
                    toast.success(t("success.user-registered"));
                    setIsLoading(false);
                    const registerLabel = document.getElementById('registerLabel');
                    registerLabel.click();
                    setRegisterFormValues({ name: '', lastname: '', email: '', password: '', confirmPassword: '' });
                });
            } catch (error) {
                console.error('Error al registrar al usuario:', error);
            }
        }
    };
    return (
        <>
            <label className='loginLabelRegister' htmlFor="chk" aria-hidden="true" id="registerLabel">{t("login.register")}</label>
            <div className='max-h-[21rem] overflow-y-auto scrollbarDesign'>
                <div className='relative w-[60%] mx-auto'>
                    <p className='text-[#11131C] font-semibold text-sm'>{t("login.name")}</p>
                    <input className={`loginInput ${registrationError.name && '!border-red-400'}`} type="text" name="name" placeholder={t("login.name")} value={registerFormValues.name} onChange={handleInputChange} />
                    {registrationError.name && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-600">{registrationError.name}</p>}
                </div>
                <div className='relative w-[60%] mx-auto'>
                    <p className='text-[#11131C] font-semibold text-sm -mt-1.5'>{t("login.surnames")}</p>
                    <input className={`loginInput ${registrationError.lastname && '!border-red-400'}`} type="text" name="lastname" placeholder={t("login.surnames")} value={registerFormValues.lastname} onChange={handleInputChange} />
                    {registrationError.lastname && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-600">{registrationError.lastname}</p>}
                </div>
                <div className='relative w-[60%] mx-auto'>
                    <p className='text-[#11131C] font-semibold text-sm -mt-1.5'>{t("login.email")}</p>
                    <input className={`loginInput ${registrationError.email && '!border-red-400'}`} type="email" name="email" placeholder={t("login.email")} value={registerFormValues.email} onChange={handleInputChange} />
                    {registrationError.email && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-600">{registrationError.email}</p>}
                </div>
                <div className='relative w-[60%] mx-auto'>
                    <p className='text-[#11131C] font-semibold text-sm -mt-1.5'>{t("login.password")}</p>
                    <input className={`loginInput ${registrationError.password && '!border-red-400'}`} type="Password" name="password" placeholder={t("login.password")} value={registerFormValues.password} onChange={handleInputChange} />
                    {registrationError.password && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-600">{registrationError.password}</p>}
                </div>
                <div className='relative w-[60%] mx-auto'>
                    <p className='text-[#11131C] font-semibold text-sm -mt-1.5'>{t("login.confirm-password")}</p>
                    <input className={`loginInput ${registrationError.confirmPassword && '!border-red-400'}`} type="Password" name="confirmPassword" placeholder={t("login.confirm-password")} value={registerFormValues.confirmPassword} onChange={handleInputChange} />
                    {registrationError.confirmPassword && <p className="animate__animated animate__flipInX absolute text-xs font-medium -bottom-4 right-0 text-red-600">{registrationError.confirmPassword}</p>}
                </div>
                <button className='loginButton' onClick={!isLoading && handleRegister}>{isLoading ? <div
                    className="mx-auto w-[20px] h-[20px] mt-0
                      border-t-8 
                      border-t-white  
                      rounded-full 
                      animate-spin"
                ></div> : <>{t("login.register")}</>}</button>

            </div>
        </>
    )
}
