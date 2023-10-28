import { DndContext, closestCenter } from "@dnd-kit/core";
import { Fragment, useEffect, useState } from "react";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";

import Swal from "sweetalert2";
import { BsCardText, BsImage } from "react-icons/bs";
import { BiBookmarks, BiText } from "react-icons/bi";
import DraggableItem from "./draggableItem";
import { useTranslation } from "react-i18next";
import { Tooltip } from "react-tooltip";

export const ContentDragDrop = (props) => {
  const { t } = useTranslation();
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
        type: "image",
        id: parseInt(props?.currentPage)?.toString() + pageContentDataSections?.length + 1,
        imageUrl: "https://firebasestorage.googleapis.com/v0/b/armourweb-7faf5.appspot.com/o/defaultImages%2Fawlogo-nobg.png?alt=media&token=b6210a3b-0a76-4514-a234-47ff1aa14949",
        width: "100",
        height: "100",
        paddingLeft: "0",
        paddingBottom: "0",
        paddingRight: "0",
        paddingTop: "0",
        rounded: "10",
        position: "center"
      })
    } else if (contentType == "text" || contentType == "textArea") {
      newContent.push({
        type: contentType,
        id: parseInt(props?.currentPage)?.toString() + pageContentDataSections?.length + 1,
        text: "",
        height: "0",
        width: "0",
        position: "center",
        marginLeft: "0",
        marginRight: "0",
        marginTop: "0",
        marginBottom: "0",
        color: "#000000",
        textSize: "16",
        isBold: false
      })
    } else if (contentType == "card") {
      newContent.push({
        type: "card",
        id: parseInt(props?.currentPage)?.toString() + pageContentDataSections?.length + 1,
        isCategory: true,
        cardSelected: 'card1',
        bgColor: "#ffffff",
        titlePosition: "left",
        textSizeTitle: "20",
        textColorTitle: "#000000",
        descPosition: "left",
        textSizeDesc: "16",
        textColorDesc: "#000000",
        buttonPosition: "right",
        textSizeButton: "16",
        textColorButton: "#ffffff",
        bgColorButton: "#224553"
      })
    }

    setPageContentDataSections(newContent);
  };

  const handleDeleteContent = async (contentId) => {
    // Validates if is last content in array
    if (pageContentDataSections?.length === 1) {
      Swal.fire({
        text: t("page-builder.last-content"),
        icon: 'error',
        confirmButtonText: t("buttons.confirm"),
        allowOutsideClick: false,
      });
      return;
    }

    Swal.fire({
      title: t("page-builder.delete-content"),
      text: t("page-builder.irreversible"),
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      confirmButtonText: t("buttons.delete"),
      cancelButtonText: t("buttons.cancel"),
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
  }, [pageContentDataSections, props?.currentPage]);

  return (
    <>
      <div className={`mt-1 flex flex-col space-y-3 justify-center items-center w-full h-auto overflow-x-hidden rounded-[10px] overflow-hidden ${pageContentDataSections.length > 0 && "bg-gray-300 p-1 shadow-md border border-[#224553]"}`}>

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
                    webPageData={props?.webPageData}
                    currentPage={props?.currentPage}
                  />
                  {i + 1 !== pageContentDataSections?.length && <hr className='border-2 rounded-full border-[#224553] w-10/12' />}
                </Fragment>
              ))}

            </SortableContext>
          </DndContext>}
      </div>

      {/* BOTONES PARA AGREGAR NUEVO ELEMENTO */}
      <div className='flex justify-center items-center space-x-3 mt-3'>
        <BsImage className='w-8 h-8 cursor-pointer bg-white p-1.5 rounded-[10px] shadow-md hover:bg-gray-500 hover:text-white' onClick={() => handleAddContent("image")} data-tooltip-id="nav-content" data-tooltip-content={t("page-builder.tool-page-content-img")} />
        <Tooltip id="nav-content-img" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

        <BiText className='w-8 h-8 cursor-pointer bg-white p-1.5 rounded-[10px] shadow-md hover:bg-gray-500 hover:text-white' onClick={() => handleAddContent("text")} data-tooltip-id="nav-content" data-tooltip-content={t("page-builder.tool-page-content-txt")} />
        <Tooltip id="nav-content-txt" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

        <BsCardText className='w-8 h-8 cursor-pointer bg-white p-1.5 rounded-[10px] shadow-md hover:bg-gray-500 hover:text-white' onClick={() => handleAddContent("textArea")} data-tooltip-id="nav-content" data-tooltip-content={t("page-builder.tool-page-content-area")} />
        <Tooltip id="nav-content-area" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />

        <BiBookmarks className='w-8 h-8 cursor-pointer bg-white p-1.5 rounded-[10px] shadow-md hover:bg-gray-500 hover:text-white' onClick={() => handleAddContent("card")} data-tooltip-id="nav-content" data-tooltip-content={t("page-builder.tool-page-content-card")} />
        <Tooltip id="nav-content-card" className="tooltipDesign" classNameArrow="tooltipArrowDesign" />
      </div>
    </>
  );
}
