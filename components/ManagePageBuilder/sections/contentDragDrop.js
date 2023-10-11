import { DndContext, closestCenter } from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import Swal from "sweetalert2";
import { BsCardText, BsImage } from "react-icons/bs";
import { BiBookmarks, BiText } from "react-icons/bi";
import DraggableItem from "./draggableItem";

export const ContentDragDrop = (props) => {

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      props.setPageContentData((content) => {
        const oldIndex = content.findIndex((content) => content?.id === active.id);
        const newIndex = content.findIndex((content) => content?.id === over.id);
        const updatedContent = arrayMove(content, oldIndex, newIndex);
        return updatedContent;
      });
    }
  };

  const handleAddContent = async (contentType) => {
    const newContent = [...props?.pageContentData];
    if (contentType == "image") {
      newContent.push({
        type: "image", //image
        id: props?.pageContentData?.length + 1, // drag And Drop
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
        id: props?.pageContentData?.length + 1, // drag And Drop
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
        id: props?.pageContentData?.length + 1, // drag And Drop
        cardSelected: "1",
        paddingLeft: "5",
        paddingRight: "5",
        paddingTop: "5",
        paddingBottom: "5",
      })
    }

    props.setPageContentData(newContent);
  };

  const handleDeleteContent = async (contentId) => {
    // Validates if is last content in array
    if (props?.pageContentData?.length === 1) {
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
        const updatedContent = props?.pageContentData?.filter((content) => content?.id !== contentId);
        props.setPageContentData(updatedContent);
      }

    })
  };

  useEffect(() => {
    const updatedWebPageData = { ...props.webPageData }; // Copia el objeto principal para no mutarlo directamente
    const pageToEdit = updatedWebPageData?.pages?.find((page) => page?.id === parseInt(props?.currentPage));
    pageToEdit.sections = props?.pageContentData;
    props?.setWebPageData(updatedWebPageData);
  }, [props?.pageContentData])

  return (
    <>
      <div className="flex flex-col space-y-2 justify-center items-center w-full h-auto overflow-x-hidden  rounded-[10px] mt-1 p-1.5 overflow-hidden">

        {props?.pageContentData !== null &&
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={props?.pageContentData}
              strategy={verticalListSortingStrategy}
            >
              {props?.pageContentData !== null &&
                props?.pageContentData?.map((contentInfo, i) => (
                  <>
                    <DraggableItem key={i} position={i} setContent={props.setPageContentData} setPageContentData={props.setPageContentData} contentComplete={props?.pageContentData} currentPage={props.currentPage} setWebPageData={props.setWebPageData} webPageData={props.webPageData} content={contentInfo} handleDeleteContent={handleDeleteContent} />
                    {i + 1 !== props?.pageContentData?.length && <hr className='border-2 rounded-full border-[#224553] w-full' />}
                  </>
                ))}
            </SortableContext>
          </DndContext>}
      </div>

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
