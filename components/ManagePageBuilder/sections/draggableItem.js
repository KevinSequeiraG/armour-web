import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AiFillDelete } from "react-icons/ai";

import { MdDragIndicator } from "react-icons/md";
import { Imagen } from "./contentDesign/image";
import { Text } from "./contentDesign/text";
import { TextArea } from "./contentDesign/textArea";
import { Card } from "./contentDesign/card";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function DraggableItem(props) {
  const { t } = useTranslation();
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({ id: props?.content?.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
    background: "#F5F5F5",
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div style={style} className="p-2 mdx1700:px-2 py-1 w-full rounded-[10px] shadow border border-black">
      <div className="justify-between flex items-center space-x-3 mb-0.5">
        <div className="cursor-grab" {...attributes} {...listeners} ref={setNodeRef}>
          <MdDragIndicator className="w-5 h-5" />
        </div>
        <div className="flex items-center uppercase">
          {props?.content?.type == "image" && t("section.img")}
          {props?.content?.type == "text" && t("section.txt")}
          {props?.content?.type == "textArea" && t("section.paragraph")}
          {props?.content?.type == "card" && t("section.card")}
        </div>
        <AiFillDelete className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-700" onClick={() => props.handleDeleteContent(props?.content?.id)} />
      </div>
      <div className="relative mt-4">
        {/* IMAGEN */}
        {props?.content?.type == "image" && <Imagen content={props?.content} position={props?.position} pageContentDataSections={props?.pageContentDataSections} setPageContentDataSections={props?.setPageContentDataSections} currentPage={props?.currentPage} webPageData={props.webPageData} />}

        {/* TEXT */}
        {props?.content?.type == "text" && <Text content={props?.content} position={props?.position} pageContentDataSections={props?.pageContentDataSections} setPageContentDataSections={props?.setPageContentDataSections} currentPage={props?.currentPage} webPageData={props.webPageData} />}

        {/* TEXTAREA */}
        {props?.content?.type == "textArea" && <TextArea content={props?.content} position={props?.position} pageContentDataSections={props?.pageContentDataSections} setPageContentDataSections={props?.setPageContentDataSections} currentPage={props?.currentPage} webPageData={props.webPageData} />}

        {/* CARD */}
        {/* PENDIENTEEEEEEEEEEEEEEEEE */}
        {props?.content?.type == "card" && <Card contentComplete={props.contentComplete} position={props?.position} positionInContent={props.position} pageContentDataSections={props?.pageContentDataSections} setPageContentDataSections={props?.setPageContentDataSections}  setContent={props.setContent} currentPage={props.currentPage} content={props.content} setWebPageData={props.setWebPageData} webPageData={props.webPageData} />}

      </div>
    </div>
  );
}

export default DraggableItem;