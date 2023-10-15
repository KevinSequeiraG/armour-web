import { DndContext, closestCenter } from "@dnd-kit/core";
import { Fragment, useEffect, useState } from "react";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import Swal from "sweetalert2";
import { BsCardText, BsImage } from "react-icons/bs";
import { BiBookmarks, BiText } from "react-icons/bi";
import DraggableItem from "./draggableItem";

export const ContentDragDrop = (props) => {

  const [pageContentDataSections, setPageContentDataSections] = useState(props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections);

  useEffect(() => {
    setPageContentDataSections(props?.webPageData?.pages?.find(page => page?.id == parseInt(props?.currentPage))?.sections);
  }, [props?.currentPage]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      setPageContentDataSections((content) => {
        const oldIndex = content?.findIndex((content) => content?.id === active?.id);
        const newIndex = content?.findIndex((content) => content?.id === over?.id);
        const updatedContent = arrayMove(content, oldIndex, newIndex);
        return updatedContent;
      });
    }
  };

  const handleAddContent = async (contentType) => {
    const newContent = [...pageContentDataSections];
    if (contentType == "image") {
      newContent.push({
        type: "image", //image
        id: parseInt(props?.currentPage)?.toString() + pageContentDataSections?.length + 1, // drag And Drop
        imageUrl: "",
        width: "100",
        height: "100",
        marginLeft: "0",
        marginBottom: "0",
        marginRight: "0",
        marginTop: "0",
        rounded: "0"
      })
    } else if (contentType == "text" || contentType == "textArea") {
      newContent.push({
        type: contentType, //text or textArea
        id: parseInt(props?.currentPage)?.toString() + pageContentDataSections?.length + 1, // drag And Drop
        text: "",
        height: "0",
        width: "0",
        position: "center",
        marginLeft: "0",
        marginRight: "0",
        marginTop: "0",
        marginBottom: "0",
        color: "black",
        textSize: "16", //px
        isBold: false
      })
    } else if (contentType == "card") {
      newContent.push({
        type: "card", //card
        cardSelected: 'card1',
        isCategory: true,
        id: parseInt(props?.currentPage)?.toString() + pageContentDataSections?.length + 1, // drag And Drop
        // cardSelected: "1",
        // paddingLeft: "0",
        // paddingRight: "0",
        // paddingTop: "0",
        // paddingBottom: "0",
      })
    }

    setPageContentDataSections(newContent);
  };

  const handleDeleteContent = async (contentId) => {
    // Validates if is last content in array
    if (pageContentDataSections?.length === 1) {
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
        const updatedContent = pageContentDataSections?.filter((content) => content?.id !== contentId);
        setPageContentDataSections(updatedContent);
      }

    })
  };

  useEffect(() => {
    if (!props.webPageData) return;

    const { webPageData, currentPage, setWebPageData } = props;
    const updatedWebPageData = { ...webPageData };

    const updatedPages = updatedWebPageData?.pages?.map((page) => {
      if (page?.id === parseInt(currentPage))
        return { ...page, sections: pageContentDataSections };
      return page;
    });

    updatedWebPageData.pages = updatedPages;
    setWebPageData(updatedWebPageData);
  }, [pageContentDataSections, props.currentPage]);

  return (
    <>
      <div className="flex flex-col space-y-2 justify-center items-center w-full h-auto overflow-x-hidden  rounded-[10px] mt-1 p-1.5 overflow-hidden">

        {pageContentDataSections !== null &&
          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={pageContentDataSections} strategy={verticalListSortingStrategy}>

              {pageContentDataSections?.map((content, i) => (
                <Fragment key={i}>
                  <DraggableItem
                    handleDeleteContent={handleDeleteContent}
                    key={content?.id}
                    content={content}
                    position={i}
                    pageContentDataSections={pageContentDataSections}
                    setPageContentDataSections={setPageContentDataSections}
                    webPageData={props.webPageData}
                    currentPage={props.currentPage}
                  />
                  {i + 1 !== pageContentDataSections?.length && <hr className='border-2 rounded-full border-[#224553] w-full' />}
                </Fragment>
              ))}

            </SortableContext>
          </DndContext>}
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
