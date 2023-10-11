import { DndContext, closestCenter } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import Swal from "sweetalert2";
import { BsCardText, BsImage } from "react-icons/bs";
import { BiBookmarks, BiText } from "react-icons/bi";
import DraggableItem from "./draggableItem";

export const ContentDragDrop = (props) => {

  // ESTE CONTENT ES EL QUE SE RECIBE POR PARÁMETRO
  // ES EL CONTENT DE LA SECCIÓN SELECCIONADA, DE LA PÁGINA SELECCIONADA
  const [content, setContent] = useState([
    {
      type: "image", //image
      id: 1, // drag And Drop
      imageUrl: "",
      width: "20",
      height: "20",
      paddingLeft: "5",
      paddingRight: "5",
      paddingTop: "5",
      paddingBottom: "5",
      rounded: "10"
    },
    {
      type: "text", //text
      id: 2, // drag And Drop
      text: "",
      isBold: false,
      height: "20",
      width: "20",
      paddingLeft: "5",
      paddingBottom: "5",
      paddingRight: "5",
      paddingTop: "5",
      position: "center",
      textSize: "16", //px
      color: "black",
    },
    {
      type: "textArea", //text
      id: 3, // drag And Drop
      text: "",
      height: "20",
      width: "20",
      position: "center",
      paddingLeft: "5",
      paddingRight: "5",
      paddingTop: "5",
      paddingBottom: "5",
      color: "black",
      textSize: "16", //px
      isBold: false
    },
    {
      type: "card", //card
      id: 4, // drag And Drop
      cardSelected: "1",
      paddingLeft: "5",
      paddingRight: "5",
      paddingTop: "5",
      paddingBottom: "5",
    }
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setContent((content) => {
        const oldIndex = content.findIndex((content) => content.id === active.id);
        const newIndex = content.findIndex((content) => content.id === over.id);
        const updatedContent = arrayMove(content, oldIndex, newIndex);

        // Actualiza el objeto 'updatedWebPageData'
        // const updatedWebPageData = { ...props.webPageData };
        // const movedPage = updatedWebPageData.content.find((content) => content.id === active.id);
        // if (movedPage) {
        //   updatedWebPageData.pages = arrayMove(updatedWebPageData.content, oldIndex, newIndex);
        // }

        // Establece la copia actualizada como el nuevo estado
        // props.setWebPageData(updatedWebPageData);

        return updatedContent;
      });
    }
  };

  const handleAddContent = async (contentType) => {

    const newContent = [...content];
    if (contentType == "image") {
      newContent.push({
        type: "image", //image
        id: content.length + 1, // drag And Drop
        imageUrl: "",
        width: "20",
        height: "20",
        paddingLeft: "5",
        paddingBottom: "5",
        paddingRight: "5",
        paddingTop: "5",
        rounded: "10"
      })
    } else if (contentType == "text" || contentType == "textArea") {
      newContent.push({
        type: contentType, //text or textArea
        id: content.length + 1, // drag And Drop
        text: "",
        height: "20",
        width: "20",
        position: "center",
        paddingLeft: "5",
        paddingRight: "5",
        paddingTop: "5",
        paddingBottom: "5",
        color: "black",
        textSize: "16", //px
        isBold: false
      })
    } else if (contentType == "card") {
      newContent.push({
        type: "card", //card
        id: content.length + 1, // drag And Drop
        cardSelected: "1",
        paddingLeft: "5",
        paddingRight: "5",
        paddingTop: "5",
        paddingBottom: "5",
      })
    }

    setContent(newContent);
    // handleSetPagesOptions(newSections)

    // Clona el objeto webPageData para no modificar el estado original directamente
    // const updatedWebPageData = { ...props.webPageData };

    // Crea un nuevo objeto 'page' (puedes personalizar esto según tus necesidades)
    // const newPage = {
    //   id: pages.length + 1,
    //   name: sectionNameSelected,
    //   sections: {},
    // };

    // Agrega el nuevo objeto 'page' al arreglo 'pages'
    // updatedWebPageData.pages.push(newPage);

    // Establece la copia actualizada como el nuevo estado
    // props.setWebPageData(updatedWebPageData);
  };

  const handleDeleteContent = async (contentId) => {
    // Validates if is last content in array
    if (content.length === 1) {
      Swal.fire({
        text: 'Esta es tu último contenido',
        icon: 'error',
        confirmButtonText: 'Entendido',
        allowOutsideClick: false,
      });
      return;
    }

    Swal.fire({
      title: '¿Desea eliminar el contenido?',
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
        const updatedContent = content.filter((content) => content.id !== contentId);
        setContent(updatedContent);
        // handleSetPagesOptions(newSections)
        // const updatedWebPageData = { ...props.webPageData };
        // updatedWebPageData.pages = updatedWebPageData.pages.filter((page) => page.id !== pageId);
        // console.log("?")
        // Establece la copia actualizada como el nuevo estado
        // props.setWebPageData(updatedWebPageData);
      }

    })
  };


  // useEffect(() => {
  //   handleSetContentOptions(content)
  // }, [content])

  const handleSetContentOptions = (options) => {
    const customEvent = new Event("changePagesOptions");
    customEvent.option = options;
    window.dispatchEvent(customEvent);
  }

  useEffect(() => {
    console.log("xxxxx", content)

    const updatedWebPageData = { ...props.webPageData }; // Copia el objeto principal para no mutarlo directamente
    const pageToEdit = updatedWebPageData.pages.find((page) => page.id === parseInt(props.currentPage));
    pageToEdit.sections = content;
    // Ahora, puedes utilizar props.setWebPageData() para actualizar el estado con el nuevo objeto
    props.setWebPageData(updatedWebPageData);
  }, [content])


  return (
    <>
      <div className="flex flex-col space-y-2 justify-center items-center w-full h-auto overflow-x-hidden  rounded-[10px] mt-1 p-1.5 overflow-hidden">

        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={content}
            strategy={verticalListSortingStrategy}
          >
            {content.map((contentInfo, i) => (
              <>
                <DraggableItem position={i} setContent={setContent} contentComplete={content} currentPage={props.currentPage} activeSection={props.activeSection} setWebPageData={props.setWebPageData} webPageData={props.webPageData} key={i} content={contentInfo} handleDeleteContent={handleDeleteContent} />
                {i + 1 !== content.length && <hr className='border-2 rounded-full border-[#224553] w-full' />}
              </>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* BOTONES PARA AGREGAR NUEVO ELEMENTO */}
      <div className='flex justify-center items-center space-x-3 mt-3'>
        <BsImage className='w-8 h-8 cursor-pointer bg-white p-1.5 rounded-[10px] shadow-md hover:bg-gray-500 hover:text-white' onClick={() => handleAddContent("image")} />
        <BiText className='w-8 h-8 cursor-pointer bg-white p-1.5 rounded-[10px] shadow-md hover:bg-gray-500 hover:text-white' onClick={() => handleAddContent("text")} />
        <BsCardText className='w-8 h-8 cursor-pointer bg-white p-1.5 rounded-[10px] shadow-md hover:bg-gray-500 hover:text-white' onClick={() => handleAddContent("textArea")} />
        <BiBookmarks className='w-8 h-8 cursor-pointer bg-white p-1.5 rounded-[10px] shadow-md hover:bg-gray-500 hover:text-white' onClick={() => handleAddContent("card")} />
      </div>
    </>
  );
}
