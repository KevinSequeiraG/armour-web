import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2'

const Section = () => {
    const [sections, setSections] = useState([]);

    const handleAddSection = async () => {
        const { value: sectionNameSelected } = await Swal.fire({
            title: 'Nombre de la sección',
            input: 'text',
            showCloseButton: true,
            confirmButtonText: 'Aceptar',
            allowOutsideClick: false,
            inputValidator: (value) => {
                if (!value) return 'La sección requiere un nombre.'
                if (sections.includes(value)) return 'Ya existe una sección con ese nombre.'
            }
        })
        if (!sectionNameSelected) return;
        const newSections = [...sections, sectionNameSelected];
        setSections(newSections);
    };



    const onDragEnd = (result) => {
        if (!result.destination || (result.source.index === result.destination.index && result.source.droppableId === result.destination.droppableId)) return;
        const { source, destination } = result;
        setSections((sections) => reorder(sections, source.index, destination.index));
    };

    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const getListStyle = isDragging => ({
        userSelect: "none",
        background: isDragging ? "rgba(211, 211, 211, 0.1)" : "none",
        borderRadius: isDragging ? "10px" : "0px",
        border: isDragging && "1px solid #224553",
        marginBottom: isDragging && "8px",
        paddingBottom: isDragging && "8px"
    });


    const getItemStyle = (isDragging, draggableStyle) => ({
        userSelect: "none",
        boxShadow: isDragging ? "0px 2px 4px rgba(0, 0, 0, 0.2)" : "none",
        transition: "background 0.5s ease, opacity 0.5s ease, transform 0.5s ease",
        background: isDragging ? "#224553" : "none",
        opacity: isDragging ? 0.6 : 1,
        borderRadius: isDragging ? "10px" : "0px",
        margin: "12px",
        ...draggableStyle
    });

    return (
        <div >
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="sections">
                    {(provided, snapshot) => (
                        <div className='border border-transparent' style={getListStyle(snapshot.isDraggingOver)} ref={provided.innerRef} {...provided.droppableProps}>
                            {sections.map((section, index) => (
                                <Draggable key={index} draggableId={`${index}`} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(
                                                snapshot.isDragging,
                                                provided.draggableProps.style
                                            )}
                                        >
                                            <div className="optionButton h-14 truncate" onClick={() => alert("a")}>
                                                {section}
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
            <button
                className="optionButton mb-2 mr-2 truncate w-fit flex justify-center items-center !text-xs !py-1.5"
                onClick={handleAddSection}
            >
                <FiPlus className='text-base mr-1' />Añadir sección
            </button>
        </div>
    );
};

export default Section;
