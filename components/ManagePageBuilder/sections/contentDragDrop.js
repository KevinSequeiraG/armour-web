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
  const [content, setContent] = useState(props.webPageData.pages[parseInt(props.currentPage) - 1].sections);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setContent((content) => {
        const oldIndex = content.findIndex((content) => content.id === active.id);
        const newIndex = content.findIndex((content) => content.id === over.id);
        const updatedContent = arrayMove(content, oldIndex, newIndex);
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
        marginLeft: "5",
        marginBottom: "5",
        marginRight: "5",
        marginTop: "5",
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
        marginLeft: "5",
        marginRight: "5",
        marginTop: "5",
        marginBottom: "5",
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
      }

    })
  };

  useEffect(() => {
    const updatedWebPageData = { ...props.webPageData }; // Copia el objeto principal para no mutarlo directamente
    const pageToEdit = updatedWebPageData.pages.find((page) => page.id === parseInt(props.currentPage));
    pageToEdit.sections = content;
    props.setWebPageData(updatedWebPageData);
  }, [content])


  useEffect(() => {
    console.log("dataaaaaaaaaaaaaa",props.webPageData)
    if (props.webPageData.pages[parseInt(props.currentPage) - 1].sections !== null) {
      console.log(2)
      setContent(props.webPageData.pages[parseInt(props.currentPage) - 1].sections)
    } else {
      console.log(1)
      // setContent([
      //   {
      //     type: "text", //text
      //     id: 2, // drag And Drop
      //     text: "empty",
      //     isBold: false,
      //     height: "20",
      //     width: "20",
      //     marginLeft: "5",
      //     marginBottom: "5",
      //     marginRight: "5",
      //     marginTop: "5",
      //     position: "center",
      //     textSize: "16", //px
      //     color: "black",
      //   },
      //   {
      //     type: "textArea", //text
      //     id: 3, // drag And Drop
      //     text: "",
      //     height: "20",
      //     width: "20",
      //     position: "center",
      //     marginLeft: "5",
      //     marginRight: "5",
      //     marginTop: "5",
      //     marginBottom: "5",
      //     color: "black",
      //     textSize: "16", //px
      //     isBold: false
      //   }
      // ])
    }
  }, [props.webPageData])



  return (
    <>
      <div className="flex flex-col space-y-2 justify-center items-center w-full h-auto overflow-x-hidden  rounded-[10px] mt-1 p-1.5 overflow-hidden">

        {content !== null && < DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext
            items={content}
            strategy={verticalListSortingStrategy}
          >
            {content !== null && content.map((contentInfo, i) => (
              <>
                <DraggableItem position={i} setContent={setContent} contentComplete={content} currentPage={props.currentPage} setWebPageData={props.setWebPageData} webPageData={props.webPageData} key={i} content={contentInfo} handleDeleteContent={handleDeleteContent} />
                {i + 1 !== content.length && <hr className='border-2 rounded-full border-[#224553] w-full' />}
              </>
            ))}
          </SortableContext>
        </DndContext>}
      </div >

      {/* BOTONES PARA AGREGAR NUEVO ELEMENTO */}
      < div className='flex justify-center items-center space-x-3 mt-3' >
        <BsImage className='w-8 h-8 cursor-pointer bg-white p-1.5 rounded-[10px] shadow-md hover:bg-gray-500 hover:text-white' onClick={() => handleAddContent("image")} />
        <BiText className='w-8 h-8 cursor-pointer bg-white p-1.5 rounded-[10px] shadow-md hover:bg-gray-500 hover:text-white' onClick={() => handleAddContent("text")} />
        <BsCardText className='w-8 h-8 cursor-pointer bg-white p-1.5 rounded-[10px] shadow-md hover:bg-gray-500 hover:text-white' onClick={() => handleAddContent("textArea")} />
        <BiBookmarks className='w-8 h-8 cursor-pointer bg-white p-1.5 rounded-[10px] shadow-md hover:bg-gray-500 hover:text-white' onClick={() => handleAddContent("card")} />
      </div >
    </>
  );
}
