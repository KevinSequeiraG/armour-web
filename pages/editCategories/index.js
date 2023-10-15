import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const EditCategoryPage = () => {
    const [products, setProducts] = useState([]); // Supongamos que tienes una lista de productos
    const sampleProducts = [
        {
            id: 1,
            name: 'Categoria 1',
            description: 'Descripción del Categoria 1',
        },
        {
            id: 2,
            name: 'Categoria 2',
            description: 'Descripción del Categoria 2',
        },
        {
            id: 3,
            name: 'Categoria 3',
            description: 'Descripción del Categoria 3',
        },
        {
            id: 4,
            name: 'Categoria 4',
            description: 'Descripción del Categoria 4',
        },
        {
            id: 5,
            name: 'Categoria 5',
            description: 'Descripción del Categoria 5',
        },
    ];

    useEffect(() => {
        // Simula la carga de productos desde una fuente de datos (por ejemplo, una API)
        // Aquí puedes reemplazar esto con tu lógica para cargar productos
        const fetchProducts = async () => {
            try {
                // const response = await fetch('TU_ENDPOINT_DE_PRODUCTOS'); // Reemplaza con tu endpoint
                // const data = await response.json();
                // setProducts(data);

                setProducts(sampleProducts)
            } catch (error) {
                console.error('Error al cargar productos:', error);
            }
        };

        fetchProducts();
    }, []);

    // Función para editar un producto (simulada)
    const editProduct = (productId) => {
        // Implementa la lógica para editar un producto aquí
        console.log('Editar producto con ID:', productId);
    };

    // Función para eliminar un producto (simulada)
    const deleteProduct = (productId) => {
        // Implementa la lógica para eliminar un producto aquí
        console.log('Eliminar producto con ID:', productId);
    };

    return (
        <div className="container mx-auto py-4 px-8">
            <h1 className="text-2xl font-semibold mb-4">Editar Categorías</h1>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr>
                        <th className="p-2 border border-gray-300">Nombre de la categoría</th>
                        <th className="p-2 border border-gray-300">Descripción</th>
                        <th className="p-2 border border-gray-300">Imagen</th>
                        <th className="p-2 border border-gray-300">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id} className='text-center'>
                            <td className="p-2 border border-gray-300">{product.name}</td>
                            <td className="p-2 border border-gray-300">{product.description}</td>
                            <td className="p-2 border border-gray-300"><img className="max-w-[4rem] mx-auto"src='/images/awLogo.png'/></td>
                            <td className="p-2 border border-gray-300">
                                <button
                                    onClick={() => editProduct(product.id)}
                                    className="text-blue-500 hover:text-blue-700 mr-2"
                                >
                                    <FaEdit />
                                </button>
                                <button
                                    onClick={() => deleteProduct(product.id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EditCategoryPage;
