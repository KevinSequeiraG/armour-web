import { getUserByUid } from "@/helpers/users";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const SalesCartView = (props) => {
    if (!props.isOpen) return null;
    const { t } = useTranslation();

    const handleRemoveFromCart = (productId) => {
        const newCart = props.cartProducts.filter((prod => { return (prod.idProd !== productId) }))
        props.setSalesCart(newCart)
    };

    const handleSendCartEmail = async () => {
        const content = await generateInvoiceContent(props?.cartProducts);
        if (!content) return;

        const userData = await getUserByUid(props?.webPageData?.createdBy);
        try {
            await fetch("/api/sendCartEmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    emailToRecieve: userData?.email,
                    subject: props?.webPageData?.isSpanish
                        ? `¡Nuevo cliente interesado en los productos que ofreces en "${props?.webPageData?.name}"!`
                        : `New customer interested in the products you offer on "${props?.webPageData?.name}"!`,
                    content: content
                }),
            });
            props.handleShow(false);
            toast.success(props?.webPageData?.isSpanish ? "Correo enviado" : "Email sent");
            props.setSalesCart([])
        } catch (error) {
            console.error('Error al enviar correo:', error);
        }
    }

    const generateInvoiceContent = async (cartProducts) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const { value: formValues } = await Swal.fire({
            title: props?.isSpanish ? "Tus datos para contacto" : "Your contact details",
            html:
                `<label for="swal-input1">${props?.isSpanish ? "Tu nombre" : "Your name"}:</label>` +
                '<input id="swal-input1" class="swal2-input">' +
                `<label for="swal-input2">${props?.isSpanish ? "Correo electrónico" : "Email address"}:</label>` +
                '<input id="swal-input2" class="swal2-input">',
            showCloseButton: true,
            confirmButtonText: props?.isSpanish ? "Confirmar" : "Confirm",
            allowOutsideClick: false,
            customClass: {
                container: 'my-swal'
            },
            preConfirm: () => {
                const input1 = document.getElementById('swal-input1').value;
                const input2 = document.getElementById('swal-input2').value;

                if (!input1 || !input2) Swal.showValidationMessage(props?.isSpanish ? "Debes completar los campos" : "All fields are required");

                else if (!emailRegex.test(input2)) Swal.showValidationMessage(props?.isSpanish ? "Formato de correo inválido" : "Invalid email format")

                return { name: input1, email: input2 };
            }
        })

        if (!formValues || !formValues.email || !formValues.name) return;

        let title = props?.webPageData?.isSpanish ? '<h1>Nueva compra en tu página de ArmourWeb</h1>' : '<h1>New purchase on your ArmourWeb page</h1>';
        let content = title;
        let total = 0;

        content += '<table border="1" cellspacing="0" cellpadding="4">';
        content += '<thead>';
        content += `<tr><th>${props?.webPageData?.isSpanish ? 'Producto' : 'Product'}</th><th>${props?.webPageData?.isSpanish ? 'Cantidad' : 'Quantity'}</th><th>${props?.webPageData?.isSpanish ? 'Total' : 'Total'}</th></tr>`;
        content += '</thead>';
        content += '<tbody>';

        cartProducts.forEach(product => {
            const productTotal = parseFloat(product.prize) + (parseFloat(product.prize) * (parseFloat(product.tax) / 100));
            total += productTotal;

            content += `<tr>`;
            content += `<td>${product?.name}</td>`;
            content += `<td style="text-align: center;">${product?.quantity}</td>`;
            content += `<td style="text-align: right;">₡${productTotal?.toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>`;
            content += `</tr>`;
        });

        content += '</tbody>';
        content += `<tfoot><tr><td colspan="2">${props?.webPageData?.isSpanish ? 'Total' : 'Total'}</td><td>₡${total.toLocaleString('es-CR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td></tr></tfoot>`;
        content += '</table>';

        content += `<br><p><strong>${props?.webPageData?.isSpanish ? 'Contacto del interesado:' : 'Client contact information:'}</strong></p>`;
        content += `<p>${props?.webPageData?.isSpanish ? 'Nombre' : 'Name'}: ${formValues.name}</p>`;
        content += `<p>${props?.webPageData?.isSpanish ? 'Correo' : 'Email'}: ${formValues.email}</p>`;

        return content;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
            <div className="relative min-w-[25%] max-h-[80%] overflow-y-auto bg-white rounded-[10px] px-6 py-[3rem] mx-auto z-50 border-[.2rem] border-gray-500 scrollbarDesign">
                <p className="text-[1.5rem] text-center font-semibold mb-4">{props?.isSpanish ? "Carrito de compras" : "Your cart"}</p>
                <ul className="text-left w-auto">
                    {props.cartProducts.length < 1 && <div className="text-center">
                        <p>{props?.isSpanish ? "No has añadido nada al carrito" : "You have not added anything to the cart"}</p>
                    </div>}
                    {props?.cartProducts.map((product) => (
                        <li key={product.idProd} className="my-3 flex items-center justify-between border border-1 border-gray-300 px-4 py-4 rounded-xl">
                            <div className="">
                                <p className="text-[1.2rem] font-semibold">{product.name}</p>
                                <p>{props?.isSpanish ? "Cantidad" : "Quantity"}: {product.quantity}</p>
                                <p>{props?.isSpanish ? "Precio" : "Prize"}: ₡{product.prize}</p>
                                <p>{props?.isSpanish ? "Impuesto" : "Taxes"}: {product.tax}%</p>
                                <p>Total: ₡{parseFloat(product.prize) + (parseFloat(product.prize) * (parseFloat(product.tax) / 100))}</p>
                            </div>
                            <button
                                onClick={() => handleRemoveFromCart(product.idProd)}
                                className="cursor-pointer text-red-600 hover:text-red-800"
                            >
                                <AiFillDelete className="w-7 h-7" />
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={() => props.handleShow(false)} className="absolute top-0 right-3 mx-auto cursor-pointer flex items-center justify-center  bg-red-500 border-2 border-gray-300 hover:bg-red-700 text-[1rem] text-center mt-3 py-2 px-4 rounded-full text-gray-100">X</button>
                {props?.cartProducts.length > 0 && <div className="flex justify-center mt-4">
                    <button onClick={() => handleSendCartEmail()} className="mx-auto cursor-pointer w-min bg-green-500 border-2 border-gray-100 hover:bg-green-700 text-lg text-center py-2 px-4 rounded-[10px] text-gray-100 truncate">
                        {props?.isSpanish ? "Enviar mi compra" : "Send my purchase"}
                    </button>
                </div>}
            </div>
        </div>
    );
};

export default SalesCartView;
