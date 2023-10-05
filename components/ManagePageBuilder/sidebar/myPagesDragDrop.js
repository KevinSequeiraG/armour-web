import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import DraggableItem from "./draggableItem";
import { FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";

const MyypagesDragDrop = () => {
  const [pages, setPages] = useState([
    { id: 1, name: "Home" },
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setPages((pages) => {
        const oldIndex = pages.findIndex((page) => page.id === active.id);
        const newIndex = pages.findIndex((page) => page.id === over.id);
        return arrayMove(pages, oldIndex, newIndex);
      });
    }
  };

  const handleAddPage = async () => {
    const { value: sectionNameSelected } = await Swal.fire({
      title: 'Nombre de la página',
      input: 'text',
      showCloseButton: true,
      confirmButtonText: 'Aceptar',
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) return 'La sección requiere un nombre.'
        if (pages.findIndex((page) => page.name === value) != -1) return 'Ya existe una página con ese nombre.'
      }
    })

    if (!sectionNameSelected) return;
    const newSections = [...pages, { id: pages.length + 1, name: sectionNameSelected }];
    setPages(newSections);
    // handleSetPagesOptions(newSections)
    
  };

  const handleEditPageName = async (pageId) => {
    const { value: sectionNameSelected } = await Swal.fire({
      title: 'Editar nombre de la página',
      input: 'text',
      showCloseButton: true,
      confirmButtonText: 'Aceptar',
      inputValue: pages.find((page) => page.id === pageId)?.name || '',
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value) return 'La sección requiere un nombre.'
        if (pages.findIndex((page) => page.name === value) != -1) return 'Ya existe una página con ese nombre.'
      }
    })

    if (!sectionNameSelected) return;
    const updatedPages = pages.map((page) => page.id === pageId ? { ...page, name: sectionNameSelected } : page);
    setPages(updatedPages);
    // handleSetPagesOptions(newSections)

  };

  const handleDeletePage = async (pageId) => {

    // Validates if is last page in array
    if (pages.length === 1) {
      Swal.fire({
        text: 'Esta es tu única página',
        icon: 'error',
        confirmButtonText: 'Entendido',
        allowOutsideClick: false,
      });
      return;
    }

    Swal.fire({
      title: '¿Desea eliminar la página creada?',
      text: "Esta acción es irreversible",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      allowOutsideClick: false,
    }).then((result) => {

      if (result.isConfirmed) {
        const updatedPages = pages.filter((page) => page.id !== pageId);
        setPages(updatedPages);
        // handleSetPagesOptions(newSections)
      }

    })
  };


  useEffect(() => {
    handleSetPagesOptions(pages)
  }, [pages])

  const handleSetPagesOptions = (options) => {
    const customEvent = new Event("changePagesOptions");
    customEvent.option = options;
    window.dispatchEvent(customEvent);
  }

  return (
    <>
      <div className="flex flex-col space-y-2 justify-center items-center w-full h-full py-3 overflow-x-hidden border-2 mt-1 border-[#224553] rounded-[10px] px-2.5 mdx1700:px-4 shadow-md bg-gray-200 drop-shadow">

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={pages}
            strategy={verticalListSortingStrategy}
          >
            {pages.map((page, i) => (
              <DraggableItem key={i} page={page} handleEditPageName={handleEditPageName} handleDeletePage={handleDeletePage} />
            ))}
          </SortableContext>
        </DndContext>
      </div>
      <button
        className="optionButton mt-3 truncate w-fit flex justify-center shadow-md drop-shadow-sm items-center !text-sm !py-1.5 !text-black hover:!text-white !border-2"
        onClick={handleAddPage}
      >
        <FiPlus className='text-base mr-1' />Añadir página
      </button>
    </>
  );
};

export default MyypagesDragDrop;
